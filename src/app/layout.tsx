import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import PreloaderWrapper from "@/components/PreloaderWrapper";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://himansasadeworiginal-afk.github.io/Portfolio"),
  title: "H. Sadew — Creative Director of Wolf Industries",
  description:
    "Creative Director of Wolf Industries. Building fast, intelligent, and visually stunning web experiences with AI integration.",
  icons: {
    icon: "/Portfolio/favicon.svg",
  },
  openGraph: {
    title: "H. Sadew — Creative Director of Wolf Industries",
    description:
      "Creative Director of Wolf Industries. Building fast, intelligent, and visually stunning web experiences with AI integration.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "H. Sadew — Creative Director of Wolf Industries",
    description:
      "Creative Director of Wolf Industries. Building fast, intelligent, and visually stunning web experiences with AI integration.",
    images: ["/og-image.svg"],
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
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#D4AF37" />
        <link rel="manifest" href="/Portfolio/manifest.json" />
        <link rel="preconnect" href="https://api.github.com" />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme:light)").matches?"light":"dark"}if(t==="light"){document.documentElement.classList.add("light")}}catch(e){}})()`,
        }} />
      </head>
      <body className="min-h-full">
        <div className="noise-overlay" aria-hidden="true" />
        <PreloaderWrapper>{children}</PreloaderWrapper>
      </body>
    </html>
  );
}
