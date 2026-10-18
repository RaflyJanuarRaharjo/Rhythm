import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "@fontsource/hanken-grotesk/600.css";
import "@fontsource/hanken-grotesk/700.css";
import "@fontsource/hanken-grotesk/600-italic.css";
import "@fontsource/hanken-grotesk/900-italic.css";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";

export const metadata: Metadata = {
  title: "Rhythm — Your team, in Rhythm",
  description:
    "Your meetings, chats, and documents hold the answers. Ritme brings them together into clear priorities and a focused plan for the week ahead.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
