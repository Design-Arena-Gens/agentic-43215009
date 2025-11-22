'use client';

import { useRef } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { SignaturePreview } from "@/components/SignaturePreview";
import { ExportActions } from "@/components/ExportActions";

export default function Page() {
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <main className="flex min-h-screen flex-col gap-10 bg-gradient-to-br from-[#ede9fe] via-white to-[#dbeafe] px-6 py-16 sm:px-10">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 text-center">
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-indigo-600">
          Signature officielle
        </span>
        <h1 className="text-4xl font-semibold text-slate-800 sm:text-5xl md:text-6xl">
          Ouabas Hakima
        </h1>
        <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
          Générateur de signature électronique haut de gamme, exportable en PNG ou SVG, conçu
          pour apporter élégance et professionnalisme à vos documents numériques.
        </p>
      </section>

      <SignaturePreview ref={previewRef} />

      <ControlPanel />

      <ExportActions targetRef={previewRef} />

      <footer className="mx-auto mt-6 flex w-full max-w-4xl justify-between text-xs uppercase tracking-[0.4em] text-slate-500">
        <span>Signature numérique</span>
        <span>Ouabas Hakima</span>
        <span>2024</span>
      </footer>
    </main>
  );
}
