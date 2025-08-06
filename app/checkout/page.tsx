// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Radio,
    RadioGroup,
    Checkbox,
    Divider,
    Breadcrumbs,
    BreadcrumbItem,
    Progress,
    Image,
    Chip,
} from "@heroui/react";
import {
    ShoppingCart,
    CreditCard,
    Truck,
    Shield,
    ChevronRight,
    Minus,
    Plus,
    Trash2,
    Info,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
    removeFromCart,
    updateQuantity,
    clearCart,
} from "@/store/slices/cartSlice";
import NavbarComponent from "@/components/layout/Navbar";
import { SHIPPING_THRESHOLD, TAX_RATE } from "@/lib/constants";

const checkoutSchema = z.object({
    // Informations personnelles
    email: z.string().email("Email invalide"),
    firstName: z.string().min(2, "Prénom requis"),
    lastName: z.string().min(2, "Nom requis"),
    phone: z.string().min(10, "Numéro de téléphone invalide"),

    // Adresse de livraison
    address: z.string().min(5, "Adresse requise"),
    city: z.string().min(2, "Ville requise"),
    postalCode: z.string().regex(/^\d{5}$/, "Code postal invalide"),
    country: z.string().min(2, "Pays requis"),

    // Méthode de paiement
    paymentMethod: z.enum(["card", "paypal", "bank_transfer"]),

    // Conditions
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: "Vous devez accepter les conditions générales de vente",
    }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { items, totalAmount } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.auth);

    const [currentStep, setCurrentStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: user?.email || "",
            paymentMethod: "card",
            country: "France",
            acceptTerms: false,
        },
    });

    const paymentMethod = watch("paymentMethod");

    // Calculs
    const subtotal = totalAmount;
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : 4.99;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    const steps = [
        { number: 1, title: "Panier" },
        { number: 2, title: "Livraison" },
        { number: 3, title: "Paiement" },
        { number: 4, title: "Confirmation" },
    ];

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity === 0) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const onSubmit = async (data: CheckoutFormData) => {
        setIsProcessing(true);

        // Simuler le traitement de la commande
        setTimeout(() => {
            console.log("Commande:", data);
            dispatch(clearCart());
            setCurrentStep(4);
            setIsProcessing(false);
        }, 2000);
    };

    if (items.length === 0 && currentStep !== 4) {
        return (
            <div>
                <NavbarComponent />
                <div className="container mx-auto px-4 py-16 text-center">
                    <ShoppingCart
                        size={64}
                        className="mx-auto mb-4 text-gray-300"
                    />
                    <h1 className="text-2xl font-bold mb-4">
                        Votre panier est vide
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Ajoutez des produits à votre panier pour continuer
                    </p>
                    <Button
                        color="primary"
                        size="lg"
                        onPress={() => router.push("/products")}
                    >
                        Découvrir nos produits
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <NavbarComponent />

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs className="mb-6">
                    <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                    <BreadcrumbItem href="/cart">Panier</BreadcrumbItem>
                    <BreadcrumbItem>Commande</BreadcrumbItem>
                </Breadcrumbs>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between max-w-2xl mx-auto">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className="flex items-center"
                            >
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                      ${
                          currentStep >= step.number
                              ? "bg-primary text-white"
                              : "bg-gray-200 text-gray-600"
                      }`}
                                    >
                                        {currentStep > step.number
                                            ? "✓"
                                            : step.number}
                                    </div>
                                    <span className="text-sm mt-2">
                                        {step.title}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <ChevronRight
                                        className={`mx-4 ${
                                            currentStep > step.number
                                                ? "text-primary"
                                                : "text-gray-300"
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Step 1: Cart Review */}
                            {currentStep === 1 && (
                                <Card>
                                    <CardHeader>
                                        <h2 className="text-xl font-semibold">
                                            Récapitulatif du panier
                                        </h2>
                                    </CardHeader>
                                    <CardBody className="space-y-4">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-4 p-4 border rounded-lg"
                                            >
                                                <Image
                                                    alt={item.name}
                                                    className="w-24 h-24 object-cover rounded"
                                                    src={item.image}
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-primary font-bold">
                                                        {item.price.toFixed(2)}{" "}
                                                        €
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="flat"
                                                            onPress={() =>
                                                                handleQuantityChange(
                                                                    item.id,
                                                                    item.quantity -
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            <Minus size={16} />
                                                        </Button>
                                                        <span className="font-medium px-3">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="flat"
                                                            onPress={() =>
                                                                handleQuantityChange(
                                                                    item.id,
                                                                    item.quantity +
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            <Plus size={16} />
                                                        </Button>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            color="danger"
                                                            variant="light"
                                                            className="ml-auto"
                                                            onPress={() =>
                                                                dispatch(
                                                                    removeFromCart(
                                                                        item.id
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toFixed(2)}{" "}
                                                        €
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </CardBody>
                                </Card>
                            )}

                            {/* Step 2: Shipping Information */}
                            {currentStep === 2 && (
                                <Card>
                                    <CardHeader>
                                        <h2 className="text-xl font-semibold">
                                            Informations de livraison
                                        </h2>
                                    </CardHeader>
                                    <CardBody className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                {...register("firstName")}
                                                label="Prénom"
                                                placeholder="Jean"
                                                errorMessage={
                                                    errors.firstName?.message
                                                }
                                                isInvalid={!!errors.firstName}
                                            />
                                            <Input
                                                {...register("lastName")}
                                                label="Nom"
                                                placeholder="Dupont"
                                                errorMessage={
                                                    errors.lastName?.message
                                                }
                                                isInvalid={!!errors.lastName}
                                            />
                                        </div>
                                        <Input
                                            {...register("email")}
                                            type="email"
                                            label="Email"
                                            placeholder="jean.dupont@email.com"
                                            errorMessage={errors.email?.message}
                                            isInvalid={!!errors.email}
                                        />
                                        <Input
                                            {...register("phone")}
                                            type="tel"
                                            label="Téléphone"
                                            placeholder="06 12 34 56 78"
                                            errorMessage={errors.phone?.message}
                                            isInvalid={!!errors.phone}
                                        />
                                        <Divider className="my-4" />
                                        <Input
                                            {...register("address")}
                                            label="Adresse"
                                            placeholder="123 rue de la Paix"
                                            errorMessage={
                                                errors.address?.message
                                            }
                                            isInvalid={!!errors.address}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <Input
                                                {...register("city")}
                                                label="Ville"
                                                placeholder="Paris"
                                                errorMessage={
                                                    errors.city?.message
                                                }
                                                isInvalid={!!errors.city}
                                            />
                                            <Input
                                                {...register("postalCode")}
                                                label="Code postal"
                                                placeholder="75001"
                                                errorMessage={
                                                    errors.postalCode?.message
                                                }
                                                isInvalid={!!errors.postalCode}
                                            />
                                            <Input
                                                {...register("country")}
                                                label="Pays"
                                                placeholder="France"
                                                errorMessage={
                                                    errors.country?.message
                                                }
                                                isInvalid={!!errors.country}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            )}

                            {/* Step 3: Payment Method */}
                            {currentStep === 3 && (
                                <Card>
                                    <CardHeader>
                                        <h2 className="text-xl font-semibold">
                                            Méthode de paiement
                                        </h2>
                                    </CardHeader>
                                    <CardBody>
                                        <RadioGroup
                                            value={paymentMethod}
                                            onValueChange={(value) =>
                                                setValue(
                                                    "paymentMethod",
                                                    value as any
                                                )
                                            }
                                        >
                                            <Radio value="card">
                                                <div className="flex items-center gap-2">
                                                    <CreditCard size={20} />
                                                    <span>Carte bancaire</span>
                                                </div>
                                            </Radio>
                                            <Radio value="paypal">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-blue-600">
                                                        PayPal
                                                    </span>
                                                </div>
                                            </Radio>
                                            <Radio value="bank_transfer">
                                                <div className="flex items-center gap-2">
                                                    <span>
                                                        Virement bancaire
                                                    </span>
                                                </div>
                                            </Radio>
                                        </RadioGroup>

                                        {paymentMethod === "card" && (
                                            <div className="mt-6 space-y-4">
                                                <Input
                                                    label="Numéro de carte"
                                                    placeholder="1234 5678 9012 3456"
                                                    startContent={
                                                        <CreditCard size={20} />
                                                    }
                                                />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Input
                                                        label="Date d'expiration"
                                                        placeholder="MM/AA"
                                                    />
                                                    <Input
                                                        label="CVV"
                                                        placeholder="123"
                                                        type="password"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <Divider className="my-6" />

                                        <Checkbox
                                            {...register("acceptTerms")}
                                            isInvalid={!!errors.acceptTerms}
                                        >
                                            J'accepte les conditions générales
                                            de vente
                                        </Checkbox>
                                        {errors.acceptTerms && (
                                            <p className="text-danger text-sm mt-1">
                                                {errors.acceptTerms.message}
                                            </p>
                                        )}
                                    </CardBody>
                                </Card>
                            )}

                            {/* Step 4: Confirmation */}
                            {currentStep === 4 && (
                                <Card>
                                    <CardBody className="text-center py-12">
                                        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Shield
                                                size={40}
                                                className="text-success"
                                            />
                                        </div>
                                        <h2 className="text-2xl font-bold mb-2">
                                            Commande confirmée !
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                                            Merci pour votre commande. Vous
                                            recevrez un email de confirmation
                                            dans quelques instants.
                                        </p>
                                        <div className="space-y-2">
                                            <Button
                                                color="primary"
                                                size="lg"
                                                onPress={() =>
                                                    router.push("/orders")
                                                }
                                            >
                                                Voir mes commandes
                                            </Button>
                                            <Button
                                                variant="light"
                                                size="lg"
                                                onPress={() => router.push("/")}
                                            >
                                                Retour à l'accueil
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-4">
                                <CardHeader>
                                    <h3 className="text-lg font-semibold">
                                        Résumé de la commande
                                    </h3>
                                </CardHeader>
                                <CardBody>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span>Sous-total</span>
                                            <span>{subtotal.toFixed(2)} €</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Livraison</span>
                                            <span
                                                className={
                                                    shipping === 0
                                                        ? "text-success"
                                                        : ""
                                                }
                                            >
                                                {shipping === 0
                                                    ? "Gratuite"
                                                    : `${shipping.toFixed(2)} €`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>TVA (20%)</span>
                                            <span>{tax.toFixed(2)} €</span>
                                        </div>
                                        <Divider />
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span className="text-primary">
                                                {total.toFixed(2)} €
                                            </span>
                                        </div>
                                    </div>

                                    {shipping > 0 && (
                                        <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                                            <div className="flex items-start gap-2">
                                                <Info
                                                    size={16}
                                                    className="text-primary mt-0.5"
                                                />
                                                <p className="text-sm">
                                                    Ajoutez{" "}
                                                    {(
                                                        SHIPPING_THRESHOLD -
                                                        subtotal
                                                    ).toFixed(2)}{" "}
                                                    € pour bénéficier de la
                                                    livraison gratuite
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <Divider className="my-4" />

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Truck size={16} />
                                            <span>
                                                Livraison en 2-3 jours ouvrés
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Shield size={16} />
                                            <span>Paiement 100% sécurisé</span>
                                        </div>
                                    </div>

                                    {currentStep < 4 && (
                                        <>
                                            <Divider className="my-4" />
                                            <div className="space-y-2">
                                                {currentStep < 3 && (
                                                    <Button
                                                        fullWidth
                                                        color="primary"
                                                        size="lg"
                                                        onPress={() =>
                                                            setCurrentStep(
                                                                currentStep + 1
                                                            )
                                                        }
                                                        isDisabled={
                                                            currentStep === 1 &&
                                                            items.length === 0
                                                        }
                                                    >
                                                        Continuer
                                                    </Button>
                                                )}
                                                {currentStep === 3 && (
                                                    <Button
                                                        fullWidth
                                                        color="primary"
                                                        size="lg"
                                                        type="submit"
                                                        isLoading={isProcessing}
                                                    >
                                                        Confirmer la commande
                                                    </Button>
                                                )}
                                                {currentStep > 1 && (
                                                    <Button
                                                        fullWidth
                                                        variant="light"
                                                        onPress={() =>
                                                            setCurrentStep(
                                                                currentStep - 1
                                                            )
                                                        }
                                                    >
                                                        Retour
                                                    </Button>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
