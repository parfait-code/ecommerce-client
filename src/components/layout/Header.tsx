"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { toggleCart } from "../../store/slices/cartSlice";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
    Badge,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import { Search, ShoppingBag, User, Heart, Menu } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartItemsCount = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const menuItems = [
        { name: "WOMEN", href: "/category/women" },
        { name: "MEN", href: "/category/men" },
    ];

    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            className="bg-white border-b"
            maxWidth="full"
            height="4rem"
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link
                        href="/"
                        className="font-bold text-2xl tracking-wider"
                    >
                        COS
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                {menuItems.map((item) => (
                    <NavbarItem key={item.name}>
                        <Link
                            href={item.href}
                            className="text-sm tracking-wider hover:underline"
                        >
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[10rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper:
                                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Search..."
                        size="sm"
                        startContent={<Search size={18} />}
                        type="search"
                    />
                </NavbarItem>

                <NavbarItem className="lg:hidden">
                    <Button isIconOnly variant="light" aria-label="Search">
                        <Search size={20} />
                    </Button>
                </NavbarItem>

                <NavbarItem>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                isIconOnly
                                variant="light"
                                aria-label="Account"
                            >
                                <User size={20} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User menu">
                            <DropdownItem key="profile">
                                My Account
                            </DropdownItem>
                            <DropdownItem key="orders">Orders</DropdownItem>
                            <DropdownItem key="settings">Settings</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>

                <NavbarItem>
                    <Button isIconOnly variant="light" aria-label="Wishlist">
                        <Heart size={20} />
                    </Button>
                </NavbarItem>

                <NavbarItem>
                    <Badge
                        content={cartItemsCount}
                        color="danger"
                        shape="circle"
                    >
                        <Button
                            isIconOnly
                            variant="light"
                            aria-label="Shopping bag"
                            onClick={() => dispatch(toggleCart())}
                        >
                            <ShoppingBag size={20} />
                        </Button>
                    </Badge>
                </NavbarItem>

                <NavbarItem className="hidden sm:flex">
                    <Link href="#" className="text-xs">
                        MA | EN
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        <Link className="w-full text-lg" href={item.href}>
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default Header;
