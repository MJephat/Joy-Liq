import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import { useState } from "react";

const stripePromise = loadStripe("pk_test_...");

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = (subtotal - total).toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon?.code || null,
      userId: localStorage.getItem("userId") || "guest",
    });
    await stripe.redirectToCheckout({ sessionId: res.data.id });
  };

  const handleMpesaSubmit = async () => {
    await axios.post("/payments/mpesa-stk-push", { amount: total, phoneNumber });
    setShowMpesaModal(false);
    setPhoneNumber("");
  };

  return (
    <motion.div className="space-y-4 rounded-lg border border-brand-pink bg-brand-dark p-4 shadow-sm sm:p-6">
      <p className="text-xl font-semibold text-brand-pink">Order summary</p>
      <div className="space-y-4">
        <dl className="flex justify-between text-brand-blue">
          <dt>Original price</dt>
          <dd className="text-white">${formattedSubtotal}</dd>
        </dl>
        {subtotal > total && (
          <dl className="flex justify-between text-brand-blue">
            <dt>Savings</dt>
            <dd className="text-brand-pink">-${formattedSavings}</dd>
          </dl>
        )}
        {coupon && isCouponApplied && (
          <dl className="flex justify-between text-brand-blue">
            <dt>Coupon ({coupon.code})</dt>
            <dd className="text-brand-pink">-{coupon.discountPercentage}%</dd>
          </dl>
        )}
        <dl className="flex justify-between border-t border-brand-blue pt-2 text-white font-bold">
          <dt>Total</dt>
          <dd className="text-brand-pink">${formattedTotal}</dd>
        </dl>
      </div>

      <motion.button
        className="w-full rounded-lg bg-brand-pink px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-600"
        onClick={handlePayment}
      >
        Pay with Card
      </motion.button>

      <motion.button
        className="w-full rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600"
        onClick={() => setShowMpesaModal(true)}
      >
        Pay with M-Pesa
      </motion.button>

      <div className="flex justify-center gap-2">
        <span className="text-brand-blue">or</span>
        <Link
          to="/"
          className="text-brand-pink font-medium underline hover:text-pink-600"
        >
          Continue Shopping <MoveRight size={16} />
        </Link>
      </div>

      {showMpesaModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-brand-dark">Enter M-Pesa Number</h2>
            <input
              type="tel"
              placeholder="e.g. 254712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-brand-dark text-black rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowMpesaModal(false)}
                className="px-4 py-2 text-brand-dark hover:text-pink-600"
              >
                Cancel
              </button>
              <button
                onClick={handleMpesaSubmit}
                className="px-4 py-2 bg-brand-blue text-black rounded hover:bg-blue-600"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OrderSummary;
