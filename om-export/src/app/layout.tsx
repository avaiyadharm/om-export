import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "OM Export — Global Trade & Export Services",
  description:
    "OM Export is a premier global trade and export company specializing in Dairy, Electronics, Garments, Cereals, Pharmaceuticals, Chemicals, Petroleum, Textiles, Mechanical Equipment, and Jewellery exports to 50+ countries.",
  keywords:
    "export, import, global trade, Indian exports, dairy, electronics, garments, pharmaceuticals, jewellery, wholesale, bulk export",
  openGraph: {
    title: "OM Export — Global Trade & Export Services",
    description:
      "Connecting businesses worldwide with premium Indian exports across 50+ countries.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
