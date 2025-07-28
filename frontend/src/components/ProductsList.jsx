import axios from "../lib/axios";
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  return (
    <motion.div
      className="bg-brand-dark shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-brand-pink">
        <thead className="bg-brand-blue">
          <tr>
            {["Product", "Price", "Category", "Featured", "Actions"].map((h) => (
              <th key={h} className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-pink">
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-brand-dark/70">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <img src={p.image} alt={p.name} className="h-10 w-10 rounded-full object-cover" />
                  <div className="ml-4">
                    <div className="text-white">{p.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-brand-blue">${p.price.toFixed(2)}</td>
              <td className="px-6 py-4 text-brand-blue">{p.category}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => toggleFeaturedProduct(p._id)}
                  className={`p-1 rounded-full ${
                    p.isFeatured ? "bg-brand-pink text-brand-dark" : "bg-brand-blue text-white"
                  } hover:bg-brand-pink transition`}
                >
                  <Star className="h-5 w-5" />
                </button>
              </td>
              <td className="px-6 py-4">
                <button onClick={() => deleteProduct(p._id)} className="text-brand-pink hover:text-pink-600">
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
