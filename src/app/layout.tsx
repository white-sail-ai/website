import type { Metadata, Viewport } from "next";
import { Montserrat, Roboto_Slab } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.legalName} | ${site.headline.join(" ")}`,
  description: site.description,
  openGraph: {
    title: `${site.legalName} | ${site.headline.join(" ")}`,
    description: site.description,
    siteName: site.legalName,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcf7f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} ${robotoSlab.variable}`}>
      <body>{children}</body>
    </html>
  );
}
