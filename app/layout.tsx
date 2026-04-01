import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const nbInternational = Manrope({
  subsets: ["latin"],
  variable: "--font-nb-international",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Louis Browne — Photographer & Director, New York",
    template: "%s | Louis Browne",
  },
  description:
    "London-born, New York-based photographer and director. Commercial work for Nike, Dior, Gucci and Adidas. Editorial in British Vogue and Rolling Stone. Available for projects globally.",
  metadataBase: new URL("https://www.louisbrowne.co"),
  openGraph: {
    siteName: "Louis Browne",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Louis Browne — Photographer & Director",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Louis Browne",
  jobTitle: "Photographer and Director",
  url: "https://www.louisbrowne.co",
  image: "https://www.louisbrowne.co/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressCountry: "US",
  },
  sameAs: ["https://www.instagram.com/louis_browne/"],
  knowsAbout: [
    "Photography",
    "Commercial Direction",
    "Music Photography",
    "Fashion Photography",
    "Editorial Photography",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Louis Browne",
  url: "https://www.louisbrowne.co",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${nbInternational.variable} antialiased`}>{children}</body>
    </html>
  );
}
