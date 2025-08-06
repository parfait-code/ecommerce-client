// app/page.tsx
"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { ArrowRight, Play, Truck, Shield, CreditCard, Headphones } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productsSlice";
import ProductCard from "@/components/products/ProductCard";
import NavbarComponent from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import HeroSection from "@/components/layout/HeroSection";

const features = [
    {
        icon: Truck,
        title: "Livraison gratuite",
        description: "Pour toute commande supérieure à 50€",
    },
    {
        icon: Shield,
        title: "Essayage gratuit",
        description: "Retour et échange sous 30 jours",
    },
    {
        icon: CreditCard,
        title: "Paiement sécurisé",
        description: "Transactions 100% sécurisées",
    },
    {
        icon: Headphones,
        title: "Conseil mode",
        description: "Nos stylistes à votre service",
    },
];

const categories = [
    {
        name: "Homme",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300",
        link: "/categories/homme",
    },
    {
        name: "Femme",
        image: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=400&h=300",
        link: "/categories/femme",
    },
    {
        name: "Enfant",
        image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=300",
        link: "/categories/enfant",
    },
    {
        name: "Accessoires",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300",
        link: "/categories/accessoires",
    },
];

export default function HomePage() {
    const dispatch = useAppDispatch();
    const { featuredProducts } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <NavbarComponent />
            <CartDrawer />

            {/* Hero Section */}
            <HeroSection
                title="Mode & Style pour tous"
                subtitle="Découvrez notre collection de vêtements tendance pour homme, femme et enfant. Livraison gratuite dès 50€ d'achat."
                primaryButtonText="Découvrir la collection"
                primaryButtonHref="/products"
                secondaryButtonText="Nouvelles arrivées"
                secondaryButtonHref="/nouveautes"
            />

            {/* Video Presentation Section */}
            <section className="py-20 bg-black text-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
                            Notre Histoire
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fadeIn">
                            Découvrez l'univers de la mode qui nous inspire
                        </p>
                    </div>
                    
                    <div className="relative h-[500px] rounded-2xl overflow-hidden group">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            src="/assets/videos/hero.mp4"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="text-2xl font-bold mb-2">L'Art de la Mode</h3>
                            <p className="text-gray-200">Chaque pièce raconte une histoire unique</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Split Video Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6 order-1 md:order-1">
                            <h3 className="text-3xl font-bold">Collection Homme</h3>
                            <p className="text-gray-600 text-lg">
                                Élégance et modernité se rencontrent dans notre collection masculine. 
                                Des costumes sur-mesure aux streetwear tendance.
                            </p>
                            <Button
                                as={Link}
                                href="/categories/homme"
                                size="lg"
                                color="primary"
                                endContent={<ArrowRight size={20} />}
                            >
                                Découvrir
                            </Button>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden order-2 md:order-2">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                                src="/assets/videos/hero.mp4"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Reverse Split Video Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6 md:order-1">
                            <h3 className="text-3xl font-bold">Collection Femme</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Féminité et audace caractérisent notre ligne féminine. 
                                Des robes sophistiquées aux tenues décontractées.
                            </p>
                            <Button
                                as={Link}
                                href="/categories/femme"
                                size="lg"
                                color="primary"
                                endContent={<ArrowRight size={20} />}
                            >
                                Découvrir
                            </Button>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden md:order-2">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                                src="/assets/videos/hero.mp4"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="text-center">
                                <CardBody className="py-8">
                                    <feature.icon
                                        size={48}
                                        className="mx-auto mb-4 text-primary"
                                    />
                                    <h3 className="font-semibold text-lg mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Video Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6">Défilé Exclusif</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Plongez dans l'univers de nos créations
                        </p>
                    </div>
                    
                    <div className="relative max-w-4xl mx-auto">
                        <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                                src="/assets/videos/hero.mp4"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
                            
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Button
                                    isIconOnly
                                    size="lg"
                                    className="w-20 h-20 bg-white/20 backdrop-blur-md border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                                >
                                    <Play size={32} className="text-white ml-1" />
                                </Button>
                            </div>
                            
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">Collection Automne/Hiver 2024</h3>
                                <p className="text-white/90">Découvrez les tendances qui définiront votre style</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 animate-fadeIn">
                        Nos collections
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <Link key={category.name} href={category.link}>
                                <Card 
                                    isPressable 
                                    className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-scaleIn"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <CardBody className="p-0 relative overflow-hidden">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                alt={category.name}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                src={category.image}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg text-center transition-colors duration-300 hover:text-primary">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold">
                            Tendances du moment
                        </h2>
                        <Button
                            as={Link}
                            href="/products"
                            variant="light"
                            endContent={<ArrowRight size={16} />}
                        >
                            Voir tous les produits
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredProducts.slice(0, 8).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-primary-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Restez informé de nos nouveautés
                    </h2>
                    <p className="text-xl mb-8 text-white/90">
                        Inscrivez-vous à notre newsletter et recevez 10% de
                        réduction sur votre première commande
                    </p>
                    <div className="max-w-md mx-auto flex gap-2">
                        <input
                            type="email"
                            placeholder="Votre adresse email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                        />
                        <Button size="lg" color="default">
                            S'inscrire
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
