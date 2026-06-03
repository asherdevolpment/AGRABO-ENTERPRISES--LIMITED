import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [AsyncPipe, DecimalPipe, RouterLink],
  template: `
    <section class="product-page">
      <div class="product-frame">
        @if (product$ | async; as product) {
          <nav class="breadcrumb-line" aria-label="Breadcrumb">
            <a routerLink="/shop">Home</a>
            <i class="bi bi-chevron-right"></i>
            <a routerLink="/shop">Shop</a>
            <i class="bi bi-chevron-right"></i>
            <span>{{ product.name }} {{ product.size }}</span>
          </nav>

          <section class="product-layout">
            <div class="visual-card">
              <img src="assets/PRODUCT TEMLATE .png" [alt]="product.name + ' ' + product.size">
            </div>

            <div class="info-card">
              <div class="product-copy">
                <span class="hero-pill"><i class="bi bi-droplet-fill"></i>100% Natural Deli Honey</span>
                <h1>{{ product.name }}</h1>
                <strong class="size-label">{{ product.size }}</strong>
                <p>{{ product.description || 'Pure, natural honey for tea, breakfast, and daily use. Carefully sourced and packed to preserve natural goodness.' }}</p>

                <div class="price-row">
                  @if (product.price > 0) {
                    <strong>UGX {{ product.price | number }}</strong>
                  } @else {
                    <strong>Request pricing</strong>
                  }
                </div>

                <div class="benefit-list">
                  @for (item of productBenefits; track item.title) {
                    <div>
                      <span><i [class]="item.icon"></i></span>
                      <p>{{ item.title }}</p>
                    </div>
                  }
                </div>

                <div class="delivery-card">
                  <i class="bi bi-truck"></i>
                  <span>
                    <strong>Delivery in 24-48 hrs</strong>
                    <small>within Kampala.</small>
                  </span>
                </div>
              </div>

              <aside class="purchase-card">
                @if (product.price > 0) {
                  <label>Quantity</label>
                  <div class="quantity-control">
                    <button type="button" aria-label="Decrease quantity" (click)="decrement()">-</button>
                    <strong>{{ quantity() }}</strong>
                    <button type="button" aria-label="Increase quantity" (click)="increment()">+</button>
                  </div>

                  <a class="whatsapp-order" [href]="whatsappUrl(product)" target="_blank" rel="noopener">
                    <i class="bi bi-whatsapp"></i>Order on WhatsApp
                  </a>

                  <button class="cart-action" type="button" (click)="addToCart(product)">
                    <i class="bi bi-cart"></i>Add to cart
                  </button>
                } @else {
                  <a class="whatsapp-order" routerLink="/bulk-orders">
                    <i class="bi bi-box-seam"></i>Request bulk quote
                  </a>
                }
              </aside>
            </div>
          </section>

          <section class="recommendations">
            <h2>You may also like</h2>
            <div class="recommend-grid">
              @for (item of recommendations; track item.size) {
                <article class="recommend-card">
                  <img src="assets/PRODUCT TEMLATE .png" [alt]="item.name + ' ' + item.size">
                  <div>
                    <h3>{{ item.name }}</h3>
                    <span>{{ item.size }}</span>
                    <strong>UGX {{ item.price | number }}</strong>
                  </div>
                  <button type="button" aria-label="Add recommended product">
                    <i class="bi bi-plus"></i>
                  </button>
                </article>
              }

              <a class="bulk-recommend" routerLink="/bulk-orders">
                <span><i class="bi bi-boxes"></i></span>
                <div>
                  <strong>Need larger quantities?</strong>
                  <small>Request a bulk quote.</small>
                  <b><i class="bi bi-box-seam"></i>Bulk quote</b>
                </div>
              </a>
            </div>
          </section>
        } @else {
          <div class="not-found">
            <h1>Product not found</h1>
            <a class="primary-action" routerLink="/shop">Return to shop</a>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .product-page {
      background: #fff;
      padding: 18px 0 10px;
    }

    .product-frame {
      width: min(100% - 32px, 1440px);
      margin-inline: auto;
    }

    .breadcrumb-line {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px;
      min-height: 34px;
      color: #54504b;
      margin-bottom: 14px;
    }

    .breadcrumb-line a,
    .breadcrumb-line span {
      color: #54504b;
      font-size: 0.92rem;
      font-weight: 700;
      text-decoration: none;
    }

    .breadcrumb-line i {
      color: #7b746d;
      font-size: 0.78rem;
    }

    .product-layout {
      display: grid;
      grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
      gap: 30px;
      align-items: stretch;
      margin-bottom: 18px;
    }

    .visual-card,
    .info-card,
    .recommend-card,
    .bulk-recommend,
    .not-found {
      background: #fff;
      border: 1px solid #e6ddd3;
      border-radius: 12px;
      box-shadow: var(--agrabo-shadow-soft);
    }

    .visual-card {
      display: grid;
      place-items: center;
      min-height: 360px;
      overflow: hidden;
      padding: 24px;
      background: #fffdf8;
    }

    .visual-card img {
      width: min(100%, 390px);
      max-height: 330px;
      object-fit: contain;
      object-position: center;
    }

    .info-card {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 286px;
      gap: 24px;
      align-items: center;
      min-height: 360px;
      padding: 28px;
      background:
        linear-gradient(90deg, #fff 0%, #fffbf5 100%);
    }

    .hero-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      width: fit-content;
      color: var(--agrabo-amber);
      background: #fff0dd;
      border-radius: 999px;
      font-size: 0.76rem;
      font-weight: 900;
      padding: 7px 14px;
      margin-bottom: 12px;
    }

    .product-copy h1 {
      color: #12110f;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2rem, 3.2vw, 3rem);
      font-weight: 900;
      line-height: 0.96;
      margin: 0;
    }

    .size-label {
      display: block;
      color: var(--agrabo-amber);
      font-size: 1.05rem;
      font-weight: 900;
      margin: 2px 0 12px;
    }

    .product-copy > p {
      max-width: 430px;
      color: #4f4a45;
      font-size: 0.9rem;
      line-height: 1.48;
      margin: 0 0 18px;
    }

    .price-row {
      border-top: 1px solid #d8c8b2;
      padding-top: 18px;
      margin-bottom: 18px;
    }

    .price-row strong {
      color: #14110f;
      font-size: 1.25rem;
      font-weight: 900;
    }

    .benefit-list {
      display: grid;
      gap: 10px;
      margin-bottom: 14px;
    }

    .benefit-list div {
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr);
      align-items: center;
      gap: 14px;
      min-height: 34px;
    }

    .benefit-list span,
    .delivery-card > i {
      display: grid;
      place-items: center;
      width: 32px;
      height: 32px;
      color: var(--agrabo-green);
      background: #fff0da;
      border-radius: 999px;
      font-size: 0.95rem;
    }

    .benefit-list p {
      color: #4f4a45;
      font-size: 0.84rem;
      font-weight: 700;
      margin: 0;
    }

    .delivery-card {
      display: grid;
      grid-template-columns: 52px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      max-width: 280px;
      border: 1px solid #e6ddd3;
      border-radius: 10px;
      padding: 10px;
      background: #fff;
    }

    .delivery-card strong,
    .delivery-card small {
      display: block;
    }

    .delivery-card strong {
      color: #14110f;
      font-size: 0.9rem;
      font-weight: 900;
    }

    .delivery-card small {
      color: #4f4a45;
      font-size: 0.8rem;
      margin-top: 2px;
    }

    .purchase-card {
      align-self: center;
      background: #fff;
      border: 1px solid #e6ddd3;
      border-radius: 12px;
      display: grid;
      gap: 14px;
      padding: 18px;
    }

    .purchase-card label {
      color: #171412;
      font-size: 0.92rem;
      font-weight: 900;
    }

    .quantity-control {
      display: grid;
      grid-template-columns: 54px minmax(0, 1fr) 54px;
      min-height: 40px;
      overflow: hidden;
      border: 1px solid #dcd3c8;
      border-radius: 8px;
      background: #fff;
    }

    .quantity-control button,
    .quantity-control strong {
      display: grid;
      place-items: center;
      min-height: 40px;
    }

    .quantity-control button {
      color: #14110f;
      background: #fff;
      border: 0;
      font-size: 1.1rem;
      font-weight: 900;
    }

    .quantity-control strong {
      color: #14110f;
      border-inline: 1px solid #dcd3c8;
      font-weight: 900;
    }

    .whatsapp-order,
    .cart-action,
    .primary-action {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 42px;
      border-radius: 8px;
      font-weight: 900;
      text-decoration: none;
      width: 100%;
    }

    .whatsapp-order,
    .primary-action {
      color: #fff;
      background: var(--agrabo-green-dark);
      border: 1px solid var(--agrabo-green-dark);
    }

    .cart-action {
      color: #14110f;
      background: #fff;
      border: 1px solid var(--agrabo-amber);
    }

    .recommendations h2 {
      color: #12110f;
      font-size: 1.12rem;
      font-weight: 900;
      margin: 0 0 10px;
    }

    .recommend-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 1.4fr);
      gap: 14px;
    }

    .recommend-card {
      display: grid;
      grid-template-columns: 84px minmax(0, 1fr) 34px;
      align-items: center;
      gap: 14px;
      min-height: 86px;
      padding: 8px 10px;
    }

    .recommend-card img {
      width: 60px;
      height: 62px;
      object-fit: contain;
      background: #fff8ee;
      border-radius: 8px;
      padding: 4px;
    }

    .recommend-card h3 {
      color: #14110f;
      font-size: 0.88rem;
      font-weight: 900;
      margin: 0 0 1px;
    }

    .recommend-card span {
      display: block;
      color: var(--agrabo-amber);
      font-size: 0.78rem;
      font-weight: 900;
      margin-bottom: 10px;
    }

    .recommend-card strong {
      color: #14110f;
      font-size: 0.86rem;
      font-weight: 900;
    }

    .recommend-card button {
      display: grid;
      place-items: center;
      width: 32px;
      height: 32px;
      color: var(--agrabo-amber);
      background: #fff;
      border: 1px solid var(--agrabo-amber);
      border-radius: 8px;
    }

    .bulk-recommend {
      display: grid;
      grid-template-columns: 88px minmax(0, 1fr);
      align-items: center;
      gap: 18px;
      min-height: 86px;
      color: #14110f;
      padding: 12px 20px;
      text-decoration: none;
    }

    .bulk-recommend > span {
      display: grid;
      place-items: center;
      width: 56px;
      height: 56px;
      color: var(--agrabo-amber);
      background: #fff0da;
      border-radius: 999px;
      font-size: 1.35rem;
    }

    .bulk-recommend strong,
    .bulk-recommend small,
    .bulk-recommend b {
      display: block;
    }

    .bulk-recommend strong {
      font-size: 1rem;
      font-weight: 900;
    }

    .bulk-recommend small {
      color: #4f4a45;
      font-size: 0.84rem;
      margin: 2px 0 10px;
    }

    .bulk-recommend b {
      width: fit-content;
      color: var(--agrabo-green);
      border: 1px solid var(--agrabo-green);
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 900;
      padding: 5px 16px;
    }

    .not-found {
      padding: 36px;
      text-align: center;
    }

    @media (max-width: 1180px) {
      .product-layout,
      .info-card {
        grid-template-columns: 1fr;
      }

      .recommend-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 720px) {
      .product-frame {
        width: min(100% - 22px, 1440px);
      }

      .visual-card,
      .info-card {
        min-height: auto;
        padding: 22px;
      }

      .visual-card img {
        max-height: 330px;
      }

      .recommend-grid,
      .recommend-card,
      .bulk-recommend {
        grid-template-columns: 1fr;
      }

      .recommend-card {
        justify-items: start;
      }
    }
  `]
})
export class ProductDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);

  readonly quantity = signal(1);
  readonly product$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => this.productService.getProduct(id))
  );

  readonly productBenefits = [
    { title: 'Perfect for tea', icon: 'bi bi-cup-hot' },
    { title: 'Great with breakfast', icon: 'bi bi-basket' },
    { title: 'Ideal for daily use', icon: 'bi bi-heart' }
  ];

  readonly recommendations = [
    { name: 'Deli Honey', size: '100g', price: 5000 },
    { name: 'Deli Honey', size: '250g', price: 13000 },
    { name: 'Deli Honey', size: '1kg', price: 55000 }
  ];

  increment(): void {
    this.quantity.update((value) => value + 1);
  }

  decrement(): void {
    this.quantity.update((value) => Math.max(1, value - 1));
  }

  addToCart(product: Product): void {
    this.cart.add(product, this.quantity());
  }

  buyNow(product: Product): void {
    this.cart.add(product, this.quantity());
    this.router.navigateByUrl('/checkout');
  }

  whatsappUrl(product: Product): string {
    const text = encodeURIComponent(`Hello AGRABO, I want to order ${this.quantity()} x ${product.name} ${product.size}.`);
    return `https://api.whatsapp.com/send?phone=256706506319&text=${text}`;
  }
}
