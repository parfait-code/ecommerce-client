export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    dateOfBirth?: string;
    newsletter: boolean;
    createdAt: string;
}

export interface Address {
    id: string;
    userId: string;
    type: 'billing' | 'shipping';
    isDefault: boolean;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
}

export interface Order {
    id: string;
    userId: string;
    orderNumber: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethod: string;
    createdAt: string;
    estimatedDelivery?: string;
    trackingNumber?: string;
}

export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
}

export interface UserPreferences {
    language: 'en' | 'fr' | 'es';
    currency: 'USD' | 'EUR' | 'GBP';
    emailNotifications: {
        orders: boolean;
        promotions: boolean;
        newsletter: boolean;
        productUpdates: boolean;
    };
    smsNotifications: boolean;
}