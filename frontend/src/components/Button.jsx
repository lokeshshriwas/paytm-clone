import React from 'react'

const Button = ({label, disabled=false, onClick}) => {
  return (
    <button className={`w-full mx-4 mb-4 flex items-center justify-center bg-black text-white py-2 rounded-md ${disabled ? 'opacity-50 pointer-events-none cursor-none' : 'cursor-pointer'}`} disabled={disabled} onClick={onClick}>
      <span>{label}</span>
    </button>
  )
}

export default Button