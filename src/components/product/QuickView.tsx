"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, openCart } from "../../store/slices/cartSlice";
import { addToWishlist } from "../../store/slices/wishlistSlice";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Select,
    SelectItem,
    Chip,
} from "@heroui/react";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { Product } from "../../types";

interface QuickViewProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }

        dispatch(
            addToCart({
                product,
                selectedSize,
                selectedColor: selectedColor || product.colors[0]?.name,
                quantity,
            })
        );

        dispatch(openCart());
        onClose();
    };

    const handleAddToWishlist = () => {
        dispatch(addToWishlist(product));
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex justify-between items-center">
                            Quick View
                        </ModalHeader>
                        <ModalBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6">
                                {/* Product Image */}
                                <div className="aspect-[3/4] bg-gray-100">
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                                </div>

                                {/* Product Details */}
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-2xl font-medium mb-2">
                                            {product.name}
                                        </h2>
                                        <p className="text-2xl font-semibold">
                                            ${product.price}
                                        </p>
                                    </div>

                                    <p className="text-gray-600">
                                        {product.description}
                                    </p>

                                    {/* Size Selection */}
                                    <Select
                                        label="Select Size"
                                        placeholder="Choose a size"
                                        selectedKeys={
                                            selectedSize ? [selectedSize] : []
                                        }
                                        onSelectionChange={(keys) =>
                                            setSelectedSize(
                                                Array.from(keys)[0] as string
                                            )
                                        }
                                        isRequired
                                    >
                                        {product.sizes
                                            .filter((size) => size.available)
                                            .map((size) => (
                                                <SelectItem
                                                    key={size.value}
                                                    value={size.value}
                                                >
                                                    {size.value}
                                                </SelectItem>
                                            ))}
                                    </Select>

                                    {/* Color Selection */}
                                    {product.colors.length > 1 && (
                                        <div>
                                            <p className="text-sm font-medium mb-2">
                                                Color
                                            </p>
                                            <div className="flex gap-2">
                                                {product.colors.map((color) => (
                                                    <button
                                                        key={color.name}
                                                        className={`w-8 h-8 rounded-full border-2 ${
                                                            selectedColor ===
                                                            color.name
                                                                ? "border-black"
                                                                : "border-gray-300"
                                                        }`}
                                                        style={{
                                                            backgroundColor:
                                                                color.hex,
                                                        }}
                                                        onClick={() =>
                                                            setSelectedColor(
                                                                color.name
                                                            )
                                                        }
                                                        disabled={
                                                            !color.available
                                                        }
                                                        title={color.name}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Quantity */}
                                    <div>
                                        <p className="text-sm font-medium mb-2">
                                            Quantity
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="flat"
                                                onClick={() =>
                                                    setQuantity(
                                                        Math.max(
                                                            1,
                                                            quantity - 1
                                                        )
                                                    )
                                                }
                                            >
                                                -
                                            </Button>
                                            <span className="px-4">
                                                {quantity}
                                            </span>
                                            <Button
                                                size="sm"
                                                variant="flat"
                                                onClick={() =>
                                                    setQuantity(quantity + 1)
                                                }
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <Button
                                            className="flex-1"
                                            color="primary"
                                            size="lg"
                                            startContent={
                                                <ShoppingBag size={20} />
                                            }
                                            onClick={handleAddToCart}
                                        >
                                            Add to Cart
                                        </Button>
                                        <Button
                                            isIconOnly
                                            size="lg"
                                            variant="bordered"
                                            onClick={handleAddToWishlist}
                                        >
                                            <Heart size={20} />
                                        </Button>
                                    </div>

                                    {/* Product Info */}
                                    <div className="pt-4 border-t space-y-2 text-sm">
                                        {product.material && (
                                            <p>
                                                <span className="font-medium">
                                                    Material:
                                                </span>{" "}
                                                {product.material}
                                            </p>
                                        )}
                                        {product.careInstructions && (
                                            <div>
                                                <p className="font-medium mb-1">
                                                    Care Instructions:
                                                </p>
                                                <ul className="list-disc list-inside text-gray-600">
                                                    {product.careInstructions.map(
                                                        (instruction, i) => (
                                                            <li key={i}>
                                                                {instruction}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default QuickView;
