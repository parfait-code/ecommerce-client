// app/products/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    Button,
    Card,
    CardBody,
    Chip,
    Divider,
    Image,
    Tab,
    Tabs,
    Breadcrumbs,
    BreadcrumbItem,
} from "@heroui/react";
import {
    ShoppingCart,
    Heart,
    Star,
    Truck,
    Shield,
    Minus,
    Plus,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductById } from "@/store/slices/productsSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { addNotification } from "@/store/slices/uiSlice";
import NavbarComponent from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/products/ProductCard";

export default function ProductDetailPage() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const { currentProduct, isLoading } = useAppSelector(
        (state) => state.products
    );
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (params.id) {
            dispatch(fetchProductById(params.id as string));
        }
    }, [params.id, dispatch]);

    const handleAddToCart = () => {
        if (currentProduct) {
            dispatch(
                addToCart({
                    id: currentProduct.id,
                    name: currentProduct.name,
                    price: currentProduct.price,
                    quantity,
                    image: currentProduct.image,
                })
            );
            dispatch(
                addNotification({
                    type: "success",
                    message: `${quantity} × ${currentProduct.name} ajouté au panier !`,
                })
            );
        }
    };

    if (isLoading || !currentProduct) {
        return (
            <div>
                <NavbarComponent />
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gray-200 h-96 rounded-lg" />
                            <div className="space-y-4">
                                <div className="bg-gray-200 h-8 w-3/4 rounded" />
                                <div className="bg-gray-200 h-6 w-1/2 rounded" />
                                <div className="bg-gray-200 h-24 rounded" />
                                <div className="bg-gray-200 h-12 w-1/3 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Simuler plusieurs images
    const images = [
        currentProduct.image,
        currentProduct.image,
        currentProduct.image,
        currentProduct.image,
    ];

    return (
        <div>
            <NavbarComponent />
            <CartDrawer />

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs className="mb-6">
                    <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                    <BreadcrumbItem href="/products">Produits</BreadcrumbItem>
                    <BreadcrumbItem
                        href={`/categories/${currentProduct.category.toLowerCase()}`}
                    >
                        {currentProduct.category}
                    </BreadcrumbItem>
                    <BreadcrumbItem>{currentProduct.name}</BreadcrumbItem>
                </Breadcrumbs>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Images Section */}
                    <div>
                        <div className="mb-4">
                            <Image
                                alt={currentProduct.name}
                                className="w-full h-[500px] object-cover rounded-lg"
                                src={images[selectedImage]}
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`border-2 rounded-lg overflow-hidden ${
                                        selectedImage === index
                                            ? "border-primary"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <Image
                                        alt={`${currentProduct.name} ${index + 1}`}
                                        className="w-full h-24 object-cover"
                                        src={image}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    {currentProduct.name}
                                </h1>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center">
                                        <Star
                                            size={20}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                        <span className="ml-1 font-semibold">
                                            {currentProduct.rating.toFixed(1)}
                                        </span>
                                        <span className="ml-1 text-gray-500">
                                            (128 avis)
                                        </span>
                                    </div>
                                    <Chip color="secondary" variant="dot">
                                        {currentProduct.category}
                                    </Chip>
                                </div>
                            </div>
                            <Button
                                isIconOnly
                                variant="light"
                                size="lg"
                                onPress={() => setIsLiked(!isLiked)}
                            >
                                <Heart
                                    size={24}
                                    className={
                                        isLiked
                                            ? "fill-red-500 text-red-500"
                                            : ""
                                    }
                                />
                            </Button>
                        </div>

                        <p className="text-4xl font-bold text-primary mb-6">
                            {currentProduct.price.toFixed(2)} €
                        </p>

                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {currentProduct.description}
                        </p>

                        <Divider className="my-6" />

                        {/* Stock Status */}
                        <div className="mb-6">
                            {currentProduct.stock > 10 && (
                                <Chip
                                    color="success"
                                    variant="flat"
                                    startContent={<Shield size={16} />}
                                >
                                    En stock ({currentProduct.stock}{" "}
                                    disponibles)
                                </Chip>
                            )}
                            {currentProduct.stock <= 10 &&
                                currentProduct.stock > 0 && (
                                    <Chip
                                        color="warning"
                                        variant="flat"
                                        startContent={<Shield size={16} />}
                                    >
                                        Stock limité ({currentProduct.stock}{" "}
                                        restants)
                                    </Chip>
                                )}
                            {currentProduct.stock === 0 && (
                                <Chip
                                    color="danger"
                                    variant="flat"
                                    startContent={<Shield size={16} />}
                                >
                                    Rupture de stock
                                </Chip>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <p className="font-semibold mb-2">Quantité</p>
                            <div className="flex items-center gap-4">
                                <Button
                                    isIconOnly
                                    variant="bordered"
                                    onPress={() =>
                                        setQuantity(Math.max(1, quantity - 1))
                                    }
                                >
                                    <Minus size={20} />
                                </Button>
                                <span className="font-semibold text-xl w-12 text-center">
                                    {quantity}
                                </span>
                                <Button
                                    isIconOnly
                                    variant="bordered"
                                    onPress={() =>
                                        setQuantity(
                                            Math.min(
                                                currentProduct.stock,
                                                quantity + 1
                                            )
                                        )
                                    }
                                    isDisabled={
                                        quantity >= currentProduct.stock
                                    }
                                >
                                    <Plus size={20} />
                                </Button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-6">
                            <Button
                                fullWidth
                                color="primary"
                                size="lg"
                                startContent={<ShoppingCart size={20} />}
                                onPress={handleAddToCart}
                                isDisabled={currentProduct.stock === 0}
                            >
                                Ajouter au panier
                            </Button>
                            <Button
                                fullWidth
                                color="primary"
                                variant="bordered"
                                size="lg"
                                isDisabled={currentProduct.stock === 0}
                            >
                                Acheter maintenant
                            </Button>
                        </div>

                        {/* Delivery Info */}
                        <Card className="bg-gray-50 dark:bg-gray-800">
                            <CardBody className="flex flex-row items-center gap-4">
                                <Truck size={24} className="text-primary" />
                                <div>
                                    <p className="font-semibold">
                                        Livraison gratuite
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Pour toute commande supérieure à 50€
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                {/* Tabs Section */}
                <Tabs aria-label="Product information" className="mb-12">
                    <Tab key="description" title="Description">
                        <Card>
                            <CardBody>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {currentProduct.description}
                                </p>
                                <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                                    <li>Matériaux de haute qualité</li>
                                    <li>Conception durable et résistante</li>
                                    <li>Garantie constructeur de 2 ans</li>
                                    <li>Service après-vente disponible</li>
                                </ul>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="specifications" title="Caractéristiques">
                        <Card>
                            <CardBody>
                                <div className="space-y-4">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="font-semibold">
                                            Référence
                                        </span>
                                        <span>{currentProduct.id}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="font-semibold">
                                            Catégorie
                                        </span>
                                        <span>{currentProduct.category}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="font-semibold">
                                            Poids
                                        </span>
                                        <span>1.2 kg</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="font-semibold">
                                            Dimensions
                                        </span>
                                        <span>30 x 20 x 10 cm</span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="reviews" title="Avis (128)">
                        <Card>
                            <CardBody>
                                <div className="text-center py-8">
                                    <p className="text-gray-500">
                                        Les avis clients arrivent bientôt...
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>

                {/* Related Products */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">
                        Produits similaires
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Ici vous pouvez afficher des produits similaires */}
                        <p className="col-span-full text-center text-gray-500 py-8">
                            Chargement des produits similaires...
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
