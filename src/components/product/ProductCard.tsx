"use client";

import { Card, CardBody, CardFooter, Chip, Button } from "@heroui/react";
import Link from "next/link";
import { Product } from "../../types";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
    addToWishlist,
    removeFromWishlist,
} from "../../store/slices/wishlistSlice";
import { addToCart, openCart } from "../../store/slices/cartSlice";
import QuickView from "./QuickView";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(
        (state: RootState) => state.wishlist.items
    );
    const [isHovered, setIsHovered] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);

    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isInWishlist) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();

        // Add with default options for quick add
        const defaultSize = product.sizes.find((s) => s.available)?.value;
        const defaultColor = product.colors.find((c) => c.available)?.name;

        if (defaultSize && defaultColor) {
            dispatch(
                addToCart({
                    product,
                    selectedSize: defaultSize,
                    selectedColor: defaultColor,
                    quantity: 1,
                })
            );
            dispatch(openCart());
        } else {
            // Open quick view if options need to be selected
            setShowQuickView(true);
        }
    };

    return (
        <>
            <Card
                className="group cursor-pointer"
                radius="none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <CardBody className="p-0 relative overflow-hidden">
                    <Link href={`/products/${product.id}`}>
                        <div className="aspect-[3/4] bg-gray-100 relative">
                            {/* Product Image */}
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />

                            {/* Hover Overlay */}
                            {isHovered && (
                                <div className="absolute inset-0 bg-black/10 transition-opacity" />
                            )}

                            {/* Badges */}
                            {product.featured && (
                                <Chip
                                    className="absolute top-2 left-2 z-10"
                                    color="danger"
                                    size="sm"
                                    variant="solid"
                                >
                                    NEW
                                </Chip>
                            )}

                            {!product.inStock && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                    <Chip color="default" variant="solid">
                                        Out of Stock
                                    </Chip>
                                </div>
                            )}
                        </div>
                    </Link>

                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <Button
                            isIconOnly
                            size="sm"
                            className="bg-white/90 backdrop-blur-sm"
                            onClick={handleWishlistToggle}
                        >
                            <Heart
                                size={16}
                                fill={isInWishlist ? "currentColor" : "none"}
                                className={isInWishlist ? "text-red-500" : ""}
                            />
                        </Button>
                        <Button
                            isIconOnly
                            size="sm"
                            className="bg-white/90 backdrop-blur-sm"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowQuickView(true);
                            }}
                        >
                            <Eye size={16} />
                        </Button>
                    </div>

                    {/* Quick Add Button */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            className="w-full bg-white/90 backdrop-blur-sm"
                            size="sm"
                            startContent={<ShoppingBag size={16} />}
                            onClick={handleQuickAdd}
                            isDisabled={!product.inStock}
                        >
                            Quick Add
                        </Button>
                    </div>
                </CardBody>

                <CardFooter className="flex flex-col items-start p-3">
                    <Link href={`/products/${product.id}`} className="w-full">
                        <p className="text-xs font-medium tracking-wide line-clamp-2 hover:underline">
                            {product.name}
                        </p>
                    </Link>
                    <p className="text-sm font-semibold mt-1">
                        ${product.price}
                    </p>
                    {product.colors.length > 1 && (
                        <div className="flex gap-1 mt-2">
                            {product.colors.slice(0, 4).map((color) => (
                                <div
                                    key={color.name}
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                            ))}
                            {product.colors.length > 4 && (
                                <span className="text-xs text-gray-500 ml-1">
                                    +{product.colors.length - 4}
                                </span>
                            )}
                        </div>
                    )}
                </CardFooter>
            </Card>

            {/* Quick View Modal */}
            <QuickView
                product={product}
                isOpen={showQuickView}
                onClose={() => setShowQuickView(false)}
            />
        </>
    );
};

export default ProductCard;
