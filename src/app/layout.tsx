import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import CookieBanner from "@/components/consent/CookieBanner";
import { CONSENT_BOOTSTRAP_SCRIPT } from "@/lib/consent";
import { rootGraphSchema } from "@/lib/seo/jsonld";
import { ADSENSE_CLIENT_ID, SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: Football News, Transfers & Analysis`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name}: Football News, Transfers & Analysis`,
    description: SITE.description,
    images: [
      {
        url: "/images/og-image.webp",
        width: 1536,
        height: 1024,
        alt: `${SITE.name}: Football News, Transfers & Analysis`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}: Football News, Transfers & Analysis`,
    description: SITE.description,
    images: ["/images/og-image.webp"],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "NWPw-C63sAYRuRbzrnuoUo5wx0Vqep5KxXYkHHW5E6Q",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/images/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/images/apple-icon.png", sizes: "180x180" }],
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <head>
        {/* Consent Mode defaults must run before any Google tag. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP_SCRIPT }} />
        {/* AdSense loader, deliberately after the consent defaults above. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <JsonLd data={rootGraphSchema()} />
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
