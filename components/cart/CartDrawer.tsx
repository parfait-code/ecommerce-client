// components/cart/CartDrawer.tsx
"use client";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Card,
    CardBody,
    Image,
    Divider,
} from "@heroui/react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleCartDrawer } from "@/store/slices/uiSlice";
import {
    removeFromCart,
    updateQuantity,
    clearCart,
} from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isOpen = useAppSelector((state) => state.ui.cartDrawerOpen);
    const { items, totalAmount, totalItems } = useAppSelector(
        (state) => state.cart
    );

    const handleCheckout = () => {
        dispatch(toggleCartDrawer());
        router.push("/checkout");
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity === 0) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={() => dispatch(toggleCartDrawer())}
            size="md"
            placement="center"
            scrollBehavior="inside"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ShoppingBag size={24} />
                                    <span>
                                        Mon panier ({totalItems} articles)
                                    </span>
                                </div>
                                {items.length > 0 && (
                                    <Button
                                        size="sm"
                                        color="danger"
                                        variant="light"
                                        onPress={() => dispatch(clearCart())}
                                    >
                                        Vider
                                    </Button>
                                )}
                            </div>
                        </ModalHeader>
                        <Divider />
                        <ModalBody className="px-4 py-6">
                            {items.length === 0 ? (
                                <div className="text-center py-10">
                                    <ShoppingBag
                                        size={64}
                                        className="mx-auto mb-4 text-gray-300"
                                    />
                                    <p className="text-gray-500 mb-4">
                                        Votre panier est vide
                                    </p>
                                    <Button
                                        color="primary"
                                        onPress={() => {
                                            onClose();
                                            router.push("/products");
                                        }}
                                    >
                                        Découvrir nos produits
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <Card
                                            key={item.id}
                                            className="shadow-sm"
                                        >
                                            <CardBody className="p-3">
                                                <div className="flex gap-3">
                                                    <Image
                                                        alt={item.name}
                                                        className="object-cover"
                                                        height={80}
                                                        src={item.image}
                                                        width={80}
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-sm mb-1">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-primary font-bold">
                                                            {item.price.toFixed(
                                                                2
                                                            )}{" "}
                                                            €
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="flat"
                                                                onPress={() =>
                                                                    handleQuantityChange(
                                                                        item.id,
                                                                        item.quantity -
                                                                            1
                                                                    )
                                                                }
                                                            >
                                                                <Minus
                                                                    size={16}
                                                                />
                                                            </Button>
                                                            <span className="font-medium px-2">
                                                                {item.quantity}
                                                            </span>
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                variant="flat"
                                                                onPress={() =>
                                                                    handleQuantityChange(
                                                                        item.id,
                                                                        item.quantity +
                                                                            1
                                                                    )
                                                                }
                                                            >
                                                                <Plus
                                                                    size={16}
                                                                />
                                                            </Button>
                                                            <Button
                                                                isIconOnly
                                                                size="sm"
                                                                color="danger"
                                                                variant="light"
                                                                className="ml-auto"
                                                                onPress={() =>
                                                                    dispatch(
                                                                        removeFromCart(
                                                                            item.id
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                <Trash2
                                                                    size={16}
                                                                />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </ModalBody>
                        {items.length > 0 && (
                            <>
                                <Divider />
                                <ModalFooter className="flex-col gap-2">
                                    <div className="w-full flex justify-between items-center mb-2">
                                        <span className="text-lg font-semibold">
                                            Total
                                        </span>
                                        <span className="text-2xl font-bold text-primary">
                                            {totalAmount.toFixed(2)} €
                                        </span>
                                    </div>
                                    <div className="w-full space-y-2">
                                        <Button
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            onPress={handleCheckout}
                                        >
                                            Passer commande
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="bordered"
                                            onPress={onClose}
                                        >
                                            Continuer les achats
                                        </Button>
                                    </div>
                                </ModalFooter>
                            </>
                        )}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
