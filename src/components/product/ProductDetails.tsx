"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Product } from "../../types";
import { addToCart } from "../../store/slices/cartSlice";
import { Button, Accordion, AccordionItem, Divider } from "@heroui/react";
import { Heart, ShoppingBag, Truck, Shield } from "lucide-react";
import SizeSelector from "./SizeSelector";

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState(
        product.colors[0]?.name || ""
    );
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }

        dispatch(
            addToCart({
                product,
                selectedSize,
                selectedColor,
                quantity,
            })
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
                <div className="aspect-[3/4] bg-gray-100">
                    {/* Main image placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                </div>

                {/* Thumbnail images */}
                <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((_, index) => (
                        <button
                            key={index}
                            className={`aspect-square bg-gray-100 border-2 ${
                                currentImageIndex === index
                                    ? "border-black"
                                    : "border-transparent"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                        >
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Product info */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-medium tracking-wide mb-2">
                        {product.name}
                    </h1>
                    <p className="text-xl font-semibold">${product.price}</p>
                </div>

                <p className="text-sm text-gray-600">{product.description}</p>

                {/* Color selector */}
                {product.colors.length > 1 && (
                    <div>
                        <p className="text-sm font-medium mb-3">
                            COLOR: {selectedColor}
                        </p>
                        <div className="flex gap-2">
                            {product.colors.map((color) => (
                                <button
                                    key={color.name}
                                    className={`w-8 h-8 rounded-full border-2 ${
                                        selectedColor === color.name
                                            ? "border-black"
                                            : "border-gray-300"
                                    }`}
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => setSelectedColor(color.name)}
                                    disabled={!color.available}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <SizeSelector
                    sizes={product.sizes}
                    selectedSize={selectedSize}
                    onSizeSelect={setSelectedSize}
                />

                <div className="flex gap-4">
                    <Button
                        className="flex-1"
                        size="lg"
                        radius="none"
                        startContent={<ShoppingBag size={20} />}
                        onClick={handleAddToCart}
                    >
                        ADD TO BAG
                    </Button>
                    <Button
                        isIconOnly
                        size="lg"
                        variant="bordered"
                        radius="none"
                    >
                        <Heart size={20} />
                    </Button>
                </div>

                <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <Truck size={16} />
                        <span>Free delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield size={16} />
                        <span>Free returns</span>
                    </div>
                </div>

                <Divider />

                <div className="space-y-4">
                    <div className="border-b pb-2">
                        <h3 className="font-medium">DETAILS & DESCRIPTION</h3>
                        <div className="mt-2 space-y-2 text-sm">
                            <p>Material: {product.material}</p>
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <div className="border-b pb-2">
                        <h3 className="font-medium">DELIVERY & RETURNS</h3>
                        <div className="mt-2 space-y-2 text-sm">
                            <p>Standard delivery: 3-5 business days</p>
                            <p>Express delivery: 1-2 business days</p>
                            <p>Free returns within 30 days</p>
                        </div>
                    </div>

                    {product.careInstructions && (
                        <div className="border-b pb-2">
                            <h3 className="font-medium">PRODUCT CARE</h3>
                            <ul className="mt-2 space-y-1 text-sm">
                                {product.careInstructions.map(
                                    (instruction, index) => (
                                        <li key={index}>• {instruction}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
