"use client";

import { useParams } from "next/navigation";
import { products } from "../../../src/data/mockData";
import ProductDetails from "../../../src/components/product/ProductDetails";
import ProductGrid from "../../../src/components/product/ProductGrid";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import Link from "next/link";

export default function ProductPage() {
    const params = useParams();
    const product = products.find((p) => p.id === params.id);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-medium">Product not found</h1>
                <Link
                    href="/"
                    className="text-blue-600 hover:underline mt-4 inline-block"
                >
                    Return to homepage
                </Link>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs className="mb-8">
                <BreadcrumbItem>
                    <Link href="/">HOME</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link href={`/category/${product.category}`}>
                        {product.category.toUpperCase()}
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>{product.name}</BreadcrumbItem>
            </Breadcrumbs>

            <ProductDetails product={product} />

            {relatedProducts.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-xl font-medium tracking-wider mb-8">
                        YOU MAY ALSO LIKE
                    </h2>
                    <ProductGrid
                        products={relatedProducts}
                        showControls={false}
                    />
                </section>
            )}
        </div>
    );
}
