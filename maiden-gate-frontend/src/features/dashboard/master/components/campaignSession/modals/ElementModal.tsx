import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";

import { elementForms, type ElementFormKey } from "../../../data/elementForms";

type Props = {
  type: ElementFormKey;
  onClose: () => void;
};

export default function ElementModal({ type, onClose }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const config = elementForms[type];
  const Icon = config.icon;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1100);
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        p-4
      "
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="
          relative
          flex
          max-h-[90vh]
          w-full
          max-w-lg
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-amber-900/40
          bg-slate-950
          shadow-2xl
        "
      >
        <div
          className="
            flex
            flex-shrink-0
            items-center
            justify-between
            border-b
            border-amber-900/30
            bg-gradient-to-r
            from-amber-900/40
            to-rose-900/40
            px-6
            py-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-gradient-to-br
                ${config.color}
              `}
            >
              <Icon className={`h-5 w-5 ${config.iconColor}`} />
            </div>

            <h2 className="text-lg font-semibold text-amber-100">
              {config.label}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-amber-100/50
              transition
              hover:bg-amber-900/30
              hover:text-amber-100
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-y-auto px-6 py-6"
        >
          {config.fields.map((field) => (
            <div key={field.name}>
              <label className="mb-1.5 block text-sm font-medium text-amber-100/80">
                {field.label}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  rows={3}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(event) =>
                    setValues((previous) => ({
                      ...previous,
                      [field.name]: event.target.value,
                    }))
                  }
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-amber-900/40
                    bg-slate-900/80
                    px-4
                    py-2.5
                    text-sm
                    text-amber-100
                    placeholder:text-amber-100/25
                    outline-none
                    transition
                    focus:border-amber-500/70
                    focus:ring-1
                    focus:ring-amber-500/30
                  "
                />
              ) : (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(event) =>
                    setValues((previous) => ({
                      ...previous,
                      [field.name]: event.target.value,
                    }))
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    border-amber-900/40
                    bg-slate-900/80
                    px-4
                    py-2.5
                    text-sm
                    text-amber-100
                    placeholder:text-amber-100/25
                    outline-none
                    transition
                    focus:border-amber-500/70
                    focus:ring-1
                    focus:ring-amber-500/30
                  "
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className={`
              w-full
              rounded-xl
              bg-gradient-to-r
              from-amber-500
              to-rose-600
              px-5
              py-3
              font-semibold
              text-white
              transition-all
              hover:from-amber-600
              hover:to-rose-700

              ${saved ? "scale-95 opacity-70" : ""}
            `}
          >
            {saved ? "Salvo!" : "Criar"}
          </button>
        </form>
      </div>
    </div>
  );
}
