import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-5xl font-semibold text-amber-100">Contato</h1>

      <p className="mb-12 text-lg leading-8 text-amber-100/70">
        Envie sugestões, relate problemas ou entre em contato com a equipe do
        Voice Of Flower.
      </p>

      <div className="rounded-2xl border border-amber-900/30 bg-slate-900/50 p-6 shadow-2xl shadow-black/20 sm:p-8">
        <ContactForm />
      </div>
    </main>
  );
}
