import React from 'react';

function Button({ className, title, type, onClick }) {
  return (
    <button type={type} className={`${className}`} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
