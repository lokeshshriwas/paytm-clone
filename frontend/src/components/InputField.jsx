import React from "react";

const InputField = ({type, placeholder, onChange, label, required}) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <input type={type} placeholder={`${placeholder}`} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 " required={required}/>
    </div>
  );
};

export default InputField;
