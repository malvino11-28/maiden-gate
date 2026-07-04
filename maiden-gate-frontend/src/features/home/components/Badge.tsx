type BadgeProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export default function Badge({
  children,
  active = false,
  onClick,
}: BadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-full
        px-5
        py-2

        text-sm
        font-semibold

        transition-all
        duration-300

        ${
          active
            ? `
              bg-gradient-to-r
              from-orange-500
              to-amber-500

              text-white

              shadow-lg
              shadow-orange-500/20
            `
            : `
              border
              border-white/10

              bg-white/5

              text-stone-300

              hover:bg-white/10
            `
        }
      `}
    >
      {children}
    </button>
  );
}
