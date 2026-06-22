import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TRUECOLOURS – Automotive & Industrial Paints",
  description:
    "Automotive and industrial paint supplier in Mankweng, Limpopo. Paint colour matching, 2K paints, basecoats, hardeners, thinners, sandpaper, abrasives, masking products, solvents and professional refinish supplies.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "TRUECOLOURS – Automotive & Industrial Paints",
    description:
      "Paint matching, automotive refinish systems, 2K products, primers, hardeners, thinners, fillers, abrasives and workshop supplies in Mankweng, Limpopo.",
    type: "website",
    locale: "en_ZA",
    siteName: "TRUECOLOURS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
