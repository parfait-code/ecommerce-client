// app/categories/page.tsx
"use client";

import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Button,
    Breadcrumbs,
    BreadcrumbItem,
} from "@heroui/react";
import { ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import NavbarComponent from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";

const categories = [
    {
        id: "1",
        name: "Électronique",
        slug: "electronique",
        description: "Smartphones, ordinateurs, accessoires et plus",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400",
        productCount: 245,
        featured: true,
    },
    {
        id: "2",
        name: "Mode",
        slug: "mode",
        description: "Vêtements, chaussures et accessoires tendance",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400",
        productCount: 532,
        featured: true,
    },
    {
        id: "3",
        name: "Maison & Jardin",
        slug: "maison-jardin",
        description: "Mobilier, décoration et outils de jardinage",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400",
        productCount: 189,
        featured: true,
    },
    {
        id: "4",
        name: "Sport & Loisirs",
        slug: "sport-loisirs",
        description: "Équipements sportifs et articles de loisir",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400",
        productCount: 156,
        featured: false,
    },
    {
        id: "5",
        name: "Beauté & Santé",
        slug: "beaute-sante",
        description: "Cosmétiques, parfums et produits de santé",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400",
        productCount: 298,
        featured: false,
    },
    {
        id: "6",
        name: "Alimentation",
        slug: "alimentation",
        description: "Produits alimentaires et boissons",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400",
        productCount: 412,
        featured: false,
    },
    {
        id: "7",
        name: "Livres & Médias",
        slug: "livres-medias",
        description: "Livres, musique, films et jeux",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400",
        productCount: 789,
        featured: false,
    },
    {
        id: "8",
        name: "Jouets & Enfants",
        slug: "jouets-enfants",
        description: "Jouets, jeux et articles pour enfants",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400",
        productCount: 334,
        featured: false,
    },
    {
        id: "9",
        name: "Auto & Moto",
        slug: "auto-moto",
        description: "Pièces et accessoires pour véhicules",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400",
        productCount: 167,
        featured: false,
    },
    {
        id: "10",
        name: "Bricolage",
        slug: "bricolage",
        description: "Outils et matériaux de construction",
        image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=400",
        productCount: 223,
        featured: false,
    },
];

export default function CategoriesPage() {
    const featuredCategories = categories.filter((cat) => cat.featured);
    const otherCategories = categories.filter((cat) => !cat.featured);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavbarComponent />
            <CartDrawer />

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs className="mb-6">
                    <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                    <BreadcrumbItem>Catégories</BreadcrumbItem>
                </Breadcrumbs>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Explorez nos catégories
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Découvrez notre large sélection de produits organisés
                        par catégories pour faciliter votre shopping
                    </p>
                </div>

                {/* Featured Categories */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">
                        Catégories populaires
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCategories.map((category) => (
                            <Card
                                key={category.id}
                                isPressable
                                as={Link}
                                href={`/categories/${category.slug}`}
                                className="hover:shadow-xl transition-shadow"
                            >
                                <CardBody className="p-0">
                                    <Image
                                        alt={category.name}
                                        className="w-full h-48 object-cover"
                                        src={category.image}
                                    />
                                </CardBody>
                                <CardFooter className="flex-col items-start p-6">
                                    <div className="flex justify-between items-start w-full mb-3">
                                        <h3 className="text-xl font-semibold">
                                            {category.name}
                                        </h3>
                                        <div className="flex items-center text-gray-500">
                                            <Package
                                                size={16}
                                                className="mr-1"
                                            />
                                            <span className="text-sm">
                                                {category.productCount}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {category.description}
                                    </p>
                                    <Button
                                        color="primary"
                                        variant="flat"
                                        endContent={<ArrowRight size={16} />}
                                        className="self-start"
                                    >
                                        Explorer
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Other Categories */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">
                        Toutes les catégories
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {otherCategories.map((category) => (
                            <Card
                                key={category.id}
                                isPressable
                                as={Link}
                                href={`/categories/${category.slug}`}
                                className="hover:shadow-lg transition-shadow"
                            >
                                <CardBody className="p-0">
                                    <div className="relative">
                                        <Image
                                            alt={category.name}
                                            className="w-full h-32 object-cover"
                                            src={category.image}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="text-white font-semibold text-lg">
                                                {category.name}
                                            </h3>
                                            <p className="text-white/80 text-sm">
                                                {category.productCount} produits
                                            </p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="mt-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Vous ne trouvez pas ce que vous cherchez ?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                        Notre équipe est là pour vous aider. Contactez-nous pour
                        toute demande spécifique ou suggestion de nouveaux
                        produits.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button color="primary" size="lg">
                            Contactez-nous
                        </Button>
                        <Button color="primary" variant="bordered" size="lg">
                            Voir tous les produits
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
