"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Checkbox,
    Link,
    Divider,
    RadioGroup,
    Radio,
} from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        password: "",
        confirmPassword: "",
        gender: "",
        newsletter: false,
        terms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.terms) {
            newErrors.terms = "You must accept the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Simulate API call
        setTimeout(() => {
            router.push("/login");
        }, 1000);
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            <Card className="w-full max-w-2xl">
                <CardHeader className="flex flex-col gap-3 pb-0">
                    <h1 className="text-2xl font-semibold tracking-wide">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-600">
                        Join COS to enjoy exclusive benefits and faster checkout
                    </p>
                </CardHeader>

                <CardBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={(e) =>
                                    handleInputChange(
                                        "firstName",
                                        e.target.value
                                    )
                                }
                                startContent={
                                    <User className="text-gray-400" size={18} />
                                }
                                errorMessage={errors.firstName}
                                isInvalid={!!errors.firstName}
                                variant="bordered"
                            />

                            <Input
                                label="Last Name"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={(e) =>
                                    handleInputChange(
                                        "lastName",
                                        e.target.value
                                    )
                                }
                                startContent={
                                    <User className="text-gray-400" size={18} />
                                }
                                errorMessage={errors.lastName}
                                isInvalid={!!errors.lastName}
                                variant="bordered"
                            />
                        </div>

                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) =>
                                handleInputChange("email", e.target.value)
                            }
                            startContent={
                                <Mail className="text-gray-400" size={18} />
                            }
                            errorMessage={errors.email}
                            isInvalid={!!errors.email}
                            variant="bordered"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                type="tel"
                                label="Phone (Optional)"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={(e) =>
                                    handleInputChange("phone", e.target.value)
                                }
                                startContent={
                                    <Phone
                                        className="text-gray-400"
                                        size={18}
                                    />
                                }
                                variant="bordered"
                            />

                            <Input
                                type="date"
                                label="Date of Birth (Optional)"
                                placeholder="MM/DD/YYYY"
                                value={formData.dateOfBirth}
                                onChange={(e) =>
                                    handleInputChange(
                                        "dateOfBirth",
                                        e.target.value
                                    )
                                }
                                startContent={
                                    <Calendar
                                        className="text-gray-400"
                                        size={18}
                                    />
                                }
                                variant="bordered"
                            />
                        </div>

                        <RadioGroup
                            label="Gender (Optional)"
                            orientation="horizontal"
                            value={formData.gender}
                            onValueChange={(value) =>
                                handleInputChange("gender", value)
                            }
                        >
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                            <Radio value="other">Other</Radio>
                            <Radio value="prefer-not">Prefer not to say</Radio>
                        </RadioGroup>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={(e) =>
                                    handleInputChange(
                                        "password",
                                        e.target.value
                                    )
                                }
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

                            <Input
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    handleInputChange(
                                        "confirmPassword",
                                        e.target.value
                                    )
                                }
                                startContent={
                                    <Lock className="text-gray-400" size={18} />
                                }
                                type={isVisible ? "text" : "password"}
                                errorMessage={errors.confirmPassword}
                                isInvalid={!!errors.confirmPassword}
                                variant="bordered"
                            />
                        </div>

                        <div className="space-y-3">
                            <Checkbox
                                size="sm"
                                isSelected={formData.newsletter}
                                onValueChange={(value) =>
                                    handleInputChange("newsletter", value)
                                }
                            >
                                I want to receive newsletters and promotional
                                emails
                            </Checkbox>

                            <Checkbox
                                size="sm"
                                isSelected={formData.terms}
                                onValueChange={(value) =>
                                    handleInputChange("terms", value)
                                }
                                isInvalid={!!errors.terms}
                            >
                                I agree to the{" "}
                                <Link href="/terms" size="sm">
                                    Terms & Conditions
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" size="sm">
                                    Privacy Policy
                                </Link>
                            </Checkbox>
                            {errors.terms && (
                                <p className="text-xs text-danger">
                                    {errors.terms}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            color="primary"
                            size="lg"
                        >
                            Create Account
                        </Button>
                    </form>

                    <Divider className="my-6" />

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium">
                            Sign in
                        </Link>
                    </p>
                </CardBody>
            </Card>
        </div>
    );
}
