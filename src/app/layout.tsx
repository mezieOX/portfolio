import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import Script from "next/script";
import { ThemeScript } from "@/components/ThemeScript";
import { getYearsOfExperience } from "@/lib/data";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const years = getYearsOfExperience();

export const metadata: Metadata = {
  metadataBase: new URL("https://mezieox.github.io/portfolio"),
  title: "Mezie — Senior Front-End / Mobile Engineer",
  description: `Ikemma Augustine Chimezie — Senior Front-End / Mobile Engineer with ${years} years of experience building user-focused web and mobile apps with React, Next.js, and React Native.`,
  icons: {
    icon: "/assets/logo.png",
  },
  openGraph: {
    title: "Mezie — Senior Front-End / Mobile Engineer",
    description: `Senior Front-End / Mobile Engineer with ${years} years of experience.`,
    images: ["/assets/og-cover.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mezie — Senior Front-End / Mobile Engineer",
    description: `Senior Front-End / Mobile Engineer with ${years} years of experience.`,
    images: ["/assets/og-cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        {children}
        <Script
          src="//code.tidio.co/kpdytf4ich7gzlrqwgvli7uuvl4xvurv.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
