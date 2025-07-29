import React from "react";

const testimonials = [
  {
    name: "Faith M.",
    feedback:
      "DoubleShasa has transformed our brand. Their quality and attention to detail is unmatched!",
    role: "School Administrator, Nairobi",
    image: "/clients/faith.jpg",
  },
  {
    name: "Brian K.",
    feedback:
      "From hoodies to custom stationery, they always deliver. Highly recommend!",
    role: "Creative Director, Kisumu",
    image: "/clients/brian.jpg",
  },
  {
    name: "Susan W.",
    feedback:
      "Reliable, professional, and fast turnaround. We love working with DoubleShasa!",
    role: "Marketing Lead, Kakamega",
    image: "/clients/susan.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-[#fdfdfd] text-center" id="testimonials">
      <h2 className="text-3xl font-semibold text-center text-[#00adef] mb-2">What Clients Say</h2>
      <p className="text-[#848182] mb-10 max-w-xl mx-auto">
        Our work speaks for itself — but our clients say it best.
      </p>
      <div className="grid md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-pale-gray-variant p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <img
              src={t.image}
              alt={t.name}
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-[#231f20] mb-4 italic">"{t.feedback}"</p>
            <h3 className="font-semibold text-[#00adef]">{t.name}</h3>
            <span className="text-sm text-[#848182]">{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
