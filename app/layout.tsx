import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Syne,
  DM_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EmbedAI ",
  description:
    "Add a fully branded AI chatbot to your Next.js app with a single component.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {

  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased bg-[#080B10] text-[#E6EDF3]`}
        >
        
      <Providers>

          {children}
      </Providers>
        
        </body>
      </html>
    </ClerkProvider>
  );
}
