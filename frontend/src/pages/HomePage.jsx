// ✅ CLEAN HOMEPAGE STRUCTURE (Updated Theme)
import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import ServicesSection from "../components/ServicesSection";

const categories = [
  { href: "/uniforms", name: "Uniforms", imageUrl: "/uniforms.jpg" },
  {
    href: "/corporate shirts",
    name: "Corporate Shirts",
    imageUrl: "/corporate.jpg",
  },
  { href: "/hoodies", name: "Hoodies", imageUrl: "/hoodies.jpg" },
  { href: "/stationary", name: "Stationary", imageUrl: "/stationary.jpg" },
  { href: "/gifts", name: "Gifts", imageUrl: "/gift-8.jpg" },
  { href: "/books", name: "Notebooks", imageUrl: "/books.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="bg-gradient-to-br from-dark-gray via-black to-dark-gray text-near-white">
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 text-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/printing-hero.jpg')", // Replace with your own image path
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white animate-fade-in">
            We Don’t Just <span className="text-brand-pink">Print</span> —<br />
            We Build <span className="text-brand-blue">Brands</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 animate-fade-in">
            Let your designs speak for your business.
          </p>
          <a
            href="#services"
            className="inline-block bg-gradient-to-r from-brand-blue to-brand-pink hover:from-brand-pink hover:to-brand-blue text-white text-lg font-semibold px-8 py-3 rounded-lg transition duration-300 animate-fade-in"
          >
            Explore Our Collection
          </a>
        </div>
      </section>

      {/* Services */}
      <ServicesSection />

      {/* Categories */}
      <section
        id="categories"
        className="py-16 px-4 max-w-7xl mx-auto animate-fade-in"
      >
        <h2 className="text-3xl font-semibold text-center text-[#00adef] mb-2">
          Some of our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-pale-gray-noise p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <CategoryItem category={category} />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {!isLoading && products.length > 0 && (
        <section className="px-4 pb-20 max-w-7xl mx-auto animate-fade-in delay-200">
          <h2 className="text-3xl font-semibold text-center text-[#00adef] mb-2">
            Products on Offer
          </h2>
          <FeaturedProducts featuredProducts={products} />
        </section>
      )}

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default HomePage;
