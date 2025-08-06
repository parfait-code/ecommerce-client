// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import SearchModal from "@/components/search/SearchModal";

export const metadata: Metadata = {
    title: "Fashion Store - Mode & Vêtements",
    description: "Boutique de vêtements en ligne - Mode pour homme, femme et enfant",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body>
                <Providers>
                    {children}
                    <SearchModal />
                </Providers>
            </body>
        </html>
    );
}
