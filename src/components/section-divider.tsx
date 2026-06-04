export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8" aria-hidden="true">
      <div className="w-[60px] h-px bg-gold-primary/30" />
      <img
        src="/Portfolio/logo1.png"
        alt=""
        className="w-6 h-6 object-contain opacity-40"
      />
      <div className="w-[60px] h-px bg-gold-primary/30" />
    </div>
  );
}
