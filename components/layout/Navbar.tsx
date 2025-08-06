// components/layout/Navbar.tsx
"use client";

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
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Input,
} from "@heroui/react";
import {
    ShoppingCart,
    Search,
    User,
    Menu,
    LogOut,
    Settings,
} from "lucide-react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleCartDrawer, toggleSearchModal } from "@/store/slices/uiSlice";
import { logout } from "@/store/slices/authSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavbarComponent() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { totalItems } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.auth);

    const menuItems = [
        { name: "Accueil", href: "/" },
        { name: "Produits", href: "/products" },
        { name: "Catégories", href: "/categories" },
        { name: "Promotions", href: "/promotions" },
        { name: "À propos", href: "/about" },
    ];

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-white dark:bg-gray-900"
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={
                        isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
                    }
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/" className="font-bold text-xl text-primary">
                        E-Commerce
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {menuItems.map((item) => (
                    <NavbarItem key={item.name}>
                        <Link
                            href={item.href}
                            className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
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
                        placeholder="Rechercher..."
                        size="sm"
                        startContent={<Search size={18} />}
                        type="search"
                        onFocus={() => dispatch(toggleSearchModal())}
                    />
                </NavbarItem>

                <NavbarItem className="lg:hidden">
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={() => dispatch(toggleSearchModal())}
                    >
                        <Search size={20} />
                    </Button>
                </NavbarItem>

                <NavbarItem>
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={() => dispatch(toggleCartDrawer())}
                        className="relative"
                    >
                        <Badge
                            content={totalItems}
                            color="danger"
                            size="sm"
                            isInvisible={totalItems === 0}
                        >
                            <ShoppingCart size={20} />
                        </Badge>
                    </Button>
                </NavbarItem>

                <NavbarItem>
                    {user ? (
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="primary"
                                    name={user.name}
                                    size="sm"
                                    src={`https://ui-avatars.com/api/?name=${user.name}&background=0D9488&color=fff`}
                                />
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Actions profil"
                                variant="flat"
                            >
                                <DropdownItem
                                    key="profile"
                                    className="h-14 gap-2"
                                >
                                    <p className="font-semibold">
                                        Connecté en tant que
                                    </p>
                                    <p className="font-semibold">
                                        {user.email}
                                    </p>
                                </DropdownItem>
                                <DropdownItem key="dashboard" href="/dashboard">
                                    Mon compte
                                </DropdownItem>
                                <DropdownItem key="orders" href="/orders">
                                    Mes commandes
                                </DropdownItem>
                                <DropdownItem key="settings" href="/settings">
                                    <Settings className="mr-2" size={16} />
                                    Paramètres
                                </DropdownItem>
                                <DropdownItem
                                    key="logout"
                                    color="danger"
                                    onPress={handleLogout}
                                >
                                    <LogOut className="mr-2" size={16} />
                                    Déconnexion
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Button
                            as={Link}
                            href="/auth/login"
                            color="primary"
                            variant="flat"
                            startContent={<User size={16} />}
                        >
                            Connexion
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.name}-${index}`}>
                        <Link
                            className="w-full text-gray-700 dark:text-gray-300"
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
