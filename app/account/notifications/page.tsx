"use client";

import { useState } from "react";
import { Card, CardBody, Chip, Button, Tabs, Tab } from "@heroui/react";
import { Bell, Package, Tag, MessageSquare, Check, X } from "lucide-react";

interface Notification {
    id: string;
    type: "order" | "promotion" | "system";
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    actionUrl?: string;
}

export default function NotificationsPage() {
    const [notifications] = useState<Notification[]>([
        {
            id: "1",
            type: "order",
            title: "Order Delivered",
            message:
                "Your order #COS-2025-001234 has been delivered successfully.",
            timestamp: "2 hours ago",
            read: false,
            actionUrl: "/account/orders",
        },
        {
            id: "2",
            type: "promotion",
            title: "Spring Sale Started!",
            message: "Get 30% off on selected items. Limited time offer.",
            timestamp: "1 day ago",
            read: false,
            actionUrl: "/sale",
        },
        {
            id: "3",
            type: "order",
            title: "Order Shipped",
            message:
                "Your order #COS-2025-001235 is on its way. Track your package.",
            timestamp: "3 days ago",
            read: true,
            actionUrl: "/account/orders",
        },
        {
            id: "4",
            type: "system",
            title: "Account Security",
            message:
                "We noticed a new login from Chrome on Windows. Was this you?",
            timestamp: "5 days ago",
            read: true,
        },
        {
            id: "5",
            type: "promotion",
            title: "Items in Your Wishlist on Sale",
            message:
                "2 items from your wishlist are now on sale. Don't miss out!",
            timestamp: "1 week ago",
            read: true,
            actionUrl: "/account/wishlist",
        },
    ]);

    const [selectedTab, setSelectedTab] = useState("all");

    const getIcon = (type: string) => {
        switch (type) {
            case "order":
                return <Package size={18} />;
            case "promotion":
                return <Tag size={18} />;
            case "system":
                return <Bell size={18} />;
            default:
                return <MessageSquare size={18} />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "order":
                return "primary";
            case "promotion":
                return "success";
            case "system":
                return "warning";
            default:
                return "default";
        }
    };

    const filteredNotifications =
        selectedTab === "all"
            ? notifications
            : selectedTab === "unread"
              ? notifications.filter((n) => !n.read)
              : notifications.filter((n) => n.type === selectedTab);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Notifications</h1>
                <Button variant="light" size="sm">
                    Mark all as read
                </Button>
            </div>

            <Tabs
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(key as string)}
            >
                <Tab key="all" title="All" />
                <Tab key="unread" title="Unread" />
                <Tab key="order" title="Orders" />
                <Tab key="promotion" title="Promotions" />
                <Tab key="system" title="System" />
            </Tabs>

            {filteredNotifications.length === 0 ? (
                <Card>
                    <CardBody className="text-center py-12">
                        <Bell
                            className="mx-auto mb-4 text-gray-400"
                            size={48}
                        />
                        <h3 className="text-lg font-medium mb-2">
                            No notifications
                        </h3>
                        <p className="text-gray-600">You're all caught up!</p>
                    </CardBody>
                </Card>
            ) : (
                <div className="space-y-3">
                    {filteredNotifications.map((notification) => (
                        <Card
                            key={notification.id}
                            className={notification.read ? "opacity-70" : ""}
                        >
                            <CardBody>
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`p-2 rounded-lg ${
                                            notification.read
                                                ? "bg-gray-100"
                                                : "bg-primary-50"
                                        }`}
                                    >
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-1">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold">
                                                        {notification.title}
                                                    </h3>
                                                    <Chip
                                                        size="sm"
                                                        color={
                                                            getTypeColor(
                                                                notification.type
                                                            ) as any
                                                        }
                                                        variant="flat"
                                                    >
                                                        {notification.type}
                                                    </Chip>
                                                    {!notification.read && (
                                                        <Chip
                                                            size="sm"
                                                            color="primary"
                                                            variant="dot"
                                                        >
                                                            New
                                                        </Chip>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    {notification.timestamp}
                                                </p>
                                            </div>
                                            <div className="flex gap-1">
                                                {notification.actionUrl && (
                                                    <Button
                                                        size="sm"
                                                        variant="light"
                                                        href={
                                                            notification.actionUrl
                                                        }
                                                    >
                                                        View
                                                    </Button>
                                                )}
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    aria-label={
                                                        notification.read
                                                            ? "Mark as unread"
                                                            : "Mark as read"
                                                    }
                                                >
                                                    {notification.read ? (
                                                        <X size={16} />
                                                    ) : (
                                                        <Check size={16} />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
