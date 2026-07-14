import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KINETIX | Immersive Premium Luxury Fitness Club",
  description: "Experience the epitome of fitness luxury at KINETIX. Cinematic digital training, state-of-the-art facilities, elite coaching, and premium architectural conditioning.",
  metadataBase: new URL("https://kinetix-luxury-fitness.vercel.app"),
  openGraph: {
    title: "KINETIX | Premium Luxury Fitness Club",
    description: "Immersive architectural conditioning, elite strength training, and premium recovery suites.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-full">
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
