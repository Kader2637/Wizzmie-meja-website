import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { OrderProvider } from "@/context/OrderContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Wizzmie | Mie Pedas & Dimsum Lezat",
  description: "Pesan menu Wizzmie favoritmu dengan mudah and pilih meja favoritmu.",
  icons: {
    icon: "/logohead.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#fafafa] text-gray-900 font-sans flex flex-col overflow-x-hidden">
        <OrderProvider>
          <Navbar />
          <main className="flex-grow">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </OrderProvider>
      </body>
    </html>
  );
}
