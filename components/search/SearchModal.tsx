// components/search/SearchModal.tsx
"use client";

import { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    Card,
    CardBody,
    Chip,
    Spinner,
    Image,
} from "@heroui/react";
import { Search, Clock, TrendingUp, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleSearchModal } from "@/store/slices/uiSlice";
import { Product } from "@/store/slices/productsSlice";

// Données simulées
const popularSearches = [
    "iPhone 15",
    "MacBook Pro",
    "Nike Air Max",
    "PlayStation 5",
    "Samsung TV",
];

const recentSearches = ["Casque audio", "Chaise gaming", "Montre connectée"];

const trendingProducts = [
    {
        id: "1",
        name: "AirPods Pro 2",
        price: 279,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100",
    },
    {
        id: "2",
        name: "Nintendo Switch",
        price: 299,
        image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=100&h=100",
    },
];

export default function SearchModal() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.ui.searchModalOpen);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [recentSearchList, setRecentSearchList] = useState(recentSearches);

    useEffect(() => {
        if (searchQuery.length > 2) {
            const timer = setTimeout(() => {
                performSearch();
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const performSearch = async () => {
        setIsSearching(true);
        // Simuler une recherche API
        setTimeout(() => {
            // Résultats simulés
            const results: Product[] = [
                {
                    id: "1",
                    name: 'MacBook Pro 14" M3',
                    description: "Ordinateur portable professionnel",
                    price: 2399,
                    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300",
                    category: "Électronique",
                    stock: 5,
                    rating: 4.8,
                },
                {
                    id: "2",
                    name: "iPhone 15 Pro",
                    description: "Smartphone dernière génération",
                    price: 1299,
                    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300",
                    category: "Électronique",
                    stock: 12,
                    rating: 4.9,
                },
            ];
            setSearchResults(results);
            setIsSearching(false);
        }, 500);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query && !recentSearchList.includes(query)) {
            setRecentSearchList([query, ...recentSearchList.slice(0, 4)]);
        }
    };

    const handleResultClick = (productId: string) => {
        dispatch(toggleSearchModal());
        router.push(`/products/${productId}`);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery) {
            dispatch(toggleSearchModal());
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const clearRecentSearches = () => {
        setRecentSearchList([]);
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={() => dispatch(toggleSearchModal())}
            size="2xl"
            placement="top"
            hideCloseButton
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex items-center gap-4 pb-0">
                            <form
                                onSubmit={handleSearchSubmit}
                                className="flex-1"
                            >
                                <Input
                                    autoFocus
                                    placeholder="Rechercher des produits..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    startContent={<Search size={20} />}
                                    endContent={
                                        searchQuery && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSearchQuery("")
                                                }
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <X size={18} />
                                            </button>
                                        )
                                    }
                                    classNames={{
                                        input: "text-lg",
                                        inputWrapper: "h-14",
                                    }}
                                />
                            </form>
                        </ModalHeader>
                        <ModalBody className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                            {/* Résultats de recherche */}
                            {searchQuery.length > 2 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3">
                                        Résultats de recherche
                                    </h3>
                                    {isSearching ? (
                                        <div className="flex justify-center py-8">
                                            <Spinner size="lg" />
                                        </div>
                                    ) : searchResults.length > 0 ? (
                                        <div className="space-y-2">
                                            {searchResults.map((product) => (
                                                <Card
                                                    key={product.id}
                                                    isPressable
                                                    onPress={() =>
                                                        handleResultClick(
                                                            product.id
                                                        )
                                                    }
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                                >
                                                    <CardBody className="flex flex-row items-center gap-4 p-3">
                                                        <Image
                                                            alt={product.name}
                                                            className="w-16 h-16 object-cover rounded"
                                                            src={product.image}
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold">
                                                                {product.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {
                                                                    product.category
                                                                }
                                                            </p>
                                                        </div>
                                                        <p className="text-lg font-bold text-primary">
                                                            {product.price.toFixed(
                                                                2
                                                            )}{" "}
                                                            €
                                                        </p>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-gray-500 py-4">
                                            Aucun résultat trouvé pour "
                                            {searchQuery}"
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Contenu par défaut */}
                            {!searchQuery && (
                                <>
                                    {/* Recherches récentes */}
                                    {recentSearchList.length > 0 && (
                                        <div className="mb-6">
                                            <div className="flex justify-between items-center mb-3">
                                                <h3 className="font-semibold flex items-center gap-2">
                                                    <Clock size={18} />
                                                    Recherches récentes
                                                </h3>
                                                <button
                                                    onClick={
                                                        clearRecentSearches
                                                    }
                                                    className="text-sm text-gray-500 hover:text-gray-700"
                                                >
                                                    Effacer
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {recentSearchList.map(
                                                    (search, index) => (
                                                        <Chip
                                                            key={index}
                                                            variant="flat"
                                                            onClose={() => {
                                                                setRecentSearchList(
                                                                    recentSearchList.filter(
                                                                        (
                                                                            _,
                                                                            i
                                                                        ) =>
                                                                            i !==
                                                                            index
                                                                    )
                                                                );
                                                            }}
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                handleSearch(
                                                                    search
                                                                )
                                                            }
                                                        >
                                                            {search}
                                                        </Chip>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Recherches populaires */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <TrendingUp size={18} />
                                            Recherches populaires
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {popularSearches.map((search) => (
                                                <Chip
                                                    key={search}
                                                    variant="bordered"
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        handleSearch(search)
                                                    }
                                                >
                                                    {search}
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Produits tendance */}
                                    <div>
                                        <h3 className="font-semibold mb-3">
                                            Produits tendance
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {trendingProducts.map((product) => (
                                                <Card
                                                    key={product.id}
                                                    isPressable
                                                    onPress={() =>
                                                        handleResultClick(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    <CardBody className="flex flex-row items-center gap-3 p-3">
                                                        <Image
                                                            alt={product.name}
                                                            className="w-12 h-12 object-cover rounded"
                                                            src={product.image}
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-sm">
                                                                {product.name}
                                                            </h4>
                                                            <p className="text-sm font-semibold text-primary">
                                                                {product.price.toFixed(
                                                                    2
                                                                )}{" "}
                                                                €
                                                            </p>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
