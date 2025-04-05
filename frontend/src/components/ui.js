import React from "react";

export function Button({ children, className, ...props }) {
  return (
    <button className={`px-4 py-2 rounded ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className }) {
  return <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}

export function Input({ className, ...props }) {
  return <input className={`border px-3 py-2 rounded w-full ${className}`} {...props} />;
}

export function Label({ children, className }) {
  return <label className={`block font-semibold mb-1 ${className}`}>{children}</label>;
}

export function Select({ children, className, ...props }) {
  return <select className={`border px-3 py-2 rounded w-full ${className}`} {...props}>{children}</select>;
}
