import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className="min-h-screen bg-black text-white py-10 px-4">
			<div className="mx-auto max-w-screen-xl 2xl:px-0">
				<div className="mt-8 md:gap-6 lg:flex lg:items-start xl:gap-10">
					<motion.div
						className="w-full lg:max-w-2xl xl:max-w-4xl"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className="space-y-6">
								{cart.map((item) => (
									<CartItem key={item._id} item={item} />
								))}
							</div>
						)}
						{cart.length > 0 && <PeopleAlsoBought />}
					</motion.div>

					{cart.length > 0 && (
						<motion.div
							className="mt-8 w-full flex-1 space-y-6 lg:mt-0"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
							<GiftCouponCard />
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className="flex flex-col items-center justify-center space-y-4 py-20 text-center"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className="h-24 w-24 text-yellow-500" />
		<h3 className="text-3xl font-bold text-white">Your cart is empty</h3>
		<p className="text-gray-400">Looks like you haven&apos;t added anything to your cart yet.</p>
		<Link
			to="/"
			className="mt-4 inline-block rounded-md bg-yellow-500 px-6 py-2 text-black font-semibold shadow-md hover:bg-yellow-600 transition"
		>
			Start Shopping Here
		</Link>
	</motion.div>
);
