import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Zen_Kaku_Gothic_Antique } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// The chart's one family, for headings, labels, and running text alike.
const zenKaku = Zen_Kaku_Gothic_Antique({
  variable: "--font-zen",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// Only the logo's wordmark is set in Cormorant Garamond, in spaced capitals.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} | ${site.headline.join(" ")}`,
  description: site.description,
  openGraph: {
    title: `${site.name} | ${site.headline.join(" ")}`,
    description: site.description,
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3263",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${zenKaku.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
