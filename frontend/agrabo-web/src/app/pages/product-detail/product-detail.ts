import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [AsyncPipe, DecimalPipe],
  template: `
    <section class="section-band">
      <div class="container">
        @if (product$ | async; as product) {
          <div class="breadcrumb-line mb-3">Home <i class="bi bi-chevron-right"></i> Shop <i class="bi bi-chevron-right"></i> <span>{{ product.name }} {{ product.size }}</span></div>
          <div class="detail-grid">
            <div class="col-lg-6">
              <div class="gallery-layout">
                <div class="thumb-stack desktop-only">
                  @for (thumb of thumbs; track thumb) {
                    <button type="button"><img [src]="thumb" alt=""></button>
                  }
                </div>
                <div class="detail-visual">
                  <img [src]="detailImage(product.imageUrl)" [alt]="product.name + ' ' + product.size">
                  <div class="pure-badge"><strong>100%</strong><span>Pure Honey</span></div>
                </div>
              </div>
              <div class="detail-mini-trust agrabo-card">
                <div><i class="bi bi-droplet-fill"></i><strong>100% Pure</strong><span>No additives</span></div>
                <div><i class="bi bi-geo-alt-fill"></i><strong>Locally Sourced</strong><span>Across Uganda</span></div>
                <div><i class="bi bi-person-hearts"></i><strong>Farmer Supported</strong><span>Empowering communities</span></div>
                <div><i class="bi bi-flower1"></i><strong>Natural Goodness</strong><span>Raw & unprocessed</span></div>
              </div>
            </div>

            <div>
              <h1 class="page-title mb-2">{{ product.name }} {{ product.size }}</h1>
              <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                <span class="star-row">★★★★★</span>
                <span class="small">4.8 (128 reviews)</span>
                <span class="small text-muted">| 100+ bought this month</span>
              </div>
              @if (product.price > 0) {
                <p class="price-strong mb-2">UGX {{ product.price | number }}</p>
              } @else {
                <p class="price-strong mb-2">Contact for Pricing</p>
              }
              <p class="text-muted">{{ product.description }} Pure goodness you can taste, quality you can trust.</p>
              <ul class="product-benefits">
                <li>100% Pure & Natural - No additives, no preservatives</li>
                <li>Locally sourced from trusted Ugandan beekeepers</li>
                <li>Rich in antioxidants & natural enzymes</li>
                <li>Perfect for daily wellness & healthy living</li>
              </ul>

              <div class="purchase-box agrabo-card">
                <div class="row g-3">
                  <div class="col-sm-5">
                    <label class="form-label">Size</label>
                    <div class="size-pills">
                      <button class="active" type="button">{{ product.size }}</button>
                      <button type="button">1kg</button>
                    </div>
                  </div>
                  <div class="col-sm-5">
                    <label class="form-label">Quantity</label>
                    <div class="quantity-control">
                      <button type="button" (click)="decrement()">−</button>
                      <span>{{ quantity() }}</span>
                      <button type="button" (click)="increment()">+</button>
                    </div>
                  </div>
                </div>
                <div class="action-row mt-3">
                  <a class="btn btn-outline-success btn-lg" href="https://wa.me/256706506319" target="_blank" rel="noopener"><i class="bi bi-whatsapp me-2"></i>Order on WhatsApp</a>
                  <button class="btn btn-honey btn-lg" type="button" (click)="cart.add(product, quantity())"><i class="bi bi-cart me-2"></i>Add to Cart</button>
                </div>
              </div>

              <div class="delivery-line mt-3"><i class="bi bi-truck"></i><div><strong>Fast delivery across Uganda</strong><span>Orders are delivered within 1 - 3 working days.</span></div></div>
            </div>
          </div>

          <div class="health-row agrabo-card mt-4">
            @for (item of healthBenefits; track item.title) {
              <div class="icon-feature"><i [class]="item.icon"></i><div><strong>{{ item.title }}</strong><span>{{ item.text }}</span></div></div>
            }
          </div>

          <div class="related-row mt-4">
            <div class="reviews agrabo-card">
              <h2>Customer Reviews</h2>
              <div class="review-score">4.8</div>
              <div class="star-row">★★★★★</div>
              <p class="small text-muted">(128 reviews)</p>
              <button class="btn btn-outline-dark btn-sm">Write a Review</button>
            </div>
            <div class="also-like agrabo-card">
              <h2>You May Also Like</h2>
              <div class="suggestions">
                @for (item of suggestions; track item.name) {
                  <div>
                    <img [src]="item.image" [alt]="item.name">
                    <strong>{{ item.name }}</strong>
                    <span class="star-row">★★★★★</span>
                    <small>{{ item.price }}</small>
                  </div>
                }
              </div>
            </div>
          </div>
        } @else {
          <div class="alert alert-warning">Product not found.</div>
        }
      </div>
    </section>
  `,
  styles: [`
    .detail-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.95fr;
      gap: 38px;
      align-items: start;
    }

    .gallery-layout {
      display: grid;
      grid-template-columns: 70px minmax(0, 1fr);
      gap: 14px;
    }

    .thumb-stack {
      display: grid;
      gap: 10px;
    }

    .thumb-stack button {
      border: 1px solid var(--agrabo-line);
      border-radius: 8px;
      background: rgba(255, 252, 246, 0.9);
      padding: 6px;
    }

    .thumb-stack img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 6px;
    }

    .detail-visual {
      min-height: 410px;
      display: grid;
      place-items: center;
      position: relative;
      background: linear-gradient(135deg, #fffdf6, #fff3d8);
      border: 1px solid var(--agrabo-line);
      border-radius: 10px;
      text-align: center;
      overflow: hidden;
    }

    .detail-visual img {
      width: min(82%, 440px);
      max-height: 370px;
      object-fit: contain;
      filter: drop-shadow(0 24px 18px rgba(91, 37, 15, 0.15));
    }

    .pure-badge {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 82px;
      height: 82px;
      display: grid;
      place-items: center;
      color: var(--agrabo-brown);
      border: 1px solid var(--agrabo-line);
      border-radius: 50%;
      background: rgba(255, 250, 239, 0.85);
      text-transform: uppercase;
      font-size: 0.68rem;
    }

    .pure-badge strong,
    .pure-badge span {
      display: block;
    }

    .product-benefits {
      list-style: none;
      padding: 0;
      margin: 0 0 16px;
    }

    .product-benefits li {
      margin-bottom: 9px;
      color: #473832;
      font-size: 0.9rem;
    }

    .product-benefits li::before {
      content: "✓";
      color: var(--agrabo-amber);
      border: 1px solid var(--agrabo-amber);
      border-radius: 50%;
      margin-right: 8px;
      padding: 0 3px;
      font-size: 0.7rem;
      font-weight: 900;
    }

    .purchase-box {
      padding: 18px;
      background: rgba(255, 247, 231, 0.78);
    }

    .size-pills {
      display: flex;
      gap: 8px;
    }

    .size-pills button,
    .quantity-control button {
      min-width: 66px;
      border: 1px solid var(--agrabo-line);
      border-radius: 8px;
      background: #fff;
      color: var(--agrabo-brown);
      font-weight: 800;
      padding: 8px 12px;
    }

    .size-pills .active {
      border-color: var(--agrabo-amber);
      box-shadow: inset 0 0 0 1px var(--agrabo-amber);
    }

    .quantity-control {
      display: inline-flex;
      align-items: center;
      overflow: hidden;
      border: 1px solid var(--agrabo-line);
      border-radius: 8px;
      background: #fff;
    }

    .quantity-control button {
      min-width: 42px;
      border: 0;
      border-radius: 0;
    }

    .quantity-control span {
      min-width: 52px;
      text-align: center;
      font-weight: 900;
    }

    .action-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    .delivery-line {
      display: flex;
      gap: 12px;
      align-items: center;
      color: var(--agrabo-brown);
    }

    .delivery-line i {
      color: var(--agrabo-amber);
      font-size: 1.7rem;
    }

    .delivery-line span {
      color: #574741;
      display: block;
      font-size: 0.8rem;
    }

    .detail-mini-trust,
    .health-row {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      padding: 14px 18px;
      margin-top: 12px;
    }

    .detail-mini-trust div {
      display: grid;
      grid-template-columns: 32px minmax(0, 1fr);
      gap: 8px;
      align-items: center;
    }

    .detail-mini-trust i {
      color: var(--agrabo-olive);
      font-size: 1.4rem;
    }

    .detail-mini-trust strong,
    .detail-mini-trust span {
      display: block;
      font-size: 0.68rem;
    }

    .related-row {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      gap: 18px;
    }

    .reviews,
    .also-like {
      padding: 20px;
    }

    .reviews h2,
    .also-like h2 {
      color: var(--agrabo-brown);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.1rem;
      font-weight: 900;
    }

    .review-score {
      color: var(--agrabo-deep);
      font-size: 3rem;
      font-weight: 900;
      line-height: 1;
    }

    .suggestions {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
    }

    .suggestions > div {
      border: 1px solid var(--agrabo-line);
      border-radius: 8px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.68);
    }

    .suggestions img {
      width: 100%;
      height: 110px;
      object-fit: contain;
    }

    .suggestions strong,
    .suggestions small {
      display: block;
      color: var(--agrabo-brown);
    }

    @media (max-width: 992px) {
      .detail-grid,
      .gallery-layout,
      .related-row,
      .action-row,
      .detail-mini-trust,
      .health-row {
        grid-template-columns: 1fr;
      }

      .suggestions {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `]
})
export class ProductDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  readonly cart = inject(CartService);
  readonly quantity = signal(1);
  readonly thumbs = [
    'assets/products/deli-honey-500g.png',
    'assets/products/deli-honey-250g.png',
    'assets/backgrounds/4.png',
    'assets/backgrounds/7.png',
    'assets/backgrounds/3.png'
  ];
  readonly healthBenefits = [
    { icon: 'bi bi-lightning-charge-fill', title: 'Energy Booster', text: 'Natural sugars provide a quick and healthy energy lift.' },
    { icon: 'bi bi-shield-fill-check', title: 'Immune Support', text: 'Rich in antioxidants that help strengthen immunity.' },
    { icon: 'bi bi-heart-pulse-fill', title: 'Digestive Aid', text: 'Supports healthy digestion and soothes the gut.' },
    { icon: 'bi bi-droplet-fill', title: 'Antibacterial Properties', text: 'Helps support overall wellness.' }
  ];
  readonly suggestions = [
    { name: 'Deli Honey 1kg', image: 'assets/products/deli-honey-1kg.png', price: 'UGX 55,000' },
    { name: 'Deli Honey 5L', image: 'assets/products/deli-honey-bulk.png', price: 'UGX 250,000' },
    { name: 'Deli Honey 20L', image: 'assets/products/deli-honey-bulk.png', price: 'UGX 850,000' },
    { name: 'Beeswax Blocks', image: 'assets/backgrounds/7.png', price: 'UGX 15,000' }
  ];

  readonly product$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => this.productService.getProduct(id))
  );

  increment(): void {
    this.quantity.update((value) => value + 1);
  }

  decrement(): void {
    this.quantity.update((value) => Math.max(1, value - 1));
  }

  detailImage(imageUrl?: string | null): string {
    if (imageUrl?.includes('500g')) {
      return 'assets/products/product-detail-500g.png';
    }

    if (imageUrl) {
      return imageUrl;
    }
    return 'assets/products/product-detail-500g.png';
  }
}
