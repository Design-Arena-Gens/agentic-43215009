'use client';

import { forwardRef } from "react";
import clsx from "clsx";
import { useSignatureStore } from "@/lib/signatureStore";

const backgroundMap = {
  paper:
    "from-[#f5f3ff] via-[#fef7ff] to-[#ede9fe] border-[#d8d4fc]/70 shadow-lg",
  clean: "from-white via-white to-white border-white shadow-md",
  noir: "from-[#0f172a] via-[#1f2937] to-[#0f172a] border-white/10 shadow-xl"
} as const;

const fontClassMap = {
  great: "font-[var(--font-great)]",
  dancing: "font-[var(--font-dancing)]",
  pacifico: "font-[var(--font-pacifico)]"
} as const;

export const SignaturePreview = forwardRef<HTMLDivElement>(function SignaturePreview(
  _,
  ref
) {
  const {
    fullName,
    font,
    weight,
    slant,
    letterSpacing,
    color,
    dropShadow,
    underline,
    background,
    watermark
  } = useSignatureStore();

  const filterShadow =
    dropShadow > 0
      ? `drop-shadow(0 ${dropShadow / 12}rem ${dropShadow / 8}rem rgba(15, 23, 42, 0.25))`
      : "none";

  const textShadow =
    dropShadow > 0
      ? `0 ${dropShadow / 14}rem ${dropShadow / 6}rem rgba(15,23,42,0.35)`
      : "none";

  return (
    <div
      ref={ref}
      className={clsx(
        "relative mx-auto flex h-[320px] w-full max-w-3xl items-center justify-center rounded-3xl border bg-gradient-to-br p-10 transition-colors duration-500",
        backgroundMap[background]
      )}
    >
      {watermark && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
          <span className="font-mono text-5xl uppercase tracking-[0.3em]">
            OH
          </span>
        </div>
      )}
      <div className="flex w-full flex-col items-center justify-center gap-6">
        <span
          className={clsx(
            "signature-preview text-5xl transition-all duration-300 sm:text-6xl md:text-7xl",
            fontClassMap[font]
          )}
          style={{
            color,
            fontWeight: weight,
            letterSpacing: `${letterSpacing / 10}em`,
            transform: `skewX(${slant}deg)`,
            filter: filterShadow,
            textShadow
          }}
        >
          {fullName}
        </span>
        {underline && (
          <span
            className="h-0.5 w-3/4 rounded-full"
            style={{
              background: color,
              boxShadow: `0 6px 12px -6px ${color}80`
            }}
          />
        )}
        <span
          className={clsx(
            "text-sm uppercase tracking-[0.55em]",
            background === "noir" ? "text-white/80" : "text-slate-600/80"
          )}
        >
          Signature numérique certifiée
        </span>
      </div>
    </div>
  );
});
