import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Resha Eka Aulia | Portfolio",
  description: "Communication professional bridging creative storytelling and strategic marketing.",
  authors: [{ name: "zakyislm", url: "https://zakyislm.github.io" }],
  verification: {
    google: "LXBNqAzezUC27mP2CsHXL1LdKPp2u9ra6Zyk4vR0u68",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} antialiased bg-[#FFF2EF] text-[#1A2A4F] selection:bg-[#1A2A4F] selection:text-[#FFF2EF]`}
      >
        {children}
      </body>
    </html>
  );
}
