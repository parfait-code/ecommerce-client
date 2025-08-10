"use client";

import { Card, CardBody, CardFooter, Chip } from "@heroui/react";
import Link from "next/link";
import { Product } from "../../types";
import { Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <Link href={`/products/${product.id}`}>
            <Card
                className="group cursor-pointer"
                radius="none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setCurrentImageIndex(0);
                }}
            >
                <CardBody className="p-0 relative overflow-hidden">
                    <div className="aspect-[3/4] bg-gray-100 relative">
                        {/* Placeholder image - replace with actual image */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />

                        {/* Hover image change effect */}
                        {product.images[1] && isHovered && (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
                        )}

                        {/* Wishlist button */}
                        <button
                            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                                e.preventDefault();
                                // Handle wishlist
                            }}
                        >
                            <Heart size={16} />
                        </button>

                        {/* Sale badge if applicable */}
                        {product.featured && (
                            <Chip
                                className="absolute top-2 left-2"
                                color="danger"
                                size="sm"
                                variant="flat"
                            >
                                NEW
                            </Chip>
                        )}
                    </div>
                </CardBody>
                <CardFooter className="flex flex-col items-start p-3">
                    <p className="text-xs font-medium tracking-wide line-clamp-2">
                        {product.name}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                        ${product.price}
                    </p>
                    {product.colors.length > 1 && (
                        <div className="flex gap-1 mt-2">
                            {product.colors.map((color) => (
                                <div
                                    key={color.name}
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    )}
                </CardFooter>
            </Card>
        </Link>
    );
};

export default ProductCard;
