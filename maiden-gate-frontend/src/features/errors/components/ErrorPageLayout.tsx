import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

type ErrorAction = {
  label: string;
  to: string;
};

type ErrorPageLayoutProps = {
  code: string;
  title: string;
  description: string;
  icon: LucideIcon;
  primaryAction?: ErrorAction;
  secondaryAction?: ErrorAction;
};

export default function ErrorPageLayout({
  code,
  title,
  description,
  icon: Icon,
  primaryAction = {
    label: "Voltar ao início",
    to: "/",
  },
  secondaryAction,
}: ErrorPageLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-amber-100">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-rose-600/10 blur-3xl" />

      <section className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-900/30 bg-slate-900/70 shadow-2xl shadow-black/40">
        <div className="border-b border-amber-900/25 bg-gradient-to-r from-amber-900/30 to-rose-900/30 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/10">
              <Icon className="h-5 w-5 text-amber-400" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/60">
                Maiden-Gate
              </p>

              <p className="mt-0.5 text-sm text-amber-100/45">
                Algo impediu o acesso a esta área
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-10 text-center sm:px-10">
          <p className="mb-4 bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-8xl">
            {code}
          </p>

          <h1 className="text-2xl font-bold text-amber-100 sm:text-3xl">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-amber-100/55 sm:text-base">
            {description}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to={primaryAction.to}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-900/30 transition-all hover:scale-[1.02] hover:from-amber-400 hover:to-rose-500 active:scale-95"
            >
              <Home className="h-4 w-4" />
              {primaryAction.label}
            </Link>

            {secondaryAction && (
              <Link
                to={secondaryAction.to}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-900/40 bg-slate-950/50 px-5 py-3 text-sm font-semibold text-amber-100/60 transition-all hover:border-amber-700/50 hover:text-amber-100"
              >
                <ArrowLeft className="h-4 w-4" />
                {secondaryAction.label}
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
