// src/components/Contact/Massage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const Massage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const phoneNumber = "01339613197";

  const sendWhatsApp = () => {
    if (!name || !message) {
      alert("Please fill in all fields");
      return;
    }
    const text = `Name: ${name}\nMessage: ${message}`;
    const url = `https://wa.me/88${phoneNumber}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section className="flex flex-wrap justify-center gap-8 py-16 px-4 ">
      {/* Call Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col max-w-sm w-full p-8 rounded-2xl bg-white shadow-2xl hover:shadow-3xl transition-transform transform hover:-translate-y-2"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Call Us Anytime
        </h3>
        <p className="text-gray-600 mb-5">
          Reach out for inquiries, banking assistance, or personalized guidance.
        </p>
        <a href={`tel:+88${phoneNumber}`}>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg shadow-lg hover:brightness-105 transition-all">
            📞 {phoneNumber}
          </button>
        </a>
        <span className="mt-3 text-sm text-gray-500">
          Hours: 10:00 AM – 10:00 PM
        </span>
      </motion.div>

      {/* WhatsApp Message Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col max-w-sm w-full p-8 rounded-2xl bg-white shadow-2xl hover:shadow-3xl transition-transform transform hover:-translate-y-2"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Send a WhatsApp Message
        </h3>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-4 p-3 border border-gray-300 rounded-xl min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />

        <button
          onClick={sendWhatsApp}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold text-lg shadow-lg hover:brightness-105 transition-all"
        >
          Send WhatsApp Message
        </button>
      </motion.div>
    </section>
  );
};

export default Massage;
