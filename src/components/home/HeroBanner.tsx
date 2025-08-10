"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroBanner = () => {
    return (
        <div className="relative h-screen bg-black text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

            <motion.div
                className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <p className="text-xs tracking-[0.3em] mb-4 uppercase">
                    Pre-Fall 2025 Arrivals | Women Men
                </p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-wider mb-8">
                    LATE SUMMER
                </h1>
                <Link href="/new-arrivals">
                    <Button
                        variant="bordered"
                        className="text-white border-white hover:bg-white hover:text-black transition-all"
                        size="lg"
                        radius="none"
                    >
                        NEW ARRIVALS
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
};

export default HeroBanner;
