type Section = {
  title: string;
  content: string[];
};

type LegalPageProps = {
  title: string;
  subtitle: string;
  sections: Section[];
};

export default function LegalPage({
  title,
  subtitle,
  sections,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#090D1F]">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="mb-4 text-5xl font-bold text-white">{title}</h1>

        <p className="mb-14 text-xl text-stone-400">{subtitle}</p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.title}
              className="
                rounded-2xl
                border
                border-white/10
                bg-[#11162B]
                p-8
              "
            >
              <h2 className="mb-5 text-2xl font-semibold text-orange-400">
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.content.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="
                      leading-8
                      text-stone-300
                    "
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
