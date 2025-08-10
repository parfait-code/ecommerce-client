// src/data/mockData.ts

import { Product, Category, Collection } from '../types';

export const categories: Category[] = [
    {
        id: '1',
        name: 'KNITWEAR',
        slug: 'knitwear',
        image: '/images/knitwear.jpg',
        description: 'Premium merino wool and cashmere pieces'
    },
    {
        id: '2',
        name: 'TROUSERS',
        slug: 'trousers',
        image: '/images/trousers.jpg',
        description: 'Tailored and casual trousers'
    },
    {
        id: '3',
        name: 'T-SHIRTS & VESTS',
        slug: 't-shirts-vests',
        image: '/images/tshirts.jpg',
        description: 'Essential cotton basics'
    },
    {
        id: '4',
        name: 'SHIRTS',
        slug: 'shirts',
        image: '/images/shirts.jpg',
        description: 'Classic and contemporary shirts'
    }
];

export const products: Product[] = [
    {
        id: '1',
        name: 'SLIM MERINO WOOL MOCK-NECK JUMPER',
        price: 99,
        category: 'knitwear',
        subcategory: 'jumpers',
        images: [
            '/images/merino-jumper-1.jpg',
            '/images/merino-jumper-2.jpg',
            '/images/merino-jumper-3.jpg'
        ],
        description: 'A refined mock-neck jumper crafted from premium merino wool. Features a slim fit with ribbed hem and cuffs for a contemporary silhouette.',
        sizes: [
            { value: 'XS', available: true },
            { value: 'S', available: true },
            { value: 'M', available: false },
            { value: 'L', available: true },
            { value: 'XL', available: true }
        ],
        colors: [
            { name: 'Dark Green', hex: '#1a3d2e', available: true },
            { name: 'Navy', hex: '#1a2332', available: true },
            { name: 'Black', hex: '#000000', available: true },
            { name: 'Grey', hex: '#4a4a4a', available: true }
        ],
        inStock: true,
        featured: true,
        material: '100% Merino Wool',
        careInstructions: [
            'Machine wash at 30°C',
            'Do not bleach',
            'Reshape while damp',
            'Dry flat'
        ]
    },
    {
        id: '2',
        name: 'RELAXED-FIT WOOL TROUSERS',
        price: 145,
        category: 'trousers',
        subcategory: 'wool-trousers',
        images: [
            '/images/wool-trousers-1.jpg',
            '/images/wool-trousers-2.jpg'
        ],
        description: 'Relaxed-fit trousers with a comfortable rise. Made from a wool blend for structure and comfort.',
        sizes: [
            { value: '28', available: true },
            { value: '30', available: true },
            { value: '32', available: true },
            { value: '34', available: true },
            { value: '36', available: false }
        ],
        colors: [
            { name: 'Charcoal', hex: '#2b2b2b', available: true },
            { name: 'Navy', hex: '#1a2332', available: true }
        ],
        inStock: true,
        material: '70% Wool, 30% Polyester',
        careInstructions: [
            'Dry clean only',
            'Iron at low temperature'
        ]
    },
    {
        id: '3',
        name: 'STRIPED LONG-SLEEVE T-SHIRT',
        price: 49,
        category: 't-shirts-vests',
        subcategory: 'long-sleeve',
        images: [
            '/images/striped-tee-1.jpg',
            '/images/striped-tee-2.jpg'
        ],
        description: 'Classic Breton-inspired striped t-shirt in soft organic cotton.',
        sizes: [
            { value: 'XS', available: true },
            { value: 'S', available: true },
            { value: 'M', available: true },
            { value: 'L', available: true },
            { value: 'XL', available: true }
        ],
        colors: [
            { name: 'Navy/White', hex: '#1a2332', available: true },
            { name: 'Black/White', hex: '#000000', available: true }
        ],
        inStock: true,
        material: '100% Organic Cotton',
        careInstructions: [
            'Machine wash at 40°C',
            'Do not bleach',
            'Tumble dry low'
        ]
    },
    {
        id: '4',
        name: 'COTTON POPLIN SHIRT',
        price: 79,
        category: 'shirts',
        subcategory: 'casual-shirts',
        images: [
            '/images/poplin-shirt-1.jpg',
            '/images/poplin-shirt-2.jpg'
        ],
        description: 'A versatile shirt in crisp cotton poplin with a regular fit.',
        sizes: [
            { value: 'S', available: true },
            { value: 'M', available: true },
            { value: 'L', available: true },
            { value: 'XL', available: false }
        ],
        colors: [
            { name: 'White', hex: '#ffffff', available: true },
            { name: 'Light Blue', hex: '#a8c8ec', available: true }
        ],
        inStock: true,
        material: '100% Cotton',
        careInstructions: [
            'Machine wash at 40°C',
            'Iron at medium temperature'
        ]
    },
    {
        id: '5',
        name: 'CASHMERE CREW-NECK JUMPER',
        price: 225,
        category: 'knitwear',
        subcategory: 'jumpers',
        images: [
            '/images/cashmere-jumper-1.jpg',
            '/images/cashmere-jumper-2.jpg'
        ],
        description: 'Luxurious cashmere jumper with a classic crew neck design.',
        sizes: [
            { value: 'XS', available: false },
            { value: 'S', available: true },
            { value: 'M', available: true },
            { value: 'L', available: true },
            { value: 'XL', available: true }
        ],
        colors: [
            { name: 'Camel', hex: '#c19a6b', available: true },
            { name: 'Grey', hex: '#808080', available: true },
            { name: 'Navy', hex: '#1a2332', available: true }
        ],
        inStock: true,
        featured: true,
        material: '100% Cashmere',
        careInstructions: [
            'Hand wash only',
            'Do not wring',
            'Dry flat',
            'Store folded'
        ]
    },
    {
        id: '6',
        name: 'WIDE-LEG DENIM JEANS',
        price: 89,
        category: 'trousers',
        subcategory: 'jeans',
        images: [
            '/images/wide-jeans-1.jpg',
            '/images/wide-jeans-2.jpg'
        ],
        description: 'Contemporary wide-leg jeans in raw denim.',
        sizes: [
            { value: '28', available: true },
            { value: '30', available: true },
            { value: '32', available: true },
            { value: '34', available: true },
            { value: '36', available: true }
        ],
        colors: [
            { name: 'Indigo', hex: '#3a4e7a', available: true }
        ],
        inStock: true,
        material: '100% Cotton',
        careInstructions: [
            'Machine wash at 30°C',
            'Wash inside out'
        ]
    }
];

export const collections: Collection[] = [
    {
        id: '1',
        name: 'Autumn Essentials',
        season: 'Fall',
        year: 2023,
        image: '/images/autumn-collection.jpg',
        products: ['1', '2', '5'] // Product IDs
    },
    {
        id: '2',
        name: 'Spring Casual',
        season: 'Spring',
        year: 2023,
        image: '/images/spring-collection.jpg',
        products: ['3', '4', '6'] // Product IDs
    }
];
