import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const services = [
  {
    title: "Branding & Identity",
    description:
      "Custom branding, logos, and identity materials to elevate your business image.",
    icon: "🎨",
  },
  {
    title: "Printing Services",
    description:
      "High-quality prints for uniforms, merchandise, marketing material, and more.",
    icon: "🖨️",
  },
  {
    title: "Custom Apparel",
    description:
      "We design and produce hoodies, uniforms, t-shirts, and corporate wear.",
    icon: "👕",
  },
  {
    title: "Stationery & Gifts",
    description:
      "Personalized notebooks, pens, gift items and other premium custom products.",
    icon: "🎁",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const ServicesSection = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, []);

  return (
    <section className="py-16 bg-[#fbfcfd]" id="services">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-center text-[#00adef] mb-2">What We Offer</h2>
        <div className="w-20 h-1 bg-[#ec008c] mx-auto mt-2 rounded-full"></div>
        <p className="text-[#848182] mt-4 max-w-xl mx-auto">
          We offer tailored solutions in branding, printing, and design to help you stand out.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-4 animate-fade-in">
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border border-[#f2f2f2]"
            custom={i}
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-[#ec008c]">{service.title}</h3>
            <p className="text-[#848182] text-sm mt-2">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
