// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardBody,
    CardHeader,
    Avatar,
    Button,
    Input,
    Tabs,
    Tab,
    Divider,
    Chip,
    Progress,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";
import {
    User,
    Package,
    Heart,
    MapPin,
    CreditCard,
    Settings,
    LogOut,
    Edit,
    Plus,
    Trash2,
    Check,
    Clock,
    Truck,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import NavbarComponent from "@/components/layout/Navbar";

// Données simulées
const orders = [
    {
        id: "1",
        date: "2024-02-15",
        status: "delivered",
        total: 89.99,
        items: 3,
    },
    {
        id: "2",
        date: "2024-02-10",
        status: "shipped",
        total: 156.5,
        items: 5,
    },
    {
        id: "3",
        date: "2024-02-05",
        status: "processing",
        total: 45.0,
        items: 2,
    },
];

const addresses = [
    {
        id: "1",
        name: "Domicile",
        address: "123 rue de la Paix",
        city: "Paris",
        postalCode: "75001",
        country: "France",
        isDefault: true,
    },
    {
        id: "2",
        name: "Bureau",
        address: "456 avenue des Champs",
        city: "Paris",
        postalCode: "75008",
        country: "France",
        isDefault: false,
    },
];

const wishlistItems = [
    {
        id: "1",
        name: 'MacBook Pro 14"',
        price: 2399.0,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300",
    },
    {
        id: "2",
        name: "AirPods Pro",
        price: 279.0,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "delivered":
            return "success";
        case "shipped":
            return "primary";
        case "processing":
            return "warning";
        default:
            return "default";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "delivered":
            return <Check size={16} />;
        case "shipped":
            return <Truck size={16} />;
        case "processing":
            return <Clock size={16} />;
        default:
            return null;
    }
};

const getStatusText = (status: string) => {
    switch (status) {
        case "delivered":
            return "Livré";
        case "shipped":
            return "Expédié";
        case "processing":
            return "En traitement";
        default:
            return status;
    }
};

export default function DashboardPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedTab, setSelectedTab] = useState("profile");

    if (!user) {
        router.push("/auth/login");
        return null;
    }

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavbarComponent />

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardBody className="text-center py-8">
                                <Avatar
                                    src={`https://ui-avatars.com/api/?name=${user.name}&background=0D9488&color=fff`}
                                    className="w-24 h-24 mx-auto mb-4"
                                />
                                <h2 className="text-xl font-semibold mb-1">
                                    {user.name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {user.email}
                                </p>
                                <Chip
                                    color="primary"
                                    variant="flat"
                                    size="sm"
                                    className="mt-2"
                                >
                                    Membre depuis 2024
                                </Chip>
                            </CardBody>
                        </Card>

                        <Card className="mt-4">
                            <CardBody className="space-y-1 p-2">
                                <Button
                                    fullWidth
                                    variant={
                                        selectedTab === "profile"
                                            ? "flat"
                                            : "light"
                                    }
                                    color={
                                        selectedTab === "profile"
                                            ? "primary"
                                            : "default"
                                    }
                                    startContent={<User size={18} />}
                                    className="justify-start"
                                    onPress={() => setSelectedTab("profile")}
                                >
                                    Mon profil
                                </Button>
                                <Button
                                    fullWidth
                                    variant={
                                        selectedTab === "orders"
                                            ? "flat"
                                            : "light"
                                    }
                                    color={
                                        selectedTab === "orders"
                                            ? "primary"
                                            : "default"
                                    }
                                    startContent={<Package size={18} />}
                                    className="justify-start"
                                    onPress={() => setSelectedTab("orders")}
                                >
                                    Mes commandes
                                </Button>
                                <Button
                                    fullWidth
                                    variant={
                                        selectedTab === "wishlist"
                                            ? "flat"
                                            : "light"
                                    }
                                    color={
                                        selectedTab === "wishlist"
                                            ? "primary"
                                            : "default"
                                    }
                                    startContent={<Heart size={18} />}
                                    className="justify-start"
                                    onPress={() => setSelectedTab("wishlist")}
                                >
                                    Ma liste de souhaits
                                </Button>
                                <Button
                                    fullWidth
                                    variant={
                                        selectedTab === "addresses"
                                            ? "flat"
                                            : "light"
                                    }
                                    color={
                                        selectedTab === "addresses"
                                            ? "primary"
                                            : "default"
                                    }
                                    startContent={<MapPin size={18} />}
                                    className="justify-start"
                                    onPress={() => setSelectedTab("addresses")}
                                >
                                    Mes adresses
                                </Button>
                                <Button
                                    fullWidth
                                    variant={
                                        selectedTab === "payment"
                                            ? "flat"
                                            : "light"
                                    }
                                    color={
                                        selectedTab === "payment"
                                            ? "primary"
                                            : "default"
                                    }
                                    startContent={<CreditCard size={18} />}
                                    className="justify-start"
                                    onPress={() => setSelectedTab("payment")}
                                >
                                    Moyens de paiement
                                </Button>
                                <Button
                                    fullWidth
                                    variant={
                                        selectedTab === "settings"
                                            ? "flat"
                                            : "light"
                                    }
                                    color={
                                        selectedTab === "settings"
                                            ? "primary"
                                            : "default"
                                    }
                                    startContent={<Settings size={18} />}
                                    className="justify-start"
                                    onPress={() => setSelectedTab("settings")}
                                >
                                    Paramètres
                                </Button>
                                <Divider className="my-2" />
                                <Button
                                    fullWidth
                                    variant="light"
                                    color="danger"
                                    startContent={<LogOut size={18} />}
                                    className="justify-start"
                                    onPress={handleLogout}
                                >
                                    Déconnexion
                                </Button>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Profile Tab */}
                        {selectedTab === "profile" && (
                            <Card>
                                <CardHeader>
                                    <h3 className="text-xl font-semibold">
                                        Informations personnelles
                                    </h3>
                                </CardHeader>
                                <CardBody className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Prénom"
                                            defaultValue={
                                                user.name.split(" ")[0]
                                            }
                                            endContent={
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                            }
                                        />
                                        <Input
                                            label="Nom"
                                            defaultValue={
                                                user.name.split(" ")[1] || ""
                                            }
                                            endContent={
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                            }
                                        />
                                    </div>
                                    <Input
                                        label="Email"
                                        type="email"
                                        defaultValue={user.email}
                                        endContent={
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                            >
                                                <Edit size={16} />
                                            </Button>
                                        }
                                    />
                                    <Input
                                        label="Téléphone"
                                        type="tel"
                                        placeholder="+33 6 12 34 56 78"
                                        endContent={
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                            >
                                                <Edit size={16} />
                                            </Button>
                                        }
                                    />
                                    <Input
                                        label="Date de naissance"
                                        type="date"
                                        endContent={
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                            >
                                                <Edit size={16} />
                                            </Button>
                                        }
                                    />
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button variant="flat">Annuler</Button>
                                        <Button color="primary">
                                            Enregistrer les modifications
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        )}

                        {/* Orders Tab */}
                        {selectedTab === "orders" && (
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <h3 className="text-xl font-semibold">
                                            Mes commandes
                                        </h3>
                                    </CardHeader>
                                    <CardBody>
                                        {orders.length === 0 ? (
                                            <div className="text-center py-8">
                                                <Package
                                                    size={48}
                                                    className="mx-auto mb-4 text-gray-300"
                                                />
                                                <p className="text-gray-500">
                                                    Aucune commande pour le
                                                    moment
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {orders.map((order) => (
                                                    <Card
                                                        key={order.id}
                                                        isPressable
                                                        className="border"
                                                    >
                                                        <CardBody>
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <p className="font-semibold">
                                                                        Commande
                                                                        #
                                                                        {
                                                                            order.id
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                        {new Date(
                                                                            order.date
                                                                        ).toLocaleDateString(
                                                                            "fr-FR"
                                                                        )}
                                                                    </p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <Chip
                                                                        color={getStatusColor(
                                                                            order.status
                                                                        )}
                                                                        variant="flat"
                                                                        startContent={getStatusIcon(
                                                                            order.status
                                                                        )}
                                                                    >
                                                                        {getStatusText(
                                                                            order.status
                                                                        )}
                                                                    </Chip>
                                                                    <p className="text-lg font-semibold mt-2">
                                                                        {order.total.toFixed(
                                                                            2
                                                                        )}{" "}
                                                                        €
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4 flex justify-between items-center">
                                                                <p className="text-sm text-gray-600">
                                                                    {
                                                                        order.items
                                                                    }{" "}
                                                                    article(s)
                                                                </p>
                                                                <Button
                                                                    size="sm"
                                                                    variant="light"
                                                                >
                                                                    Voir les
                                                                    détails
                                                                </Button>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}
                                    </CardBody>
                                </Card>
                            </div>
                        )}

                        {/* Wishlist Tab */}
                        {selectedTab === "wishlist" && (
                            <Card>
                                <CardHeader>
                                    <h3 className="text-xl font-semibold">
                                        Ma liste de souhaits
                                    </h3>
                                </CardHeader>
                                <CardBody>
                                    {wishlistItems.length === 0 ? (
                                        <div className="text-center py-8">
                                            <Heart
                                                size={48}
                                                className="mx-auto mb-4 text-gray-300"
                                            />
                                            <p className="text-gray-500">
                                                Votre liste de souhaits est vide
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {wishlistItems.map((item) => (
                                                <Card
                                                    key={item.id}
                                                    className="border"
                                                >
                                                    <CardBody className="flex flex-row gap-4">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-20 h-20 object-cover rounded"
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold">
                                                                {item.name}
                                                            </h4>
                                                            <p className="text-primary font-bold">
                                                                {item.price.toFixed(
                                                                    2
                                                                )}{" "}
                                                                €
                                                            </p>
                                                            <div className="flex gap-2 mt-2">
                                                                <Button
                                                                    size="sm"
                                                                    color="primary"
                                                                >
                                                                    Ajouter au
                                                                    panier
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="light"
                                                                    color="danger"
                                                                    isIconOnly
                                                                >
                                                                    <Trash2
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        )}

                        {/* Addresses Tab */}
                        {selectedTab === "addresses" && (
                            <Card>
                                <CardHeader className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold">
                                        Mes adresses
                                    </h3>
                                    <Button
                                        color="primary"
                                        size="sm"
                                        startContent={<Plus size={16} />}
                                        onPress={onOpen}
                                    >
                                        Ajouter
                                    </Button>
                                </CardHeader>
                                <CardBody>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {addresses.map((address) => (
                                            <Card
                                                key={address.id}
                                                className="border"
                                            >
                                                <CardBody>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-semibold">
                                                            {address.name}
                                                        </h4>
                                                        {address.isDefault && (
                                                            <Chip
                                                                size="sm"
                                                                color="primary"
                                                                variant="flat"
                                                            >
                                                                Par défaut
                                                            </Chip>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {address.address}
                                                        <br />
                                                        {
                                                            address.postalCode
                                                        }{" "}
                                                        {address.city}
                                                        <br />
                                                        {address.country}
                                                    </p>
                                                    <div className="flex gap-2 mt-4">
                                                        <Button
                                                            size="sm"
                                                            variant="light"
                                                        >
                                                            Modifier
                                                        </Button>
                                                        {!address.isDefault && (
                                                            <Button
                                                                size="sm"
                                                                variant="light"
                                                                color="danger"
                                                            >
                                                                Supprimer
                                                            </Button>
                                                        )}
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </div>
                                </CardBody>
                            </Card>
                        )}

                        {/* Payment Tab */}
                        {selectedTab === "payment" && (
                            <Card>
                                <CardHeader className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold">
                                        Moyens de paiement
                                    </h3>
                                    <Button
                                        color="primary"
                                        size="sm"
                                        startContent={<Plus size={16} />}
                                    >
                                        Ajouter
                                    </Button>
                                </CardHeader>
                                <CardBody>
                                    <div className="text-center py-8">
                                        <CreditCard
                                            size={48}
                                            className="mx-auto mb-4 text-gray-300"
                                        />
                                        <p className="text-gray-500">
                                            Aucun moyen de paiement enregistré
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        )}

                        {/* Settings Tab */}
                        {selectedTab === "settings" && (
                            <Card>
                                <CardHeader>
                                    <h3 className="text-xl font-semibold">
                                        Paramètres
                                    </h3>
                                </CardHeader>
                                <CardBody className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-2">
                                            Notifications
                                        </h4>
                                        <div className="space-y-2">
                                            <label className="flex items-center justify-between">
                                                <span>
                                                    Recevoir les emails
                                                    promotionnels
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    className="toggle"
                                                    defaultChecked
                                                />
                                            </label>
                                            <label className="flex items-center justify-between">
                                                <span>
                                                    Notifications de commande
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    className="toggle"
                                                    defaultChecked
                                                />
                                            </label>
                                            <label className="flex items-center justify-between">
                                                <span>
                                                    Newsletter hebdomadaire
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    className="toggle"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div>
                                        <h4 className="font-semibold mb-2">
                                            Sécurité
                                        </h4>
                                        <Button variant="bordered" fullWidth>
                                            Changer le mot de passe
                                        </Button>
                                    </div>
                                    <Divider />
                                    <div>
                                        <h4 className="font-semibold mb-2">
                                            Compte
                                        </h4>
                                        <Button
                                            color="danger"
                                            variant="light"
                                            fullWidth
                                        >
                                            Supprimer mon compte
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Ajouter Adresse */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Ajouter une nouvelle adresse
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Nom de l'adresse"
                                    placeholder="Ex: Domicile"
                                />
                                <Input
                                    label="Adresse"
                                    placeholder="123 rue de la Paix"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Code postal"
                                        placeholder="75001"
                                    />
                                    <Input label="Ville" placeholder="Paris" />
                                </div>
                                <Input label="Pays" placeholder="France" />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Annuler
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Ajouter
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
