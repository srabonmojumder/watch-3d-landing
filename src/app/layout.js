import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "@/styles/globals.scss";
import { WatchProvider } from "@/context/WatchContext";
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
export const metadata = {
    title: "VÉRAN - LE VOYAGEUR | Haute Horlogerie Paris",
    description: "Steel, 39 mm, hand-wound luxury timepiece. Glashütte lines, guilloché slate, and tool-free interchangeable straps. Made by VÉRAN in Paris.",
    keywords: "VÉRAN Paris, luxury horology, mechanical watch, calibre V-101, 39mm steel, swiss chronometre",
    openGraph: {
        title: "VÉRAN - LE VOYAGEUR | Haute Horlogerie Paris",
        description: "The 39mm 316L Handcrafted Mechanical Timepiece from 12 Place Vendôme, Paris.",
        type: "website",
    },
};
export default function RootLayout({ children, }) {
    return (<html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${montserrat.variable} dark antialiased`}>
      <body suppressHydrationWarning className="bg-[#040507] text-[#f4f4f5] font-sans selection:bg-white/20 selection:text-white">
        <WatchProvider>{children}</WatchProvider>
      </body>
    </html>);
}
