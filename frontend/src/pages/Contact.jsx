import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white py-20 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left side - Info */}
        <div>
          <h2 className="text-4xl font-bold text-brand-pink mb-4">Get in Touch</h2>
          <p className="text-brand-blue mb-8">
            Have a question, request, or just want to talk branding? Fill out the form or reach us directly via the contact info below.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin size={24} className="text-brand-blue mt-1" />
              <p>Kakamega Town, DoubleShasa HQ</p>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={24} className="text-brand-blue mt-1" />
              <p>+254 700 000 000</p>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={24} className="text-brand-blue mt-1" />
              <p>info@doubleshasa.co.ke</p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <form className="space-y-6 bg-[#2e2b2c] p-8 rounded-xl shadow-lg">
          <div>
            <label className="block text-white mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-brand-dark text-white rounded-md border border-brand-pink focus:outline-none focus:border-brand-blue"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-brand-dark text-white rounded-md border border-brand-pink focus:outline-none focus:border-brand-blue"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Message</label>
            <textarea
              rows="5"
              className="w-full px-4 py-2 bg-brand-dark text-white rounded-md border border-brand-pink focus:outline-none focus:border-brand-blue"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-brand-pink hover:bg-brand-blue text-white py-2 px-4 rounded-md font-semibold transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
