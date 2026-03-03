import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const nbInternational = Manrope({
  subsets: ["latin"],
  variable: "--font-nb-international",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Louis Browne",
  description: "Homepage recreation in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nbInternational.variable} antialiased`}>{children}</body>
    </html>
  );
}
