"use client";

import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
    videoSrc?: string;
    title: string;
    subtitle: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
}

export default function HeroSection({
    videoSrc = "/assets/videos/hero.mp4",
    title,
    subtitle,
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref,
}: HeroSectionProps) {
    return (
        <section className="relative h-[600px] overflow-hidden text-white">
            {/* Video Background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/assets/videos/hero.mp4"
            />
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            
            {/* Content */}
            <div className="relative container mx-auto px-4 h-full flex items-center z-20">
                <div className="max-w-2xl">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                        {title}
                    </h1>
                    <p className="text-xl mb-8 text-white/90 drop-shadow-md">
                        {subtitle}
                    </p>
                    <div className="flex gap-4">
                        <Button
                            as={Link}
                            href={primaryButtonHref}
                            size="lg"
                            color="default"
                            endContent={<ArrowRight size={20} />}
                            className="shadow-lg"
                        >
                            {primaryButtonText}
                        </Button>
                        {secondaryButtonText && secondaryButtonHref && (
                            <Button
                                as={Link}
                                href={secondaryButtonHref}
                                size="lg"
                                variant="bordered"
                                className="text-white border-white hover:bg-white hover:text-primary shadow-lg backdrop-blur-sm"
                            >
                                {secondaryButtonText}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}