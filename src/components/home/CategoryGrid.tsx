"use client";

import { Card, CardBody, CardFooter } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
    {
        title: "KNITWEAR",
        image: "/images/knitwear-category.jpg",
        link: "/category/knitwear",
    },
    {
        title: "TROUSERS",
        image: "/images/trousers-category.jpg",
        link: "/category/trousers",
    },
    {
        title: "T-SHIRTS & VESTS",
        image: "/images/tshirts-category.jpg",
        link: "/category/t-shirts-vests",
    },
    {
        title: "SHIRTS",
        image: "/images/shirts-category.jpg",
        link: "/category/shirts",
    },
];

const CategoryGrid = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link href={category.link}>
                            <Card
                                className="relative h-[500px] group cursor-pointer"
                                radius="none"
                            >
                                <CardBody className="p-0 overflow-hidden">
                                    <div className="absolute inset-0 bg-gray-200">
                                        {/* Placeholder for image */}
                                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                                    </div>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                                </CardBody>
                                <CardFooter className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm">
                                    <p className="text-sm font-medium tracking-wider">
                                        {category.title}
                                    </p>
                                </CardFooter>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CategoryGrid;
