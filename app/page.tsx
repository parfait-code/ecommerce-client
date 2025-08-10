import HeroBanner from "../src/components/home/HeroBanner";
import CategoryGrid from "../src/components/home/CategoryGrid";
import ProductGrid from "../src/components/product/ProductGrid";
import { products } from "../src/data/mockData";

export default function Home() {
    const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

    return (
        <>
            <HeroBanner />
            <CategoryGrid />

            <section className="container mx-auto px-4 py-16">
                <h2 className="text-2xl font-medium tracking-wider text-center mb-8">
                    NEW ARRIVALS
                </h2>
                <ProductGrid products={featuredProducts} showControls={false} />
            </section>
        </>
    );
}
