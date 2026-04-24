import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import GlobalSearch from "@/components/layout/GlobalSearch";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "VelocityDB | Master Databases at the Speed of Intelligence",
  description: "A cinematic, interactive learning platform to demolish your DBMS final exam.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-black text-white selection:bg-primary/30 flex flex-col md:flex-row min-h-screen`}
      >
        <GlobalSearch />
        <Navigation />
        <main className="flex-1 w-full pb-20 md:pb-0 overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
