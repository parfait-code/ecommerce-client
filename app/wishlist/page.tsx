// src/app/wishlist/page.tsx

"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../src/store/store";
import {
    removeFromWishlist,
    clearWishlist,
} from "../../src/store/slices/wishlistSlice";
import { addToCart, openCart } from "../../src/store/slices/cartSlice";
import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Chip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Select,
    SelectItem,
    Breadcrumbs,
    BreadcrumbItem,
    Tooltip,
} from "@heroui/react";
import { Heart, ShoppingBag, Trash2, Share2, X, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(
        (state: RootState) => state.wishlist.items
    );
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [notification, setNotification] = useState<string | null>(null);

    const handleAddToCart = (product: Product) => {
        setSelectedProduct(product);
        setSelectedSize("");
        setSelectedColor(product.colors[0]?.name || "");
        onOpen();
    };

    const confirmAddToCart = () => {
        if (!selectedProduct || !selectedSize) return;

        dispatch(
            addToCart({
                product: selectedProduct,
                selectedSize,
                selectedColor,
                quantity: 1,
            })
        );

        dispatch(removeFromWishlist(selectedProduct.id));
        dispatch(openCart());

        showNotification(`${selectedProduct.name} added to cart`);
        onClose();
    };

    const handleRemoveFromWishlist = (
        productId: string,
        productName: string
    ) => {
        dispatch(removeFromWishlist(productId));
        showNotification(`${productName} removed from wishlist`);
    };

    const handleMoveAllToCart = () => {
        if (wishlistItems.length === 0) return;

        // For demo, we'll add all items with default size/color
        // In real app, you'd prompt user to select sizes
        wishlistItems.forEach((product) => {
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
            }
        });

        dispatch(clearWishlist());
        dispatch(openCart());
        showNotification("All items moved to cart");
    };

    const handleClearWishlist = () => {
        if (confirm("Are you sure you want to clear your wishlist?")) {
            dispatch(clearWishlist());
            showNotification("Wishlist cleared");
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "My COS Wishlist",
                text: `Check out my wishlist with ${wishlistItems.length} items`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            showNotification("Wishlist link copied to clipboard");
        }
    };

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs className="mb-8">
                <BreadcrumbItem>
                    <Link href="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>Wishlist</BreadcrumbItem>
            </Breadcrumbs>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-semibold">
                                My Wishlist
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {wishlistItems.length}{" "}
                                {wishlistItems.length === 1 ? "item" : "items"}
                            </p>
                        </div>

                        {wishlistItems.length > 0 && (
                            <div className="flex gap-2">
                                <Button
                                    variant="light"
                                    startContent={<Share2 size={18} />}
                                    onClick={handleShare}
                                >
                                    Share
                                </Button>
                                <Button
                                    variant="light"
                                    color="danger"
                                    startContent={<Trash2 size={18} />}
                                    onClick={handleClearWishlist}
                                >
                                    Clear All
                                </Button>
                            </div>
                        )}
                    </div>

                    {wishlistItems.length === 0 ? (
                        <Card>
                            <CardBody className="text-center py-16">
                                <Heart
                                    className="mx-auto mb-4 text-gray-300"
                                    size={64}
                                />
                                <h2 className="text-2xl font-medium mb-2">
                                    Your wishlist is empty
                                </h2>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                    Save your favorite items here to purchase
                                    them later or share with friends
                                </p>
                                <Link href="/">
                                    <Button color="primary" size="lg">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    ) : (
                        <AnimatePresence>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {wishlistItems.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="group hover:shadow-lg transition-shadow">
                                            <CardBody className="p-0 relative overflow-hidden">
                                                <Link
                                                    href={`/products/${product.id}`}
                                                >
                                                    <div className="aspect-[3/4] bg-gray-100 relative">
                                                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />

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
                                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                                <Chip
                                                                    color="default"
                                                                    variant="solid"
                                                                >
                                                                    Out of Stock
                                                                </Chip>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>

                                                {/* Quick Actions */}
                                                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Tooltip content="Remove from wishlist">
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            color="danger"
                                                            variant="solid"
                                                            className="bg-white/90 backdrop-blur-sm"
                                                            onClick={() =>
                                                                handleRemoveFromWishlist(
                                                                    product.id,
                                                                    product.name
                                                                )
                                                            }
                                                        >
                                                            <X size={16} />
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            </CardBody>

                                            <CardFooter className="flex flex-col items-start gap-3">
                                                <div className="w-full">
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                    >
                                                        <h3 className="text-sm font-medium line-clamp-2 hover:underline">
                                                            {product.name}
                                                        </h3>
                                                    </Link>
                                                    <p className="text-lg font-semibold mt-1">
                                                        ${product.price}
                                                    </p>

                                                    {/* Color Options */}
                                                    {product.colors.length >
                                                        0 && (
                                                        <div className="flex gap-1 mt-2">
                                                            {product.colors
                                                                .slice(0, 5)
                                                                .map(
                                                                    (color) => (
                                                                        <div
                                                                            key={
                                                                                color.name
                                                                            }
                                                                            className="w-5 h-5 rounded-full border border-gray-300"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    color.hex,
                                                                            }}
                                                                            title={
                                                                                color.name
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                            {product.colors
                                                                .length > 5 && (
                                                                <span className="text-xs text-gray-500 ml-1">
                                                                    +
                                                                    {product
                                                                        .colors
                                                                        .length -
                                                                        5}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <Button
                                                    className="w-full"
                                                    color={
                                                        product.inStock
                                                            ? "primary"
                                                            : "default"
                                                    }
                                                    variant={
                                                        product.inStock
                                                            ? "solid"
                                                            : "flat"
                                                    }
                                                    startContent={
                                                        <ShoppingBag
                                                            size={16}
                                                        />
                                                    }
                                                    onClick={() =>
                                                        handleAddToCart(product)
                                                    }
                                                    isDisabled={
                                                        !product.inStock
                                                    }
                                                >
                                                    {product.inStock
                                                        ? "Add to Cart"
                                                        : "Out of Stock"}
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatePresence>
                    )}
                </div>

                {/* Sidebar Summary */}
                {wishlistItems.length > 0 && (
                    <div className="lg:w-80">
                        <Card className="sticky top-4">
                            <CardBody className="space-y-4">
                                <h2 className="text-lg font-semibold">
                                    Wishlist Summary
                                </h2>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Total Items</span>
                                        <span className="font-medium">
                                            {wishlistItems.length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Total Value</span>
                                        <span className="font-medium">
                                            ${totalValue.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Available Items</span>
                                        <span className="font-medium">
                                            {
                                                wishlistItems.filter(
                                                    (item) => item.inStock
                                                ).length
                                            }
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full"
                                    color="primary"
                                    size="lg"
                                    onClick={handleMoveAllToCart}
                                    isDisabled={
                                        wishlistItems.filter(
                                            (item) => item.inStock
                                        ).length === 0
                                    }
                                >
                                    Add All to Cart
                                </Button>

                                <div className="pt-4 border-t">
                                    <p className="text-xs text-gray-600 mb-3">
                                        Share your wishlist with friends and
                                        family
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            className="flex-1"
                                        >
                                            Email
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            className="flex-1"
                                        >
                                            WhatsApp
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            className="flex-1"
                                        >
                                            Copy Link
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}
            </div>

            {/* Size Selection Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Select Options</ModalHeader>
                            <ModalBody>
                                {selectedProduct && (
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-medium mb-2">
                                                {selectedProduct.name}
                                            </p>
                                            <p className="text-lg font-semibold">
                                                ${selectedProduct.price}
                                            </p>
                                        </div>

                                        <Select
                                            label="Select Size"
                                            placeholder="Choose a size"
                                            selectedKeys={
                                                selectedSize
                                                    ? [selectedSize]
                                                    : []
                                            }
                                            onSelectionChange={(keys) =>
                                                setSelectedSize(
                                                    Array.from(
                                                        keys
                                                    )[0] as string
                                                )
                                            }
                                            isRequired
                                        >
                                            {selectedProduct.sizes
                                                .filter(
                                                    (size) => size.available
                                                )
                                                .map((size) => (
                                                    <SelectItem
                                                        key={size.value}
                                                        value={size.value}
                                                    >
                                                        {size.value}
                                                    </SelectItem>
                                                ))}
                                        </Select>

                                        {selectedProduct.colors.length > 1 && (
                                            <Select
                                                label="Select Color"
                                                placeholder="Choose a color"
                                                selectedKeys={[selectedColor]}
                                                onSelectionChange={(keys) =>
                                                    setSelectedColor(
                                                        Array.from(
                                                            keys
                                                        )[0] as string
                                                    )
                                                }
                                                isRequired
                                            >
                                                {selectedProduct.colors
                                                    .filter(
                                                        (color) =>
                                                            color.available
                                                    )
                                                    .map((color) => (
                                                        <SelectItem
                                                            key={color.name}
                                                            value={color.name}
                                                        >
                                                            {color.name}
                                                        </SelectItem>
                                                    ))}
                                            </Select>
                                        )}
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={confirmAddToCart}
                                    isDisabled={!selectedSize}
                                >
                                    Add to Cart
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-4 right-4 z-50"
                    >
                        <Card className="bg-green-500 text-white">
                            <CardBody className="flex flex-row items-center gap-2 py-3 px-4">
                                <Check size={20} />
                                <span>{notification}</span>
                            </CardBody>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
