"use client";

import { useAppSelector } from "../../hooks/redux";
import { Badge } from "@heroui/react";

interface CartIndicatorProps {
    children: React.ReactNode;
}

const CartIndicator: React.FC<CartIndicatorProps> = ({ children }) => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Badge
            content={itemCount}
            color="danger"
            shape="circle"
            isInvisible={itemCount === 0}
        >
            {children}
        </Badge>
    );
};

export default CartIndicator;
