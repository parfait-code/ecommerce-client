// app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Divider,
    Link,
    Checkbox,
} from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, register } from "@/store/slices/authSlice";
import NavbarComponent from "@/components/layout/Navbar";

const loginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z
        .string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const registerSchema = z
    .object({
        name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
        email: z.string().email("Email invalide"),
        password: z
            .string()
            .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
        confirmPassword: z.string(),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: "Vous devez accepter les conditions d'utilisation",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
    });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
        },
    });

    const onLoginSubmit = async (data: LoginFormData) => {
        try {
            await dispatch(login(data)).unwrap();
            router.push("/");
        } catch (error) {
            console.error("Erreur de connexion:", error);
        }
    };

    const onRegisterSubmit = async (data: RegisterFormData) => {
        try {
            const { confirmPassword, acceptTerms, ...registerData } = data;
            await dispatch(register(registerData)).unwrap();
            router.push("/");
        } catch (error) {
            console.error("Erreur d'inscription:", error);
        }
    };

    return (
        <div>
            <NavbarComponent />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="flex flex-col gap-3 pb-0">
                        <h1 className="text-2xl font-bold text-center">
                            {isLogin ? "Connexion" : "Créer un compte"}
                        </h1>
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            {isLogin
                                ? "Connectez-vous pour accéder à votre compte"
                                : "Inscrivez-vous pour commencer vos achats"}
                        </p>
                    </CardHeader>

                    <CardBody className="px-6 py-8">
                        {error && (
                            <div className="mb-4 p-3 bg-danger-50 text-danger rounded-lg">
                                {error}
                            </div>
                        )}

                        {isLogin ? (
                            <form
                                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                                className="space-y-4"
                            >
                                <Input
                                    {...loginForm.register("email")}
                                    type="email"
                                    label="Email"
                                    placeholder="votre@email.com"
                                    startContent={<Mail size={18} />}
                                    errorMessage={
                                        loginForm.formState.errors.email
                                            ?.message
                                    }
                                    isInvalid={
                                        !!loginForm.formState.errors.email
                                    }
                                />

                                <Input
                                    {...loginForm.register("password")}
                                    type={showPassword ? "text" : "password"}
                                    label="Mot de passe"
                                    placeholder="••••••••"
                                    startContent={<Lock size={18} />}
                                    endContent={
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    }
                                    errorMessage={
                                        loginForm.formState.errors.password
                                            ?.message
                                    }
                                    isInvalid={
                                        !!loginForm.formState.errors.password
                                    }
                                />

                                <div className="flex items-center justify-between">
                                    <Checkbox size="sm">
                                        Se souvenir de moi
                                    </Checkbox>
                                    <Link
                                        href="/auth/forgot-password"
                                        size="sm"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    color="primary"
                                    fullWidth
                                    size="lg"
                                    isLoading={isLoading}
                                >
                                    Se connecter
                                </Button>
                            </form>
                        ) : (
                            <form
                                onSubmit={registerForm.handleSubmit(
                                    onRegisterSubmit
                                )}
                                className="space-y-4"
                            >
                                <Input
                                    {...registerForm.register("name")}
                                    type="text"
                                    label="Nom complet"
                                    placeholder="Jean Dupont"
                                    startContent={<User size={18} />}
                                    errorMessage={
                                        registerForm.formState.errors.name
                                            ?.message
                                    }
                                    isInvalid={
                                        !!registerForm.formState.errors.name
                                    }
                                />

                                <Input
                                    {...registerForm.register("email")}
                                    type="email"
                                    label="Email"
                                    placeholder="votre@email.com"
                                    startContent={<Mail size={18} />}
                                    errorMessage={
                                        registerForm.formState.errors.email
                                            ?.message
                                    }
                                    isInvalid={
                                        !!registerForm.formState.errors.email
                                    }
                                />

                                <Input
                                    {...registerForm.register("password")}
                                    type={showPassword ? "text" : "password"}
                                    label="Mot de passe"
                                    placeholder="••••••••"
                                    startContent={<Lock size={18} />}
                                    endContent={
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    }
                                    errorMessage={
                                        registerForm.formState.errors.password
                                            ?.message
                                    }
                                    isInvalid={
                                        !!registerForm.formState.errors.password
                                    }
                                />

                                <Input
                                    {...registerForm.register(
                                        "confirmPassword"
                                    )}
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    label="Confirmer le mot de passe"
                                    placeholder="••••••••"
                                    startContent={<Lock size={18} />}
                                    endContent={
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    }
                                    errorMessage={
                                        registerForm.formState.errors
                                            .confirmPassword?.message
                                    }
                                    isInvalid={
                                        !!registerForm.formState.errors
                                            .confirmPassword
                                    }
                                />

                                <Checkbox
                                    {...registerForm.register("acceptTerms")}
                                    size="sm"
                                    isInvalid={
                                        !!registerForm.formState.errors
                                            .acceptTerms
                                    }
                                >
                                    J'accepte les{" "}
                                    <Link href="/terms" size="sm">
                                        conditions d'utilisation
                                    </Link>{" "}
                                    et la{" "}
                                    <Link href="/privacy" size="sm">
                                        politique de confidentialité
                                    </Link>
                                </Checkbox>
                                {registerForm.formState.errors.acceptTerms && (
                                    <p className="text-danger text-sm">
                                        {
                                            registerForm.formState.errors
                                                .acceptTerms.message
                                        }
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    color="primary"
                                    fullWidth
                                    size="lg"
                                    isLoading={isLoading}
                                >
                                    S'inscrire
                                </Button>
                            </form>
                        )}

                        <Divider className="my-6" />

                        <div className="space-y-3">
                            <Button
                                fullWidth
                                variant="bordered"
                                startContent={
                                    <svg
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                }
                            >
                                Continuer avec Google
                            </Button>

                            <Button
                                fullWidth
                                variant="bordered"
                                startContent={
                                    <svg
                                        className="w-5 h-5"
                                        fill="#1877F2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                }
                            >
                                Continuer avec Facebook
                            </Button>
                        </div>

                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {isLogin
                                    ? "Vous n'avez pas de compte ?"
                                    : "Vous avez déjà un compte ?"}{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    {isLogin ? "S'inscrire" : "Se connecter"}
                                </button>
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
