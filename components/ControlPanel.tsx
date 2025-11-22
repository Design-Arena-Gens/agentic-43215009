'use client';

import { useSignatureStore } from "@/lib/signatureStore";

export function ControlPanel() {
  const {
    font,
    weight,
    slant,
    letterSpacing,
    color,
    dropShadow,
    underline,
    background,
    watermark,
    setFont,
    setWeight,
    setSlant,
    setLetterSpacing,
    setColor,
    setDropShadow,
    toggleUnderline,
    setBackground,
    toggleWatermark
  } = useSignatureStore();

  return (
    <section className="grid gap-6 rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-lg backdrop-blur sm:grid-cols-2">
      <div className="space-y-4">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">
            Style
          </p>
        </header>
        <div className="flex flex-wrap gap-3">
          {[
            { key: "great", label: "Great Vibes" },
            { key: "dancing", label: "Dancing Script" },
            { key: "pacifico", label: "Pacifico" }
          ].map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setFont(option.key as typeof font)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                font === option.key
                  ? "border-indigo-500 bg-indigo-500 text-white shadow-md"
                  : "border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Épaisseur du trait
          <input
            type="range"
            min={300}
            max={600}
            step={25}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="accent-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Inclinaison
          <input
            type="range"
            min={-18}
            max={6}
            step={1}
            value={slant}
            onChange={(e) => setSlant(Number(e.target.value))}
            className="accent-indigo-500"
          />
        </label>
      </div>
      <div className="space-y-4">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">
            Finition
          </p>
        </header>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Espacement
          <input
            type="range"
            min={-5}
            max={20}
            step={1}
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
            className="accent-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Ombre calligraphique
          <input
            type="range"
            min={0}
            max={24}
            step={2}
            value={dropShadow}
            onChange={(e) => setDropShadow(Number(e.target.value))}
            className="accent-indigo-500"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-600">
          Teinte principale
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-16 cursor-pointer rounded border border-slate-200 bg-transparent p-1"
          />
        </label>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
          <button
            type="button"
            onClick={toggleUnderline}
            className={`rounded-full border px-3 py-2 transition ${
              underline
                ? "border-indigo-500 bg-indigo-500 text-white shadow-md"
                : "border-slate-200 hover:border-indigo-200 hover:text-indigo-600"
            }`}
          >
            Ligne de base
          </button>
          <button
            type="button"
            onClick={toggleWatermark}
            className={`rounded-full border px-3 py-2 transition ${
              watermark
                ? "border-indigo-500 bg-indigo-500 text-white shadow-md"
                : "border-slate-200 hover:border-indigo-200 hover:text-indigo-600"
            }`}
          >
            Monogramme
          </button>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-600">
          Fond
          <div className="flex gap-2">
            {[
              { key: "paper", label: "Papier" },
              { key: "clean", label: "Épuré" },
              { key: "noir", label: "Nocturne" }
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setBackground(option.key as typeof background)}
                className={`rounded-2xl border px-4 py-2 transition ${
                  background === option.key
                    ? "border-indigo-500 bg-indigo-500 text-white shadow-md"
                    : "border-slate-200 hover:border-indigo-200 hover:text-indigo-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
