import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import OrnamentalDivider from "./OrnamentalDivider";

type Props = {
  title: string;
  subtitle: string;
  badge: string;
  submitLabel: string;
  savedLabel: string;
  saved: boolean;
  formId: string;
  children: React.ReactNode;
};

export default function CharacterPageShell({
  title,
  subtitle,
  badge,
  submitLabel,
  savedLabel,
  saved,
  formId,
  children,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen bg-slate-950 text-amber-100"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 15% 10%, rgba(120,53,15,0.15) 0%, transparent 45%), radial-gradient(ellipse at 85% 90%, rgba(136,19,55,0.12) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, rgba(15,23,42,0) 0%, rgba(2,6,23,0.8) 100%)",
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(180,120,40,0.8) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(180,120,40,0.8) 40px)",
        }}
      />

      <header className="sticky top-0 z-40 border-b border-amber-900/30 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <button
            onClick={() => navigate("/dashboard/player")}
            className="group flex items-center gap-2 text-sm text-amber-100/60 transition-colors hover:text-amber-200"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar ao painel
          </button>

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-rose-400/70" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-amber-100/40">
              Voice of Flower
            </span>
            <Sparkles className="h-4 w-4 text-amber-400/70" />
          </div>

          <button
            type="submit"
            form={formId}
            disabled={saved}
            className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-all ${
              saved
                ? "scale-95 bg-emerald-600/80 text-emerald-100"
                : "bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg shadow-amber-900/30 hover:from-amber-400 hover:to-rose-500 hover:shadow-amber-800/40"
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> {savedLabel}
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> {submitLabel}
              </>
            )}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 pb-2 pt-10 text-center">
        <OrnamentalDivider label={badge} />
        <h1
          className="mt-3 bg-clip-text text-4xl font-bold text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #fbbf24 0%, #f59e0b 40%, #fb7185 80%, #fda4af 100%)",
          }}
        >
          {title}
        </h1>
        <p className="mt-2 text-sm text-amber-100/40">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}
