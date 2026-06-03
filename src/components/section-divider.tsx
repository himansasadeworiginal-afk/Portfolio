export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8" aria-hidden="true">
      <div className="w-[60px] h-px bg-gold-primary/30" />
      <svg
        viewBox="0 0 120 120"
        className="w-6 h-6 opacity-40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 10 L38 30 L20 45 L28 80 L18 110 L40 115 L60 120 L80 115 L102 110 L92 80 L100 45 L82 30 Z"
          stroke="#D4AF37"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M60 50 L44 70 L42 96 L60 102 L78 96 L76 70 Z"
          stroke="#D4AF37"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="46" cy="72" r="3" stroke="#D4AF37" strokeWidth="1" fill="none" />
        <circle cx="74" cy="72" r="3" stroke="#D4AF37" strokeWidth="1" fill="none" />
        <path d="M38 30 L28 12 L48 24 M82 30 L92 12 L72 24" stroke="#D4AF37" strokeWidth="1" />
      </svg>
      <div className="w-[60px] h-px bg-gold-primary/30" />
    </div>
  );
}
