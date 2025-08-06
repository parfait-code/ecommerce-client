// app/categories/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Card,
    CardBody,
    Image,
    Button,
    Select,
    SelectItem,
    Tabs,
    Tab,
    Chip,
} from "@heroui/react";
import { Grid, List, Filter } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts, setFilters } from "@/store/slices/productsSlice";
import ProductCard from "@/components/products/ProductCard";
import NavbarComponent from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import { SORT_OPTIONS } from "@/lib/constants";

// Simuler les données de catégorie (à remplacer par un appel API)
const categoryData = {
    electronique: {
        name: "Électronique",
        description:
            "Découvrez notre sélection d'appareils électroniques et d'accessoires high-tech",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400",
        subcategories: [
            "Smartphones",
            "Ordinateurs",
            "Audio",
            "Gaming",
            "Accessoires",
        ],
    },
    mode: {
        name: "Mode",
        description:
            "Les dernières tendances en vêtements, chaussures et accessoires",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400",
        subcategories: [
            "Femme",
            "Homme",
            "Enfant",
            "Chaussures",
            "Accessoires",
        ],
    },
    "maison-jardin": {
        name: "Maison & Jardin",
        description: "Tout pour votre intérieur et votre jardin",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=400",
        subcategories: [
            "Mobilier",
            "Décoration",
            "Literie",
            "Jardin",
            "Outils",
        ],
    },
    "sport-loisirs": {
        name: "Sport & Loisirs",
        description: "Équipements et accessoires pour tous vos sports favoris",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=400",
        subcategories: [
            "Fitness",
            "Sports collectifs",
            "Outdoor",
            "Natation",
            "Yoga",
        ],
    },
};

export default function CategoryPage() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const slug = params.slug as string;
    const category =
        categoryData[slug as keyof typeof categoryData] ||
        categoryData.electronique;

    const { products, isLoading } = useAppSelector((state) => state.products);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedSubcategory, setSelectedSubcategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        dispatch(setFilters({ category: category.name }));
        dispatch(fetchProducts({ category: category.name }));
    }, [dispatch, category.name]);

    const handleSortChange = (value: string) => {
        setSortBy(value);
        dispatch(setFilters({ sortBy: value }));
    };

    const handleSubcategoryChange = (subcategory: string) => {
        setSelectedSubcategory(subcategory);
        // Ici vous pouvez ajouter la logique de filtrage par sous-catégorie
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavbarComponent />
            <CartDrawer />

            {/* Hero Section */}
            <section className="relative h-64 md:h-80">
                <Image
                    alt={category.name}
                    className="w-full h-full object-cover"
                    src={category.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 pb-8">
                        <Breadcrumbs className="mb-4 text-white/80">
                            <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                            <BreadcrumbItem href="/categories">
                                Catégories
                            </BreadcrumbItem>
                            <BreadcrumbItem className="text-white">
                                {category.name}
                            </BreadcrumbItem>
                        </Breadcrumbs>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            {category.name}
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl">
                            {category.description}
                        </p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                {/* Subcategories */}
                <div className="mb-8">
                    <Tabs
                        selectedKey={selectedSubcategory}
                        onSelectionChange={(key) =>
                            handleSubcategoryChange(key as string)
                        }
                        variant="underlined"
                        color="primary"
                    >
                        <Tab key="all" title="Tous les produits" />
                        {category.subcategories.map((subcategory) => (
                            <Tab key={subcategory} title={subcategory} />
                        ))}
                    </Tabs>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <p className="text-gray-600 dark:text-gray-400">
                            {products.length} produits trouvés
                        </p>
                        <div className="flex gap-1">
                            <Button
                                isIconOnly
                                size="sm"
                                variant={
                                    viewMode === "grid" ? "solid" : "light"
                                }
                                onPress={() => setViewMode("grid")}
                            >
                                <Grid size={18} />
                            </Button>
                            <Button
                                isIconOnly
                                size="sm"
                                variant={
                                    viewMode === "list" ? "solid" : "light"
                                }
                                onPress={() => setViewMode("list")}
                            >
                                <List size={18} />
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Select
                            size="sm"
                            label="Trier par"
                            className="w-48"
                            selectedKeys={[sortBy]}
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            {SORT_OPTIONS.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Button
                            color="primary"
                            variant="flat"
                            startContent={<Filter size={18} />}
                        >
                            Filtres
                        </Button>
                    </div>
                </div>

                {/* Products */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardBody className="p-0">
                                    <div className="h-64 bg-gray-200 dark:bg-gray-700" />
                                    <div className="p-4 space-y-2">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                isPressable
                                className="overflow-hidden"
                            >
                                <CardBody className="p-0">
                                    <div className="flex flex-col sm:flex-row">
                                        <Image
                                            alt={product.name}
                                            className="w-full sm:w-48 h-48 object-cover"
                                            src={product.image}
                                        />
                                        <div className="flex-1 p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-1">
                                                        {product.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Chip
                                                            size="sm"
                                                            variant="dot"
                                                            color="secondary"
                                                        >
                                                            {product.category}
                                                        </Chip>
                                                        <div className="flex items-center">
                                                            <span className="text-yellow-400">
                                                                ★
                                                            </span>
                                                            <span className="text-sm ml-1">
                                                                {product.rating.toFixed(
                                                                    1
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-2xl font-bold text-primary">
                                                    {product.price.toFixed(2)} €
                                                </p>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="flex gap-2">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Ajouter au panier
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    variant="bordered"
                                                    size="sm"
                                                >
                                                    Voir détails
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && products.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500 mb-4">
                            Aucun produit trouvé dans cette catégorie
                        </p>
                        <Button
                            color="primary"
                            variant="flat"
                            href="/products"
                        >
                            Voir tous les produits
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
