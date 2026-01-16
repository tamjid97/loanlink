// src/components/Feedback/RvCard.jsx
import React from "react";
import icon from "../../../assets/icons8-double-quotes-32.png";

const RvCard = ({ fidbac }) => {
  const { name, role, feedback, img } = fidbac;

  return (
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-transform duration-500 transform hover:-translate-y-3 p-8 flex flex-col h-full max-w-sm">
      
      {/* Quote Icon */}
      <div className="flex justify-start mb-6">
        <div className=" rounded-full w-14 h-14 flex items-center justify-center">
          <img src={icon} alt="quote" className="w-8 h-8 opacity-30" />
        </div>
      </div>

      {/* Feedback Text */}
      <p className="text-gray-800 text-base leading-relaxed flex-1 mb-8 text-left">
        {feedback}
      </p>

      {/* Profile Section */}
      <div className="flex items-center mt-auto space-x-4">
        <img
          src={img}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 text-lg">{name}</span>
          <span className="text-gray-500 text-sm">{role}</span>
        </div>
      </div>
    </div>
  );
};

export default RvCard;
