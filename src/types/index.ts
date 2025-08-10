export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    subcategory?: string;
    images: string[];
    description: string;
    sizes: Size[];
    colors: Color[];
    inStock: boolean;
    featured?: boolean;
    material?: string;
    careInstructions?: string[];
}

export interface Size {
    value: string;
    available: boolean;
}

export interface Color {
    name: string;
    hex: string;
    available: boolean;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string;
    description?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

export interface Collection {
    id: string;
    name: string;
    season: string;
    year: number;
    image: string;
    products: string[]; // Product IDs
}