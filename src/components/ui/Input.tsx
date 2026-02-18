"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-slate-300">
            {label}
            {props.required && <span className="text-gold ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full bg-navy-600 border rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all duration-200 ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/30"
              : "border-gold/10 focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
          } ${className}`}
          {...props}
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
