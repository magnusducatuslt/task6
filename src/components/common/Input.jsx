import React from "react";

export const Input = ({ label, action, type, value, name }) => (
  <label>
    {label}
    <input type={type} name={name} value={value} onChange={action} />
  </label>
);
