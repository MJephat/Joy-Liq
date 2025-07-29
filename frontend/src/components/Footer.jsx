import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#231f20] text-[#989697] py-10 border-t border-[#00adef]">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
    <div>
      <h3 className="text-[#00adef] text-lg font-semibold mb-3">DoubleShasa Limited</h3>
      <p>
        Printing • Branding • Merchandise<br />
        Based in Kakamega, Kenya
      </p>
    </div>

    <div>
      <h4 className="text-white font-medium mb-2">Quick Links</h4>
      <ul className="space-y-1">
        <li><a href="/" className="hover:text-[#00adef]">Home </a></li>
        <li><a href="/about" className="hover:text-[#00adef]">About</a></li>
        <li><a href="/contact" className="hover:text-[#00adef]">Contact</a></li>
      </ul>
    </div>

    <div>
      <h4 className="text-white font-medium mb-2">Contact</h4>
      <p>Email: info@doubleshasa.com</p>
      <p>Phone: +254 712 345 678</p>
      <a
        href="https://wa.me/254712345678"
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-2 bg-[#00adef] text-white px-4 py-2 rounded hover:bg-[#0097d1] transition"
      >
        Chat on WhatsApp
      </a>
    </div>
  </div>

  <div className="text-center mt-10 text-[#848182] text-xs">
    &copy; {new Date().getFullYear()} DoubleShasa Limited. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
