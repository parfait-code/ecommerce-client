"use client";

import { Product } from "../../types";
import ProductCard from "./ProductCard";
import { Select, SelectItem, Button } from "@heroui/react";
import { useState } from "react";
import { Grid3x3, Grid2x2 } from "lucide-react";

interface ProductGridProps {
    products: Product[];
    showControls?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    showControls = true,
}) => {
    const [gridCols, setGridCols] = useState(3);
    const [sortBy, setSortBy] = useState("featured");

    const sortOptions = [
        { key: "featured", label: "Featured" },
        { key: "price-asc", label: "Price: Low to High" },
        { key: "price-desc", label: "Price: High to Low" },
        { key: "name", label: "Name" },
    ];

    return (
        <div>
            {showControls && (
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-gray-600">
                        {products.length} items
                    </p>

                    <div className="flex gap-4 items-center">
                        <Select
                            size="sm"
                            label="Sort by"
                            selectedKeys={[sortBy]}
                            onSelectionChange={(keys) =>
                                setSortBy(Array.from(keys)[0] as string)
                            }
                            className="w-48"
                        >
                            {sortOptions.map((option) => (
                                <SelectItem key={option.key}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <div className="flex gap-1">
                            <Button
                                isIconOnly
                                size="sm"
                                variant={gridCols === 2 ? "solid" : "light"}
                                onClick={() => setGridCols(2)}
                            >
                                <Grid2x2 size={16} />
                            </Button>
                            <Button
                                isIconOnly
                                size="sm"
                                variant={gridCols === 3 ? "solid" : "light"}
                                onClick={() => setGridCols(3)}
                            >
                                <Grid3x3 size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`grid grid-cols-2 ${gridCols === 3 ? "lg:grid-cols-3" : ""} gap-4`}
            >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No products found</p>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
