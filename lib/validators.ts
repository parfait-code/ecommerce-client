// lib/validators.ts
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export const registerSchema = z.object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

export const addressSchema = z.object({
    street: z.string().min(5, 'L\'adresse doit contenir au moins 5 caractères'),
    city: z.string().min(2, 'La ville doit contenir au moins 2 caractères'),
    state: z.string().min(2, 'La région doit contenir au moins 2 caractères'),
    postalCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
    country: z.string().min(2, 'Le pays doit contenir au moins 2 caractères'),
});

export const checkoutSchema = z.object({
    email: z.string().email('Email invalide'),
    shippingAddress: addressSchema,
    paymentMethod: z.enum(['card', 'paypal', 'bank_transfer']),
});

