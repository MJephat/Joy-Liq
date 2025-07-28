import React from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const teamMembers = [
  {
    name: 'Shasa Alvin',
    role: 'Founder & Creative Director',
    image: 'https://via.placeholder.com/120',
  },
  {
    name: 'Jane Doe',
    role: 'Lead Designer',
    image: 'https://via.placeholder.com/120',
  },
  {
    name: 'John Smith',
    role: 'Print Technician',
    image: 'https://via.placeholder.com/120',
  },
  {
    name: 'Lucy Wangari',
    role: 'Marketing Specialist',
    image: 'https://via.placeholder.com/120',
  },
  // Add more team members as needed
];
const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-brand-dark text-gray-800 dark:text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-brand-pink to-brand-blue text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About DoubleShasa Limited</h1>
          <p className="text-lg sm:text-xl">
            Your go-to destination for high-quality branding, printing, and design solutions in Kenya.
          </p>
        </div>
      </section>

      {/* Company Mission */}
      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-brand-pink mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-lg">
          At DoubleShasa Limited, our mission is simple — to bring your ideas to life through innovative design, precise printing, and impactful branding. Whether you're a startup or an established business, we are here to make sure you stand out.
        </p>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-brand-blue text-center mb-8">Why Choose Us?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Creative Excellence",
                desc: "We turn your ideas into polished visuals that communicate powerfully.",
                emoji: "🎨",
              },
              {
                title: "Top-Quality Prints",
                desc: "Using the best tools and machines, our prints are built to last.",
                emoji: "🖨️",
              },
              {
                title: "Customer-Centric Approach",
                desc: "You're not just a client — you're a partner in creation.",
                emoji: "🤝",
              },
              {
                title: "Fast Turnaround",
                desc: "We deliver stunning results without compromising on time.",
                emoji: "⚡",
              },
              {
                title: "Custom Apparel & Merchandise",
                desc: "From hoodies to notebooks, we help your brand wear its pride.",
                emoji: "👕",
              },
              {
                title: "Affordable & Transparent",
                desc: "Great design doesn’t have to break the bank. We keep it simple and fair.",
                emoji: "💰",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-brand-dark rounded-lg shadow p-6 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-semibold mb-2 text-brand-pink dark:text-brand-blue">
                  {item.title}
                </h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-4 text-center bg-black text-white">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-semibold text-brand-pink mb-6">Meet the Team</h2>
    <p className="mb-10 text-lg">
      Behind every print and design is a passionate team dedicated to quality and creativity.
    </p>

    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {teamMembers.map((member, i) => (
        <SwiperSlide key={i}>
          <div className="bg-white text-brand-dark rounded-lg p-6 shadow-lg transition hover:shadow-xl">
            <img
              src={member.image}
              alt={member.name}
              className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-4 border-brand-pink"
            />
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-sm text-brand-pink">{member.role}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-pink text-white py-12 text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Let’s Bring Your Vision to Life</h2>
        <p className="mb-6">
          Whether you need a logo, branded clothing, or printed material — we’ve got you covered.
        </p>
        <a
          href="/contact"
          className="bg-white text-brand-pink font-semibold py-3 px-6 rounded hover:bg-gray-100 transition"
        >
          Contact Us Today
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
