import React from "react";

const Input = ({ className, id, type, label, value, onChange, onBlur }) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
