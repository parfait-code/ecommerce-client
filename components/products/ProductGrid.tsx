// components/products/ProductGrid.tsx
("use client");

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productsSlice";
import ProductCard from "./ProductCard";
import { Spinner } from "@heroui/react";

export default function ProductGrid() {
    const dispatch = useAppDispatch();
    const { products, isLoading, error, filters } = useAppSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, filters]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-danger">{error}</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">Aucun produit trouvé</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
