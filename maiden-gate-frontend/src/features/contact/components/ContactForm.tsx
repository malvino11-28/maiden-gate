import { useState } from "react";
import { Send } from "lucide-react";

import Label from "../../../shared/components/Form/Label";
import Input from "../../../shared/components/Form/Input";
import TextArea from "../../../shared/components/Form/TextArea";
import Button from "../../../shared/components/Form/Button";

import UrgencyCard from "./UrgencyCard";
import { urgencyOptions } from "../data/UrgencyOptions";

export default function ContactForm() {
  const [urgency, setUrgency] = useState("low");

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      ...form,
      urgency,
    });

    // Futuramente:
    // await ContactService.send(...)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <Label htmlFor="name">Nome</Label>

        <Input
          id="name"
          name="name"
          placeholder="Seu nome de aventureiro"
          value={form.name}
          onChange={handleChange}
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
        />
      </div>

      <div>
        <Label htmlFor="subject">Assunto</Label>

        <Input
          id="subject"
          name="subject"
          placeholder="Descreva brevemente o motivo"
          value={form.subject}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Urgência de Resposta</Label>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {urgencyOptions.map((option) => (
            <UrgencyCard
              key={option.value}
              selected={urgency === option.value}
              onClick={() => setUrgency(option.value)}
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
          rows={7}
          placeholder="Descreva sua sugestão, dúvida ou problema..."
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="flex items-center justify-center gap-3">
        <Send size={18} />
        Enviar Mensagem
      </Button>
    </form>
  );
}
