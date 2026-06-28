type ModalHeaderProps = {
  title: string;
  subtitle?: string;
  onClose: () => void;
};

export default function ModalHeader({
  title,
  subtitle,
  onClose,
}: ModalHeaderProps) {
  return (
    <header
      className="
            flex
            items-start
            justify-between
            bg-gradient-to-r
            from-[#5AD18]
            to-[#4B0F36]
            px-8
            py-6
        "
    >
      <div>
        <h2 className="text-3xl font-bold text-amber-100">{title}</h2>

        {subtitle && <p className="mt-1 text-stone-300">{subtitle}</p>}
      </div>

      <button
        onClick={onClose}
        className="
            rounded-full
            p-2
            text-stone-300
            transition
            hover:bg-white/10
            hover:text-white
        "
      >
        ✕
      </button>
    </header>
  );
}
