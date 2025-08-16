"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import { Card, CardBody, Button, Avatar } from "@heroui/react";
import {
    User,
    Package,
    MapPin,
    Heart,
    Settings,
    CreditCard,
    Bell,
    LogOut,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";

const AccountSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const menuItems = [
        {
            label: "My Account",
            href: "/account",
            icon: User,
        },
        {
            label: "Orders",
            href: "/account/orders",
            icon: Package,
        },
        {
            label: "Addresses",
            href: "/account/addresses",
            icon: MapPin,
        },
        {
            label: "Wishlist",
            href: "/account/wishlist",
            icon: Heart,
        },
        {
            label: "Payment Methods",
            href: "/account/payment",
            icon: CreditCard,
        },
        {
            label: "Notifications",
            href: "/account/notifications",
            icon: Bell,
        },
        {
            label: "Settings",
            href: "/account/settings",
            icon: Settings,
        },
    ];

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };

    return (
        <Card>
            <CardBody className="p-0">
                {/* User Info */}
                <div className="p-6 border-b">
                    <div className="flex items-center gap-3">
                        <Avatar
                            name={`${user?.firstName} ${user?.lastName}`}
                            size="lg"
                        />
                        <div>
                            <p className="font-semibold">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-sm text-gray-600">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="p-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                                    isActive
                                        ? "bg-primary-50 text-primary-600"
                                        : "hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} />
                                    <span className="text-sm font-medium">
                                        {item.label}
                                    </span>
                                </div>
                                <ChevronRight
                                    size={16}
                                    className="text-gray-400"
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t">
                    <Button
                        variant="light"
                        color="danger"
                        className="w-full justify-start"
                        startContent={<LogOut size={18} />}
                        onClick={handleLogout}
                    >
                        Sign Out
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default AccountSidebar;
