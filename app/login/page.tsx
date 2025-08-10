// src/app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
    loginStart,
    loginSuccess,
    loginFailure,
} from "../../src/store/slices/authSlice";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Checkbox,
    Link,
    Divider,
} from "@heroui/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { mockUserData } from "../../src/data/mockUserData";

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        dispatch(loginStart());

        // Simulate API call
        setTimeout(() => {
            if (email === "demo@cos.com" && password === "password") {
                dispatch(loginSuccess(mockUserData));
                router.push("/account");
            } else {
                dispatch(loginFailure("Invalid email or password"));
            }
        }, 1000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-col gap-3 pb-0">
                    <h1 className="text-2xl font-semibold tracking-wide">
                        Sign In
                    </h1>
                    <p className="text-sm text-gray-600">
                        Enter your email and password to access your account
                    </p>
                </CardHeader>

                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            startContent={
                                <Mail className="text-gray-400" size={18} />
                            }
                            errorMessage={errors.email}
                            isInvalid={!!errors.email}
                            variant="bordered"
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            startContent={
                                <Lock className="text-gray-400" size={18} />
                            }
                            endContent={
                                <button
                                    type="button"
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? (
                                        <EyeOff
                                            className="text-gray-400"
                                            size={18}
                                        />
                                    ) : (
                                        <Eye
                                            className="text-gray-400"
                                            size={18}
                                        />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            errorMessage={errors.password}
                            isInvalid={!!errors.password}
                            variant="bordered"
                        />

                        <div className="flex justify-between items-center">
                            <Checkbox
                                size="sm"
                                isSelected={rememberMe}
                                onValueChange={setRememberMe}
                            >
                                Remember me
                            </Checkbox>
                            <Link href="/forgot-password" size="sm">
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            color="primary"
                            size="lg"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="flex items-center gap-4 my-6">
                        <Divider className="flex-1" />
                        <p className="text-sm text-gray-500">OR</p>
                        <Divider className="flex-1" />
                    </div>

                    <div className="space-y-3">
                        <Button
                            variant="bordered"
                            className="w-full"
                            startContent={
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                            Continue with Google
                        </Button>

                        <Button
                            variant="bordered"
                            className="w-full"
                            startContent={
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            }
                        >
                            Continue with Facebook
                        </Button>
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{" "}
                        <Link href="/register" className="font-medium">
                            Sign up
                        </Link>
                    </p>

                    <p className="text-xs text-center text-gray-500 mt-4">
                        Demo credentials: demo@cos.com / password
                    </p>
                </CardBody>
            </Card>
        </div>
    );
}
