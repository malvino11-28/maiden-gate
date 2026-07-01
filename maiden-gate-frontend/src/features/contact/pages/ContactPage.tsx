import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="bg-[#090D1F]">
      <section className="mx-auto max-w-4xl px-6 py-28">
        <h1 className="mb-4 text-6xl font-bold text-white">Contato</h1>

        <p className="mb-16 text-xl text-stone-400">
          Envie sugestões, relate problemas ou entre em contato com a equipe do
          Voice Of Flower.
        </p>

        <ContactForm />
      </section>
    </main>
  );
}
