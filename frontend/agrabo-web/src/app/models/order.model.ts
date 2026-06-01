import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutCustomer {
  name: string;
  phone: string;
  location: string;
}

export interface CreateOrderPayload {
  customer: CheckoutCustomer;
  items: { productId: number; quantity: number }[];
  paymentMethod: string;
  notes?: string;
}
