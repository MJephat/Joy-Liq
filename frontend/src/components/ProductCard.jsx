import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add products to cart", { id: "login" });
    } else {
      addToCart(product);
      toast.success("Added to cart!", { id: product._id });
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-brand-blue bg-brand-dark shadow-lg">
      <div className="relative flex h-60 overflow-hidden rounded-t-lg">
        <img src={product.image} alt={product.name} className="object-cover w-full" />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-brand-pink">{product.name}</h5>
        <p className="mt-2 mb-5 text-brand-blue text-3xl font-bold">${product.price}</p>
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center rounded-lg bg-brand-pink px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 transition"
        >
          <ShoppingCart size={22} className="mr-2" /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
