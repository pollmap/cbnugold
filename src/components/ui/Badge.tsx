import { ReactNode } from "react";

type BadgeVariant = "open" | "closed" | "generation" | "tag" | "type";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  open: "bg-emerald-500/10 text-emerald-600",
  closed: "bg-red-500/10 text-red-500",
  generation: "bg-gold/10 text-gold-dark",
  tag: "border border-gold/25 text-gold-dark",
  type: "bg-gray-100 text-gray-600",
};

export function Badge({ children, variant = "tag", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {variant === "open" && (
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
      )}
      {children}
    </span>
  );
}
