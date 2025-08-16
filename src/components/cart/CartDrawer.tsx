"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
    closeCart,
    removeFromCart,
    updateQuantity,
} from "../../store/slices/cartSlice";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Divider,
    Input,
    Chip,
} from "@heroui/react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
    const dispatch = useDispatch();
    const { items, isOpen, subtotal, shipping, total } = useSelector(
        (state: RootState) => state.cart
    );

    const handleQuantityChange = (
        productId: string,
        size: string,
        color: string,
        newQuantity: number
    ) => {
        if (newQuantity === 0) {
            if (confirm("Remove this item from cart?")) {
                dispatch(
                    removeFromCart({
                        productId,
                        selectedSize: size,
                        selectedColor: color,
                    })
                );
            }
        } else {
            dispatch(
                updateQuantity({
                    productId,
                    selectedSize: size,
                    selectedColor: color,
                    quantity: newQuantity,
                })
            );
        }
    };

    return (
        <Drawer
            isOpen={isOpen}
            onClose={() => dispatch(closeCart())}
            placement="right"
            size="md"
        >
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <ShoppingBag size={20} />
                                <span className="font-semibold">
                                    Shopping Cart
                                </span>
                                <Chip size="sm" variant="flat">
                                    {items.length}{" "}
                                    {items.length === 1 ? "item" : "items"}
                                </Chip>
                            </div>
                            <Button
                                isIconOnly
                                variant="light"
                                onPress={onClose}
                            >
                                <X size={20} />
                            </Button>
                        </DrawerHeader>

                        <Divider />

                        <DrawerBody className="py-4">
                            {items.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingBag
                                        className="mx-auto mb-4 text-gray-300"
                                        size={48}
                                    />
                                    <p className="text-gray-600 mb-4">
                                        Your cart is empty
                                    </p>
                                    <Button
                                        color="primary"
                                        onPress={onClose}
                                        as={Link}
                                        href="/"
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    <div className="space-y-4">
                                        {items.map((item, index) => (
                                            <motion.div
                                                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{
                                                    delay: index * 0.05,
                                                }}
                                                className="flex gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow"
                                            >
                                                {/* Product Image */}
                                                <div className="w-20 h-24 bg-gray-100 rounded flex-shrink-0">
                                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded" />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1">
                                                    <Link
                                                        href={`/products/${item.product.id}`}
                                                        onClick={onClose}
                                                        className="hover:underline"
                                                    >
                                                        <h3 className="text-sm font-medium line-clamp-2">
                                                            {item.product.name}
                                                        </h3>
                                                    </Link>

                                                    <div className="text-xs text-gray-600 mt-1 space-y-1">
                                                        <p>
                                                            Size:{" "}
                                                            {item.selectedSize}
                                                        </p>
                                                        <p>
                                                            Color:{" "}
                                                            {item.selectedColor}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center gap-1">
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="flat"
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        item
                                                                            .product
                                                                            .id,
                                                                        item.selectedSize,
                                                                        item.selectedColor,
                                                                        item.quantity -
                                                                            1
                                                                    )
                                                                }
                                                            ></Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </AnimatePresence>
                            )}
                        </DrawerBody>

                        {items.length > 0 && (
                            <>
                                <Divider />

                                <DrawerFooter className="flex flex-col gap-4">
                                    {/* Cart Summary */}
                                    <div className="w-full space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Shipping</span>
                                            <span>
                                                {shipping === 0 ? (
                                                    <span className="text-green-600">
                                                        FREE
                                                    </span>
                                                ) : (
                                                    `${shipping.toFixed(2)}`
                                                )}
                                            </span>
                                        </div>
                                        {shipping > 0 && (
                                            <p className="text-xs text-gray-600">
                                                Free shipping on orders over
                                                $100
                                            </p>
                                        )}
                                        <Divider />
                                        <div className="flex justify-between font-semibold text-lg">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="w-full space-y-2">
                                        <Button
                                            className="w-full"
                                            color="primary"
                                            size="lg"
                                            as={Link}
                                            href="/checkout"
                                            onPress={onClose}
                                        >
                                            Checkout
                                        </Button>
                                        <Button
                                            className="w-full"
                                            variant="bordered"
                                            as={Link}
                                            href="/cart"
                                            onPress={onClose}
                                        >
                                            View Cart
                                        </Button>
                                    </div>
                                </DrawerFooter>
                            </>
                        )}
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
};

export default CartDrawer;

// -----------------------------------
// src/app/cart/page.tsx
