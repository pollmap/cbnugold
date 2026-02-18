import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 ${
        hover
          ? "hover:border-gold/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
