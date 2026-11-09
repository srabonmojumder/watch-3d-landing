import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VÉRAN - LE VOYAGEUR | Haute Horlogerie Paris",
  description: "Steel, 39 mm, hand-wound luxury timepiece. Glashütte lines, guilloché slate, and tool-free interchangeable straps. Made by VÉRAN in Paris.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-[#0b0c0e] text-[#f4f4f5] font-sans selection:bg-[#c5a059]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
