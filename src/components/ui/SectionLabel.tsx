interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-gold/20" />
      <span className="text-gold text-xs font-medium uppercase tracking-[0.2em]">
        {label}
      </span>
      <div className="h-px flex-1 bg-gold/20" />
    </div>
  );
}
