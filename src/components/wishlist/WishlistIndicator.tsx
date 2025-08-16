"use client";

import { useAppSelector } from "../../hooks/redux";
import { Badge } from "@heroui/react";

interface WishlistIndicatorProps {
    children: React.ReactNode;
}

const WishlistIndicator: React.FC<WishlistIndicatorProps> = ({ children }) => {
    const wishlistItems = useAppSelector((state) => state.wishlist.items);
    const itemCount = wishlistItems.length;

    return (
        <Badge
            content={itemCount}
            color="danger"
            shape="circle"
            variant="flat"
            isInvisible={itemCount === 0}
        >
            {children}
        </Badge>
    );
};

export default WishlistIndicator;
