import { ReactNode } from "react";

type BadgeVariant = "open" | "closed" | "generation" | "tag" | "type";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  open: "bg-emerald-500/10 text-emerald-400",
  closed: "bg-red-500/10 text-red-400",
  generation: "bg-gold/10 text-gold",
  tag: "border border-gold/20 text-gold/60",
  type: "bg-navy-700 text-slate-300",
};

export function Badge({ children, variant = "tag", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {variant === "open" && (
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
      )}
      {children}
    </span>
  );
}
