import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";
import  axios from "axios"

export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode, userId } = req.body;

		const lineItems = products.map(product => ({
			price_data: {
				currency: "usd",
				product_data: { name: product.name },
				unit_amount: product.price * 100, // in cents
			},
			quantity: product.quantity || 1,
		}));

		const metadata = {
			userId: userId.toString(),
			products: JSON.stringify(products),
		};

		if (couponCode) {
			metadata.couponCode = couponCode;
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			metadata, // attach user and products here
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/cart`,
		});

		res.json({ id: session.id });
	} catch (error) {
		console.error("Stripe Checkout Error:", error);
		res.status(500).json({ error: error.message });
	}
};




export const mpesaPayment = async (req, res) => {
	try {
		const { phoneNumber, amount } = req.body;

		// Format phone number correctly
		const formattedPhoneNumber = phoneNumber.replace(/^0/, "254");

		// Generate Timestamp
		const Timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);

		// Generate Access Token
		const tokenResponse = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
			headers: {
				Authorization: `Basic ${Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64")}`,
			},
		});

		const accessToken = tokenResponse.data.access_token;

		// Base64 Encode Password
		const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${Timestamp}`).toString("base64");

		// Convert Amount to Number
		const amountNumber = Number(amount);

		// STK Push request
		const stkResponse = await axios.post(
			"https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
			{
				BusinessShortCode: process.env.MPESA_SHORTCODE,
				Password: password,
				Timestamp: Timestamp,
				TransactionType: "CustomerPayBillOnline",
				Amount: amountNumber,
				PartyA: formattedPhoneNumber,
				PartyB: process.env.MPESA_SHORTCODE,
				PhoneNumber: formattedPhoneNumber,
				CallBackURL: "https://webhook.site/a71fcd4f-ace1-42bf-98f8-b87d219d4089",
				AccountReference: "OrderPayment",
				TransactionDesc: "Payment for order",
			},
			{ headers: { Authorization: `Bearer ${accessToken}` } }
		);

		if (stkResponse.data.ResponseCode === "0") {
			res.json({ success: true, message: "STK Push sent to phone" });
		} else {
			res.json({ success: false, message: "STK Push failed", error: stkResponse.data });
		}
	} catch (error) {
		console.error("M-Pesa STK Push Error:", error.response ? error.response.data : error.message);
		res.status(500).json({ success: false, message: "M-Pesa Payment Failed", error: error.response ? error.response.data : error.message });
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
		const { sessionId } = req.body;

		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.payment_status === "paid") {
			const userId = session.metadata.userId;
			const products = JSON.parse(session.metadata.products || "[]");

			// Optional coupon deactivation
			if (session.metadata.couponCode) {
				await Coupon.findOneAndUpdate(
					{ code: session.metadata.couponCode, userId },
					{ isActive: false }
				);
			}

			// Save the order to DB
			const newOrder = new Order({
				user: userId,
				products: products.map(p => ({
					product: p.id,
					quantity: p.quantity,
					price: p.price,
				})),
				totalAmount: session.amount_total / 100,
				stripeSessionId: sessionId,
			});

			await newOrder.save();

			res.status(200).json({
				success: true,
				message: "Order saved successfully",
				orderId: newOrder._id,
			});
		} else {
			res.status(400).json({ success: false, message: "Payment not completed" });
		}
	} catch (error) {
		console.error("Checkout Success Error:", error);
		res.status(500).json({ message: "Checkout processing failed", error: error.message });
	}
};


async function createStripeCoupon(discountPercentage) {
	const coupon = await stripe.coupons.create({
		percent_off: discountPercentage,
		duration: "once",
	});

	return coupon.id;
}

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}