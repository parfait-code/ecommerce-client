"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../src/store/store";
import {
    setCategory,
    setFilters,
    setSortBy,
} from "../../../src/store/slices/productsSlice";
import ProductGrid from "../../../src/components/product/ProductGrid";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Accordion,
    AccordionItem,
    CheckboxGroup,
    Checkbox,
    Slider,
    Button,
} from "@heroui/react";
import Link from "next/link";
import { Filter } from "lucide-react";

export default function CategoryPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const { filteredItems } = useSelector((state: RootState) => state.products);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

    useEffect(() => {
        if (params.slug) {
            dispatch(setCategory(params.slug as string));
        }
    }, [params.slug, dispatch]);

    const handleApplyFilters = () => {
        dispatch(
            setFilters({
                sizes: selectedSizes,
                colors: selectedColors,
                priceRange,
            })
        );
    };

    const availableSizes = ["XS", "S", "M", "L", "XL"];
    const availableColors = [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#ffffff" },
        { name: "Navy", hex: "#1a2332" },
        { name: "Grey", hex: "#808080" },
        { name: "Green", hex: "#1a3d2e" },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs className="mb-8">
                <BreadcrumbItem>
                    <Link href="/">HOME</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link href={`/category/${params.slug}`}>
                        {String(params.slug).toUpperCase().replace("-", " ")}
                    </Link>
                </BreadcrumbItem>
            </Breadcrumbs>

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-medium tracking-wider">
                    {String(params.slug).toUpperCase().replace("-", " ")}
                </h1>

                <Button
                    variant="bordered"
                    startContent={<Filter size={16} />}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    Filters
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters sidebar */}
                {showFilters && (
                    <div className="lg:col-span-1">
                        <Accordion>
                            <AccordionItem key="sizes" title="SIZES">
                                <CheckboxGroup
                                    value={selectedSizes}
                                    onValueChange={setSelectedSizes}
                                >
                                    {availableSizes.map((size) => (
                                        <Checkbox key={size} value={size}>
                                            {size}
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </AccordionItem>

                            <AccordionItem key="colors" title="COLORS">
                                <CheckboxGroup
                                    value={selectedColors}
                                    onValueChange={setSelectedColors}
                                >
                                    {availableColors.map((color) => (
                                        <Checkbox
                                            key={color.name}
                                            value={color.name}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-4 h-4 rounded-full border"
                                                    style={{
                                                        backgroundColor:
                                                            color.hex,
                                                    }}
                                                />
                                                {color.name}
                                            </div>
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </AccordionItem>

                            <AccordionItem key="price" title="PRICE">
                                <Slider
                                    label="Price range"
                                    step={10}
                                    minValue={0}
                                    maxValue={500}
                                    value={priceRange}
                                    onChange={(val) =>
                                        setPriceRange(val as [number, number])
                                    }
                                    formatOptions={{
                                        style: "currency",
                                        currency: "USD",
                                    }}
                                    className="max-w-md"
                                />
                            </AccordionItem>
                        </Accordion>

                        <Button
                            className="w-full mt-4"
                            onClick={handleApplyFilters}
                        >
                            Apply Filters
                        </Button>
                    </div>
                )}

                {/* Products grid */}
                <div
                    className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}
                >
                    <ProductGrid products={filteredItems} />
                </div>
            </div>
        </div>
    );
}
