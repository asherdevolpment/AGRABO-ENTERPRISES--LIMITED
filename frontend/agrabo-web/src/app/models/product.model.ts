export interface Product {
  id: number;
  name: string;
  size: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string | null;
  isActive?: boolean;
}
