import type { Metadata, Viewport } from "next";
import { Montserrat, Zen_Kaku_Gothic_Antique } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// The chart's one family, for headings, labels, and running text alike.
const zenKaku = Zen_Kaku_Gothic_Antique({
  variable: "--font-zen",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// Only the logo's wordmark is set in Montserrat.
const montserrat = Montserrat({
  variable: "--font-montserrat",
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
      className={`${zenKaku.variable} ${montserrat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
