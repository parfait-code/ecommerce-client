"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../src/store/store";
import {
    removeFromCart,
    updateQuantity,
    applyPromoCode,
    removePromoCode,
    clearCart,
} from "../../src/store/slices/cartSlice";
import { addToWishlist } from "../../src/store/slices/wishlistSlice";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Input,
    Divider,
    Breadcrumbs,
    BreadcrumbItem,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Accordion,
    AccordionItem,
    RadioGroup,
    Radio,
} from "@heroui/react";
import {
    ShoppingBag,
    Trash2,
    Heart,
    Minus,
    Plus,
    Tag,
    Truck,
    Shield,
    CreditCard,
    X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { products as allProducts } from "../../src/data/mockData";

export default function CartPage() {
    const dispatch = useDispatch();
    const { items, subtotal, shipping, tax, discount, total, promoCode } =
        useSelector((state: RootState) => state.cart);
    const [promoInput, setPromoInput] = useState("");
    const [promoError, setPromoError] = useState("");
    const [selectedShipping, setSelectedShipping] = useState("standard");

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

    const handleApplyPromo = () => {
        const validCodes = ["SAVE20", "SAVE10", "WELCOME"];

        if (validCodes.includes(promoInput.toUpperCase())) {
            dispatch(applyPromoCode(promoInput.toUpperCase()));
            setPromoError("");
            setPromoInput("");
        } else {
            setPromoError("Invalid promo code");
        }
    };

    const handleMoveToWishlist = (item: any) => {
        dispatch(addToWishlist(item.product));
        dispatch(
            removeFromCart({
                productId: item.product.id,
                selectedSize: item.selectedSize,
                selectedColor: item.selectedColor,
            })
        );
    };

    const suggestedProducts = allProducts.slice(0, 4);

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs className="mb-8">
                <BreadcrumbItem>
                    <Link href="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>Shopping Cart</BreadcrumbItem>
            </Breadcrumbs>

            <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

            {items.length === 0 ? (
                <Card>
                    <CardBody className="text-center py-16">
                        <ShoppingBag
                            className="mx-auto mb-4 text-gray-300"
                            size={64}
                        />
                        <h2 className="text-2xl font-medium mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Looks like you haven't added anything to your cart
                            yet
                        </p>
                        <Link href="/">
                            <Button color="primary" size="lg">
                                Start Shopping
                            </Button>
                        </Link>
                    </CardBody>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Items Table */}
                        <Card>
                            <CardHeader className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    Cart Items ({items.length})
                                </h2>
                                <Button
                                    variant="light"
                                    color="danger"
                                    size="sm"
                                    onClick={() => {
                                        if (
                                            confirm(
                                                "Clear all items from cart?"
                                            )
                                        ) {
                                            dispatch(clearCart());
                                        }
                                    }}
                                >
                                    Clear Cart
                                </Button>
                            </CardHeader>
                            <CardBody className="p-0">
                                <Table aria-label="Cart items">
                                    <TableHeader>
                                        <TableColumn>PRODUCT</TableColumn>
                                        <TableColumn>QUANTITY</TableColumn>
                                        <TableColumn>PRICE</TableColumn>
                                        <TableColumn>ACTIONS</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {items.map((item) => (
                                            <TableRow
                                                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                            >
                                                <TableCell>
                                                    <div className="flex gap-3">
                                                        <div className="w-16 h-20 bg-gray-100 ">
                                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 " />
                                                        </div>
                                                        <div>
                                                            <Link
                                                                href={`/products/${item.product.id}`}
                                                                className="font-medium hover:underline"
                                                            >
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </Link>
                                                            <p className="text-sm text-gray-600">
                                                                Size:{" "}
                                                                {
                                                                    item.selectedSize
                                                                }{" "}
                                                                | Color:{" "}
                                                                {
                                                                    item.selectedColor
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="flat"
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item.product
                                                                        .id,
                                                                    item.selectedSize,
                                                                    item.selectedColor,
                                                                    item.quantity -
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            <Minus size={14} />
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            value={item.quantity.toString()}
                                                            onChange={(e) =>
                                                                handleQuantityChange(
                                                                    item.product
                                                                        .id,
                                                                    item.selectedSize,
                                                                    item.selectedColor,
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ) || 0
                                                                )
                                                            }
                                                            className="w-16"
                                                            size="sm"
                                                            min="0"
                                                        />
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="flat"
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    item.product
                                                                        .id,
                                                                    item.selectedSize,
                                                                    item.selectedColor,
                                                                    item.quantity +
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            <Plus size={14} />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-semibold">
                                                            $
                                                            {(
                                                                item.product
                                                                    .price *
                                                                item.quantity
                                                            ).toFixed(2)}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            $
                                                            {item.product.price}{" "}
                                                            each
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            onClick={() =>
                                                                handleMoveToWishlist(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <Heart size={16} />
                                                        </Button>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            color="danger"
                                                            onClick={() =>
                                                                dispatch(
                                                                    removeFromCart(
                                                                        {
                                                                            productId:
                                                                                item
                                                                                    .product
                                                                                    .id,
                                                                            selectedSize:
                                                                                item.selectedSize,
                                                                            selectedColor:
                                                                                item.selectedColor,
                                                                        }
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardBody>
                        </Card>

                        {/* Shipping Options */}
                        <Card>
                            <CardHeader>
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Truck size={20} />
                                    Shipping Options
                                </h3>
                            </CardHeader>
                            <CardBody>
                                <RadioGroup
                                    value={selectedShipping}
                                    onValueChange={setSelectedShipping}
                                >
                                    <Radio value="standard">
                                        <div className="flex justify-between w-full">
                                            <div>
                                                <p className="font-medium">
                                                    Standard Shipping
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    5-7 business days
                                                </p>
                                            </div>
                                            <p className="font-medium">
                                                {subtotal >= 100
                                                    ? "FREE"
                                                    : "$10.00"}
                                            </p>
                                        </div>
                                    </Radio>
                                    <Radio value="express">
                                        <div className="flex justify-between w-full">
                                            <div>
                                                <p className="font-medium">
                                                    Express Shipping
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    2-3 business days
                                                </p>
                                            </div>
                                            <p className="font-medium">
                                                $25.00
                                            </p>
                                        </div>
                                    </Radio>
                                    <Radio value="overnight">
                                        <div className="flex justify-between w-full">
                                            <div>
                                                <p className="font-medium">
                                                    Overnight Shipping
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Next business day
                                                </p>
                                            </div>
                                            <p className="font-medium">
                                                $45.00
                                            </p>
                                        </div>
                                    </Radio>
                                </RadioGroup>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <h2 className="text-xl font-semibold">
                                    Order Summary
                                </h2>
                            </CardHeader>
                            <CardBody className="space-y-4">
                                {/* Promo Code */}
                                <div>
                                    <p className="text-sm font-medium mb-2">
                                        Promo Code
                                    </p>
                                    {promoCode ? (
                                        <div className="flex items-center justify-between p-2 bg-green-50 ">
                                            <div className="flex items-center gap-2">
                                                <Tag
                                                    size={16}
                                                    className="text-green-600"
                                                />
                                                <span className="text-sm font-medium">
                                                    {promoCode}
                                                </span>
                                            </div>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                onClick={() =>
                                                    dispatch(removePromoCode())
                                                }
                                            >
                                                <X size={16} />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Enter code"
                                                value={promoInput}
                                                onChange={(e) => {
                                                    setPromoInput(
                                                        e.target.value
                                                    );
                                                    setPromoError("");
                                                }}
                                                size="sm"
                                                isInvalid={!!promoError}
                                                errorMessage={promoError}
                                            />
                                            <Button
                                                onClick={handleApplyPromo}
                                                size="sm"
                                                color="primary"
                                            >
                                                Apply
                                            </Button>
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-600 mt-1">
                                        Try: SAVE20, SAVE10
                                    </p>
                                </div>

                                <Divider />

                                {/* Price Breakdown */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Discount</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
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
                                    <div className="flex justify-between text-sm">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <Divider />
                                    <div className="flex justify-between font-semibold text-lg">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full"
                                    color="primary"
                                    size="lg"
                                    as={Link}
                                    href="/checkout"
                                >
                                    Proceed to Checkout
                                </Button>

                                {/* Trust Badges */}
                                <div className="space-y-2 pt-4 border-t">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Shield
                                            size={16}
                                            className="text-green-600"
                                        />
                                        <span>Secure Checkout</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CreditCard
                                            size={16}
                                            className="text-blue-600"
                                        />
                                        <span>Multiple Payment Options</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Truck
                                            size={16}
                                            className="text-purple-600"
                                        />
                                        <span>Free Returns</span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}

            {/* Suggested Products */}
            {items.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6">
                        You Might Also Like
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {suggestedProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="hover:shadow-lg transition-shadow"
                            >
                                <CardBody className="p-0">
                                    <Link href={`/products/${product.id}`}>
                                        <div className="aspect-[3/4] bg-gray-100">
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                                        </div>
                                    </Link>
                                </CardBody>
                                <CardBody className="pt-3">
                                    <h3 className="text-sm font-medium line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-lg font-semibold mt-1">
                                        ${product.price}
                                    </p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
