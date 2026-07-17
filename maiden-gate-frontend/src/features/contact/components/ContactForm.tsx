import { useState } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

import Label from "../../../shared/components/Form/Label";
import Input from "../../../shared/components/Form/Input";
import TextArea from "../../../shared/components/Form/TextArea";
import Button from "../../../shared/components/Form/Button";

import UrgencyCard from "./UrgencyCard";
import { urgencyOptions } from "../data/urgencyOptions";

export default function ContactForm() {
  const [urgency, setUrgency] = useState("low");
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isSending) return;

    const selectedUrgency = urgencyOptions.find(
      (option) => option.value === urgency,
    );

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError("Configuração do EmailJS não encontrada.");
      return;
    }

    try {
      setIsSending(true);
      setError(null);

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name.trim(),
          from_email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),

          urgency_value: urgency,
          urgency_label: selectedUrgency?.title ?? urgency,
          urgency_description: selectedUrgency?.description ?? "",
        },
        {
          publicKey,
        },
      );

      setSent(true);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setError(
        "Não foi possível enviar sua mensagem agora. Tente novamente em alguns instantes.",
      );
    } finally {
      setIsSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-12 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl">
          ✓
        </div>

        <h2 className="mb-2 text-2xl font-semibold text-emerald-200">
          Mensagem enviada!
        </h2>

        <p className="mx-auto max-w-md text-emerald-100/65">
          Sua mensagem foi registrada. A equipe responderá conforme a urgência
          selecionada.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          placeholder="Seu nome de aventureiro"
          value={form.name}
          onChange={handleChange}
          required
          disabled={isSending}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={handleChange}
          required
          disabled={isSending}
        />
      </div>

      <div>
        <Label htmlFor="subject">Assunto</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Descreva brevemente o motivo do contato"
          value={form.subject}
          onChange={handleChange}
          required
          disabled={isSending}
        />
      </div>

      <div>
        <Label>Urgência de Resposta</Label>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {urgencyOptions.map((option) => (
            <UrgencyCard
              key={option.value}
              selected={urgency === option.value}
              onClick={() => {
                if (!isSending) {
                  setUrgency(option.value);
                }
              }}
              {...option}
            />
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="message">Mensagem</Label>
        <TextArea
          id="message"
          name="message"
          rows={6}
          placeholder="Descreva sua sugestão, dúvida ou problema com detalhes..."
          value={form.message}
          onChange={handleChange}
          required
          disabled={isSending}
        />
      </div>

      <Button type="submit" disabled={isSending}>
        {isSending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Enviar Mensagem
          </>
        )}
      </Button>
    </form>
  );
}
