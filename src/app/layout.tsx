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

// Cormorant Garamond: the logo's wordmark, in spaced capitals, and the blog's titles.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Lets pages give Open Graph and canonical URLs as paths.
  metadataBase: new URL(site.url),
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
