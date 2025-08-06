// lib/constants.ts
export const SHIPPING_THRESHOLD = 50; // Livraison gratuite à partir de 50€
export const TAX_RATE = 0.2; // TVA 20%
export const DEFAULT_PAGE_SIZE = 12;

export const ORDER_STATUS = {
  pending: 'En attente',
  processing: 'En traitement',
  shipped: 'Expédié',
  delivered: 'Livré',
  cancelled: 'Annulé',
} as const;

export const PAYMENT_METHODS = {
  card: 'Carte bancaire',
  paypal: 'PayPal',
  bank_transfer: 'Virement bancaire',
} as const;

export const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'Nom A-Z' },
  { value: 'name-desc', label: 'Nom Z-A' },
  { value: 'rating-desc', label: 'Meilleures notes' },
  { value: 'newest', label: 'Plus récents' },
] as const;