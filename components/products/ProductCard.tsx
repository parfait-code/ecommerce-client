// components/products/ProductCard.tsx
"use client";

import { Card, CardBody, CardFooter, Button, Chip, Image } from "@heroui/react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { addNotification } from "@/store/slices/uiSlice";
import { Product } from "@/store/slices/productsSlice";
import { useState } from "react";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLiked, setIsLiked] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
            })
        );
        dispatch(
            addNotification({
                type: "success",
                message: `${product.name} ajouté au panier !`,
            })
        );
    };

    const handleProductClick = () => {
        router.push(`/products/${product.id}`);
    };

    return (
        <Card
            isPressable
            onPress={handleProductClick}
            className="w-full hover:shadow-lg transition-shadow"
        >
            <CardBody className="p-0 overflow-hidden">
                <div className="relative">
                    <Image
                        alt={product.name}
                        className="w-full object-cover h-[250px]"
                        src={product.image}
                        width="100%"
                    />
                    {product.stock < 10 && product.stock > 0 && (
                        <Chip
                            className="absolute top-2 left-2"
                            color="warning"
                            size="sm"
                            variant="solid"
                        >
                            Stock limité
                        </Chip>
                    )}
                    {product.stock === 0 && (
                        <Chip
                            className="absolute top-2 left-2"
                            color="danger"
                            size="sm"
                            variant="solid"
                        >
                            Rupture de stock
                        </Chip>
                    )}
                    <Button
                        isIconOnly
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur"
                        radius="full"
                        size="sm"
                        variant="flat"
                        onPress={(e) => {
                            e.stopPropagation();
                            setIsLiked(!isLiked);
                        }}
                    >
                        <Heart
                            size={18}
                            className={
                                isLiked ? "fill-red-500 text-red-500" : ""
                            }
                        />
                    </Button>
                </div>
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                            <Star
                                size={16}
                                className="fill-yellow-400 text-yellow-400"
                            />
                            <span className="text-sm ml-1">
                                {product.rating.toFixed(1)}
                            </span>
                        </div>
                        <Chip size="sm" variant="dot" color="secondary">
                            {product.category}
                        </Chip>
                    </div>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                        {product.name}
                    </h3>
                    <p className="text-small text-default-500 line-clamp-2 mb-3">
                        {product.description}
                    </p>
                </div>
            </CardBody>
            <CardFooter className="justify-between items-center px-4 py-3 border-t">
                <div>
                    <p className="font-bold text-xl text-primary">
                        {product.price.toFixed(2)} €
                    </p>
                </div>
                <Button
                    color="primary"
                    size="sm"
                    startContent={<ShoppingCart size={16} />}
                    onPress={handleAddToCart}
                    isDisabled={product.stock === 0}
                >
                    Ajouter
                </Button>
            </CardFooter>
        </Card>
    );
}
