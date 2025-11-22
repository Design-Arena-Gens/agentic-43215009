import type { Metadata } from "next";
import { Inter, Dancing_Script, Great_Vibes, Pacifico } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing"
});
const great = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great"
});
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico"
});

export const metadata: Metadata = {
  title: "Signature Ouabas Hakima",
  description: "Signature numérique élégante pour Ouabas Hakima."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${dancing.variable} ${great.variable} ${pacifico.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
