"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../src/store/store";
import { useEffect } from "react";
import AccountSidebar from "../../src/components/account/AccountSidebar";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <AccountSidebar />
                </div>
                <div className="lg:col-span-3">{children}</div>
            </div>
        </div>
    );
}
