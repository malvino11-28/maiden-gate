type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

export default function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className="space-y-5">
      <h3
        className="
          text-lg
          font-semibold
          uppercase
          tracking-wider
          text-orange-100
        "
      >
        {title}
      </h3>

      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
