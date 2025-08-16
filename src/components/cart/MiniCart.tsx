"use client";

import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { openCart } from "../../store/slices/cartSlice";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
    Divider,
} from "@heroui/react";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import CartIndicator from "./CartIndicator";

const MiniCart = () => {
    const dispatch = useAppDispatch();
    const { items, total } = useAppSelector((state) => state.cart);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Popover placement="bottom-end">
            <PopoverTrigger>
                <Button isIconOnly variant="light" aria-label="Shopping bag">
                    <CartIndicator>
                        <ShoppingBag size={20} />
                    </CartIndicator>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">Shopping Cart</h3>
                        <span className="text-sm text-gray-600">
                            {itemCount} {itemCount === 1 ? "item" : "items"}
                        </span>
                    </div>

                    {items.length === 0 ? (
                        <p className="text-gray-600 text-sm py-4 text-center">
                            Your cart is empty
                        </p>
                    ) : (
                        <>
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {items.slice(0, 3).map((item) => (
                                    <div
                                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                        className="flex gap-3"
                                    >
                                        <div className="w-12 h-16 bg-gray-100 rounded flex-shrink-0">
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium line-clamp-1">
                                                {item.product.name}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                Size: {item.selectedSize} | Qty:{" "}
                                                {item.quantity}
                                            </p>
                                            <p className="text-sm font-semibold">
                                                $
                                                {(
                                                    item.product.price *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {items.length > 3 && (
                                    <p className="text-xs text-gray-600 text-center">
                                        +{items.length - 3} more items
                                    </p>
                                )}
                            </div>

                            <Divider className="my-3" />

                            <div className="flex justify-between font-semibold mb-3">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <div className="space-y-2">
                                <Button
                                    className="w-full"
                                    color="primary"
                                    size="sm"
                                    as={Link}
                                    href="/checkout"
                                >
                                    Checkout
                                </Button>
                                <Button
                                    className="w-full"
                                    variant="bordered"
                                    size="sm"
                                    onClick={() => dispatch(openCart())}
                                >
                                    View Cart
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default MiniCart;
