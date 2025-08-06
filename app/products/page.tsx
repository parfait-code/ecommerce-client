// app/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
    Button,
    Input,
    Select,
    SelectItem,
    Slider,
    Checkbox,
    Card,
    CardBody,
    Pagination,
    Breadcrumbs,
    BreadcrumbItem,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Chip,
    Divider,
} from "@heroui/react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    fetchProducts,
    setFilters,
    clearFilters,
} from "@/store/slices/productsSlice";
import ProductCard from "@/components/products/ProductCard";
import NavbarComponent from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import { SORT_OPTIONS } from "@/lib/constants";

const categories = [
    "Électronique",
    "Mode",
    "Maison",
    "Sport",
    "Beauté",
    "Alimentation",
    "Livres",
    "Jouets",
];

export default function ProductsPage() {
    const dispatch = useAppDispatch();
    const { products, isLoading, filters } = useAppSelector(
        (state) => state.products
    );

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [localFilters, setLocalFilters] = useState({
        searchQuery: "",
        category: "",
        minPrice: 0,
        maxPrice: 1000,
        inStock: false,
        sortBy: "newest",
    });

    const productsPerPage = 12;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = products.slice(
        startIndex,
        startIndex + productsPerPage
    );

    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, filters]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setFilters({ searchQuery: localFilters.searchQuery }));
    };

    const applyFilters = () => {
        dispatch(setFilters(localFilters));
        setIsFilterOpen(false);
    };

    const resetFilters = () => {
        setLocalFilters({
            searchQuery: "",
            category: "",
            minPrice: 0,
            maxPrice: 1000,
            inStock: false,
            sortBy: "newest",
        });
        dispatch(clearFilters());
    };

    const activeFiltersCount = [
        localFilters.category,
        localFilters.inStock,
        localFilters.minPrice > 0,
        localFilters.maxPrice < 1000,
    ].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavbarComponent />
            <CartDrawer />

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs className="mb-6">
                    <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                    <BreadcrumbItem>Produits</BreadcrumbItem>
                </Breadcrumbs>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Tous nos produits
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {products.length} produits disponibles
                        </p>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <Select
                            size="sm"
                            label="Trier par"
                            className="w-48"
                            selectedKeys={[localFilters.sortBy]}
                            onChange={(e) =>
                                setLocalFilters({
                                    ...localFilters,
                                    sortBy: e.target.value,
                                })
                            }
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
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex gap-4 mb-6">
                    <form onSubmit={handleSearch} className="flex-1">
                        <Input
                            placeholder="Rechercher un produit..."
                            value={localFilters.searchQuery}
                            onChange={(e) =>
                                setLocalFilters({
                                    ...localFilters,
                                    searchQuery: e.target.value,
                                })
                            }
                            startContent={<Search size={20} />}
                            endContent={
                                localFilters.searchQuery && (
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        onPress={() => {
                                            setLocalFilters({
                                                ...localFilters,
                                                searchQuery: "",
                                            });
                                            dispatch(
                                                setFilters({ searchQuery: "" })
                                            );
                                        }}
                                    >
                                        <X size={16} />
                                    </Button>
                                )
                            }
                        />
                    </form>
                    <Button
                        color="primary"
                        variant="flat"
                        startContent={<Filter size={20} />}
                        onPress={() => setIsFilterOpen(true)}
                        endContent={
                            activeFiltersCount > 0 && (
                                <Chip size="sm" color="primary" variant="solid">
                                    {activeFiltersCount}
                                </Chip>
                            )
                        }
                    >
                        Filtres
                    </Button>
                </div>

                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {localFilters.category && (
                            <Chip
                                onClose={() =>
                                    setLocalFilters({
                                        ...localFilters,
                                        category: "",
                                    })
                                }
                                variant="flat"
                            >
                                Catégorie: {localFilters.category}
                            </Chip>
                        )}
                        {localFilters.inStock && (
                            <Chip
                                onClose={() =>
                                    setLocalFilters({
                                        ...localFilters,
                                        inStock: false,
                                    })
                                }
                                variant="flat"
                            >
                                En stock uniquement
                            </Chip>
                        )}
                        {(localFilters.minPrice > 0 ||
                            localFilters.maxPrice < 1000) && (
                            <Chip
                                onClose={() =>
                                    setLocalFilters({
                                        ...localFilters,
                                        minPrice: 0,
                                        maxPrice: 1000,
                                    })
                                }
                                variant="flat"
                            >
                                Prix: {localFilters.minPrice}€ -{" "}
                                {localFilters.maxPrice}€
                            </Chip>
                        )}
                        <Button
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={resetFilters}
                        >
                            Effacer tout
                        </Button>
                    </div>
                )}

                {/* Products Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(12)].map((_, i) => (
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
                ) : paginatedProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {paginatedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <Pagination
                                    total={totalPages}
                                    page={currentPage}
                                    onChange={setCurrentPage}
                                    showControls
                                    showShadow
                                    color="primary"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500 mb-4">
                            Aucun produit trouvé
                        </p>
                        <Button
                            color="primary"
                            variant="flat"
                            onPress={resetFilters}
                        >
                            Réinitialiser les filtres
                        </Button>
                    </div>
                )}
            </div>

            {/* Filter Drawer */}
            <Drawer
                isOpen={isFilterOpen}
                onOpenChange={setIsFilterOpen}
                placement="right"
                size="sm"
            >
                <DrawerContent>
                    <DrawerHeader className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Filtres</h3>
                        <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => setIsFilterOpen(false)}
                        >
                            <X size={20} />
                        </Button>
                    </DrawerHeader>
                    <DrawerBody>
                        <div className="space-y-6">
                            {/* Category Filter */}
                            <div>
                                <h4 className="font-semibold mb-3">
                                    Catégorie
                                </h4>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <Checkbox
                                            key={category}
                                            isSelected={
                                                localFilters.category ===
                                                category
                                            }
                                            onValueChange={(isSelected) =>
                                                setLocalFilters({
                                                    ...localFilters,
                                                    category: isSelected
                                                        ? category
                                                        : "",
                                                })
                                            }
                                        >
                                            {category}
                                        </Checkbox>
                                    ))}
                                </div>
                            </div>

                            <Divider />

                            {/* Price Filter */}
                            <div>
                                <h4 className="font-semibold mb-3">Prix</h4>
                                <Slider
                                    label="Gamme de prix"
                                    step={10}
                                    minValue={0}
                                    maxValue={1000}
                                    value={[
                                        localFilters.minPrice,
                                        localFilters.maxPrice,
                                    ]}
                                    onChange={(value) => {
                                        if (Array.isArray(value)) {
                                            setLocalFilters({
                                                ...localFilters,
                                                minPrice: value[0],
                                                maxPrice: value[1],
                                            });
                                        }
                                    }}
                                    formatOptions={{
                                        style: "currency",
                                        currency: "EUR",
                                    }}
                                    className="max-w-md"
                                />
                            </div>

                            <Divider />

                            {/* Stock Filter */}
                            <div>
                                <Checkbox
                                    isSelected={localFilters.inStock}
                                    onValueChange={(isSelected) =>
                                        setLocalFilters({
                                            ...localFilters,
                                            inStock: isSelected,
                                        })
                                    }
                                >
                                    En stock uniquement
                                </Checkbox>
                            </div>

                            <Divider />

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    fullWidth
                                    color="primary"
                                    onPress={applyFilters}
                                >
                                    Appliquer les filtres
                                </Button>
                                <Button
                                    fullWidth
                                    variant="flat"
                                    onPress={resetFilters}
                                >
                                    Réinitialiser
                                </Button>
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
