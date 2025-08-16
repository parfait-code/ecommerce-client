import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import CartDrawer from "../src/components/cart/CartDrawer";
import QuickView from "../src/components/product/QuickView";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "COS - Contemporary Fashion",
    description: "Modern, functional, considered design for women and men",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                    <CartDrawer />
                    {/* <QuickView /> */}
                </Providers>
            </body>
        </html>
    );
}
