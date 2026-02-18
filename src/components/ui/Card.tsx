import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-navy-800 border border-gold/10 rounded-xl p-6 transition-all duration-300 ${
        hover
          ? "hover:border-gold/30 hover:bg-navy-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
