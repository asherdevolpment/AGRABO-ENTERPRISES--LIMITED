import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

export const STARTER_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Deli Honey',
    size: '100g',
    description: 'Natural honey in a small starter jar.',
    price: 5000,
    stock: 40,
    imageUrl: 'assets/products/deli-honey-100g.png'
  },
  {
    id: 2,
    name: 'Deli Honey',
    size: '250g',
    description: 'Natural honey for tea, breakfast, and daily use.',
    price: 13000,
    stock: 30,
    imageUrl: 'assets/products/deli-honey-250g.png'
  },
  {
    id: 3,
    name: 'Deli Honey',
    size: '500g',
    description: 'A balanced jar size for homes and small offices.',
    price: 30000,
    stock: 25,
    imageUrl: 'assets/products/deli-honey-500g.png'
  },
  {
    id: 4,
    name: 'Deli Honey',
    size: '1kg',
    description: 'Best value pack for frequent use and resale.',
    price: 55000,
    stock: 15,
    imageUrl: 'assets/products/deli-honey-1kg.png'
  },
  {
    id: 5,
    name: 'Deli Honey',
    size: '1L',
    description: 'Premium honey bottle for regular household use.',
    price: 90000,
    stock: 12,
    imageUrl: 'assets/products/deli-honey-1l.png'
  },
  {
    id: 6,
    name: 'Deli Honey',
    size: 'Bulk (5L - 20L)',
    description: 'Bulk supply for businesses, institutions, and resellers.',
    price: 0,
    stock: 10,
    imageUrl: 'assets/products/deli-honey-bulk.png'
  },
  {
    id: 7,
    name: 'Deli Honey',
    size: '2kg',
    description: 'Large home pack for families and frequent honey use.',
    price: 105000,
    stock: 10,
    imageUrl: 'assets/PRODUCT TEMLATE .png'
  },
  {
    id: 8,
    name: 'Deli Honey',
    size: 'Gift Pack',
    description: 'A simple honey gift option for teams, guests, and events.',
    price: 45000,
    stock: 18,
    imageUrl: 'assets/PRODUCT TEMLATE .png'
  },
  {
    id: 9,
    name: 'Deli Honey',
    size: 'Carton Pack',
    description: 'Retail-ready carton supply for shops and resellers.',
    price: 0,
    stock: 8,
    imageUrl: 'assets/products/deli-honey-bulk.png'
  }
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products) => products.length >= 9 ? products : STARTER_PRODUCTS),
      catchError(() => of(STARTER_PRODUCTS))
    );
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.http
      .get<Product>(`${this.apiUrl}/${id}`)
      .pipe(catchError(() => of(STARTER_PRODUCTS.find((product) => product.id === id))));
  }
}
