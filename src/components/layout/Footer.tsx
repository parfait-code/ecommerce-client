"use client";
import Link from "next/link";
import { Input, Button } from "@heroui/react";

const Footer = () => {
    const companyLinks = [
        { name: "ABOUT", href: "/about" },
        { name: "CAREERS", href: "/careers" },
        { name: "PRESS", href: "/press" },
        { name: "STORE LOCATOR", href: "/stores" },
        { name: "DESIGN AND CRAFT", href: "/design" },
        { name: "FEATURES", href: "/features" },
    ];

    const assistanceLinks = [
        { name: "CONTACT US", href: "/contact" },
        { name: "DELIVERY INFORMATION", href: "/delivery" },
        { name: "PAYMENTS", href: "/payments" },
        { name: "RETURN & REFUNDS", href: "/returns" },
        { name: "FAQ", href: "/faq" },
        { name: "PRODUCT CARE", href: "/care" },
        { name: "SIZE GUIDES", href: "/size-guide" },
        { name: "FIT GUIDE", href: "/fit-guide" },
        { name: "STUDENT DISCOUNT", href: "/student" },
    ];

    const legalLinks = [
        { name: "PRIVACY POLICY", href: "/privacy" },
        { name: "TERMS & CONDITIONS", href: "/terms" },
        { name: "COOKIE NOTICE", href: "/cookies" },
        { name: "COOKIE SETTINGS", href: "/cookie-settings" },
        { name: "ACCESSIBILITY", href: "/accessibility" },
    ];

    const socialLinks = [
        { name: "FACEBOOK", href: "#" },
        { name: "INSTAGRAM", href: "#" },
        { name: "PINTEREST", href: "#" },
        { name: "TIKTOK", href: "#" },
        { name: "SPOTIFY", href: "#" },
    ];

    return (
        <footer className="bg-black text-white mt-20">
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-center mb-12">
                    <Link
                        href="/"
                        className="text-5xl font-bold tracking-wider"
                    >
                        COS
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className="text-xs font-semibold mb-4 tracking-wider">
                            THE COMPANY
                        </h3>
                        <ul className="space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-xs hover:underline"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold mb-4 tracking-wider">
                            ASSISTANCE
                        </h3>
                        <ul className="space-y-2">
                            {assistanceLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-xs hover:underline"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold mb-4 tracking-wider">
                            LEGAL
                        </h3>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-xs hover:underline"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold mb-4 tracking-wider">
                            FOLLOW US
                        </h3>
                        <ul className="space-y-2 mb-6">
                            {socialLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-xs hover:underline"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <h3 className="text-xs font-semibold mb-4 tracking-wider">
                            SUBSCRIBE
                        </h3>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                size="sm"
                                classNames={{
                                    input: "bg-transparent",
                                    inputWrapper: "bg-transparent border-white",
                                }}
                            />
                            <Button size="sm" className="bg-white text-black">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-xs">© 2025 COS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
