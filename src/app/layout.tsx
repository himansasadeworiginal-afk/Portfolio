import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
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
  title: "K. Himansa Sadew Aloka — Front-End Web Designer & Developer",
  description:
    "Front-End Developer with 5+ years of freelance experience building modern, responsive, and interactive websites. Specializing in Shopify, React, and custom web development.",
  icons: {
    icon: "/Portfolio/favicon.svg",
  },
  openGraph: {
    title: "K. Himansa Sadew Aloka — Front-End Web Designer & Developer",
    description:
      "Front-End Developer with 5+ years of experience building modern, responsive websites and eCommerce solutions.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "K. Himansa Sadew Aloka — Front-End Web Designer & Developer",
    description:
      "Front-End Developer with 5+ years of experience building modern, responsive websites and eCommerce solutions.",
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
    >
      <body className="min-h-full">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
