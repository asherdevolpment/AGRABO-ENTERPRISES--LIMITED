import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, RouterLink],
  template: `
    <article class="product-card h-100">
      <h3 class="product-size">{{ product.size }}</h3>
      <div class="product-image">
        @if (product.imageUrl) {
          <img [src]="product.imageUrl" [alt]="product.name + ' ' + product.size">
        } @else {
          <div class="jar-visual">
            <span>Deli</span>
            <strong>{{ product.size }}</strong>
          </div>
        }
      </div>
      <div class="product-meta">
        @if (product.price > 0) {
          <span class="from-label">From</span>
          <div class="price-line"><span>UGX</span> {{ product.price | number }}</div>
          <button class="btn btn-sm btn-honey w-100 mt-2" type="button" (click)="add.emit(product)">Add to Cart</button>
        } @else {
          <div class="bulk-label">Contact for Pricing</div>
          <a class="btn btn-sm btn-outline-dark w-100 mt-2" routerLink="/bulk-orders">Request Quote</a>
        }
      </div>
    </article>
  `,
  styles: [`
    .product-card {
      overflow: hidden;
      border: 1px solid #f1cf99;
      border-radius: 10px;
      background: rgba(255, 252, 246, 0.88);
      box-shadow: 0 12px 24px rgba(91, 37, 15, 0.06);
      padding: 10px 10px 12px;
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    .product-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 32px rgba(91, 37, 15, 0.12);
    }

    .product-size {
      color: var(--agrabo-brown);
      font-size: 0.98rem;
      font-weight: 900;
      margin: 0 0 4px;
    }

    .product-image {
      min-height: 142px;
      display: grid;
      place-items: center;
      background: transparent;
    }

    .product-image img {
      width: 100%;
      height: 142px;
      object-fit: contain;
    }

    .jar-visual {
      width: 96px;
      height: 122px;
      display: grid;
      place-items: center;
      color: #2d1b05;
      background: linear-gradient(180deg, #fffdf4, #ffcf66);
      border: 8px solid rgba(255, 255, 255, 0.65);
      border-radius: 28px 28px 18px 18px;
      box-shadow: 0 20px 35px rgba(128, 71, 16, 0.22);
      text-align: center;
    }

    .jar-visual span,
    .jar-visual strong {
      display: block;
    }

    .product-meta {
      text-align: center;
      min-height: 74px;
    }

    .from-label {
      display: block;
      color: #6f625d;
      font-size: 0.64rem;
      text-align: left;
      margin-left: 18px;
    }

    .price-line {
      color: var(--agrabo-deep);
      font-size: 1.38rem;
      font-weight: 900;
      line-height: 1.1;
    }

    .price-line span {
      font-size: 0.8rem;
      font-weight: 600;
      margin-right: 4px;
    }

    .bulk-label {
      color: var(--agrabo-deep);
      font-weight: 700;
      padding-top: 18px;
    }
  `]
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  @Output() add = new EventEmitter<Product>();
}
