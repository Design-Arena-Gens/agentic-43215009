'use client';

import { useState } from "react";
import type { RefObject } from "react";
import { toPng, toSvg } from "html-to-image";
import { useSignatureStore } from "@/lib/signatureStore";

interface ExportActionsProps {
  targetRef: RefObject<HTMLElement>;
}

export function ExportActions({ targetRef }: ExportActionsProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { background } = useSignatureStore();

  const backgroundColor =
    background === "noir" ? "#0f172a" : background === "clean" ? "#ffffff" : "#f5f3ff";

  async function handleDownload(format: "png" | "svg") {
    if (
      !targetRef.current ||
      isProcessing ||
      typeof window === "undefined"
    ) {
      return;
    }
    try {
      setIsProcessing(true);
      if (format === "png") {
        const dataUrl = await toPng(targetRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor
        });
        const link = document.createElement("a");
        link.download = "signature-ouabas-hakima.png";
        link.href = dataUrl;
        link.click();
      } else {
        const dataUrl = await toSvg(targetRef.current, {
          cacheBust: true,
          backgroundColor
        });
        const link = document.createElement("a");
        link.download = "signature-ouabas-hakima.svg";
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error("Export error", error);
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleCopy() {
    if (!targetRef.current || isProcessing) {
      return;
    }
    try {
      setIsProcessing(true);
      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor
      });
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const ClipboardItemCtor =
        typeof window !== "undefined" ? (window as typeof window & { ClipboardItem?: any }).ClipboardItem : undefined;
      if (!ClipboardItemCtor) {
        return;
      }
      const clipboardItem = new ClipboardItemCtor({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      console.error("Copy error", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => handleDownload("png")}
        disabled={isProcessing}
        className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        Télécharger PNG
      </button>
      <button
        type="button"
        onClick={() => handleDownload("svg")}
        disabled={isProcessing}
        className="rounded-full border border-indigo-200 px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:border-indigo-500 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Télécharger SVG
      </button>
      <button
        type="button"
        onClick={handleCopy}
        disabled={isProcessing || typeof navigator?.clipboard === "undefined"}
        className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Copier dans le presse-papiers
      </button>
    </div>
  );
}
