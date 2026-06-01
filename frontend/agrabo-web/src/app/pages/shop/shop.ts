import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop-page',
  imports: [AsyncPipe, DecimalPipe, RouterLink],
  template: `
    <section class="page-hero shop-hero" style="--hero-image: url('/assets/bulk_hero transparent .png')">
      <div class="container">
        <div class="page-hero-content">
          <div class="breadcrumb-line mb-2">Home <i class="bi bi-chevron-right mx-2"></i><span>Shop Honey</span></div>
          <h1 class="page-title">Shop Deli <span class="accent">Honey</span></h1>
          <p class="lead mb-4">
            100% natural, unprocessed honey from the rich forests of Uganda.
            Pure goodness you can taste, quality you can trust.
          </p>
          <div class="hero-points">
            <div><i class="bi bi-droplet"></i><strong>100% Pure</strong><span>No additives</span></div>
            <div><i class="bi bi-geo-alt"></i><strong>Locally Sourced</strong><span>From trusted beekeepers</span></div>
            <div><i class="bi bi-flower1"></i><strong>Farmer Supported</strong><span>Empowering rural families</span></div>
            <div><i class="bi bi-truck"></i><strong>Fast Delivery</strong><span>Across Uganda</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="shop-page site-page">
      <div class="container">
        <div class="shop-promo agrabo-card">
          <div><i class="bi bi-truck"></i><strong>FREE DELIVERY</strong><span>On orders over UGX 150,000</span></div>
          <div><i class="bi bi-whatsapp"></i><strong>Order on WhatsApp</strong><span>Quick &amp; easy ordering</span></div>
          <div><i class="bi bi-box-seam"></i><strong>Bulk Supply Available</strong><span>For businesses &amp; institutions</span></div>
          <div><i class="bi bi-geo-alt"></i><strong>Nationwide Delivery</strong><span>Across Uganda</span></div>
        </div>

        <div class="catalog-head">
          <div class="category-pills" aria-label="Product categories">
            <button class="active" type="button">All</button>
            <button type="button">Small Jars</button>
            <button type="button">Family Size</button>
            <button type="button">Bulk Orders</button>
          </div>
          <select class="form-select sort-select" aria-label="Sort products">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div class="shop-product-grid">
          @for (product of products$ | async; track product.id) {
            <article class="shop-card agrabo-card">
              @if ($first || !product.price) {
                <span class="product-badge">{{ $first ? 'Bestseller' : 'Most Popular' }}</span>
              }
              <a class="shop-card-image" [routerLink]="['/product', product.id]">
                <img [src]="product.imageUrl || 'assets/products/deli-honey-500g.png'" [alt]="product.name">
              </a>
              <div class="shop-card-body">
                <h3>{{ product.name }}</h3>
                <p>{{ product.price > 0 ? 'Pure & Natural' : 'Perfect for Businesses' }}</p>
                @if (product.price > 0) {
                  <strong>UGX {{ product.price | number }}</strong>
                  <div class="rating">&#9733;&#9733;&#9733;&#9733;&#9733; <span>({{ reviewCounts[$index] }})</span></div>
                  <button class="btn btn-honey btn-sm" type="button" (click)="addToCart(product)">
                    <i class="bi bi-cart3 me-2"></i>Add to Cart
                  </button>
                } @else {
                  <strong>From UGX 250,000</strong>
                  <a class="btn btn-outline-dark btn-sm" routerLink="/bulk-orders">Request a Quote</a>
                }
              </div>
            </article>
          }
        </div>

        <section class="bulk-callout agrabo-card">
          <img src="assets/products/deli-honey-bulk.png" alt="Bulk Deli Honey containers">
          <div>
            <h2>Need Honey in Bulk?</h2>
            <p>We supply businesses, institutions, hotels, schools and retailers with quality honey at competitive prices.</p>
          </div>
          <div class="bulk-actions">
            <a class="btn btn-agrabo" routerLink="/bulk-orders"><i class="bi bi-file-earmark-text me-2"></i>Request Bulk Quote</a>
            <span>Quick response within 24 hours</span>
          </div>
        </section>

        <section class="why-shop">
          <h2>Why Choose Deli Honey?</h2>
          <div class="why-shop-grid">
            <div><i class="bi bi-droplet"></i><strong>100% Pure &amp; Natural</strong><span>No additives, no preservatives. Just pure honey.</span></div>
            <div><i class="bi bi-shield-check"></i><strong>Quality Guaranteed</strong><span>Carefully tested for purity and quality.</span></div>
            <div><i class="bi bi-people"></i><strong>Supporting Communities</strong><span>Every purchase empowers local beekeepers.</span></div>
            <div><i class="bi bi-flower1"></i><strong>Sustainably Sourced</strong><span>From the best beekeeping communities in Uganda.</span></div>
          </div>
        </section>

        <section class="shop-support-grid">
          <article class="support-panel agrabo-card">
            <h2>What Our Customers Say</h2>
            <div class="mini-testimonials">
              @for (item of testimonials; track item.name) {
                <div>
                  <i class="bi bi-quote"></i>
                  <p>"{{ item.quote }}"</p>
                  <strong>- {{ item.name }}</strong>
                  <span>{{ item.location }}</span>
                </div>
              }
            </div>
          </article>

          <article class="support-panel agrabo-card">
            <h2>Frequently Asked Questions</h2>
            @for (faq of faqs; track faq) {
              <button class="faq-row" type="button">{{ faq }} <i class="bi bi-chevron-right"></i></button>
            }
            <a class="small-link" routerLink="/contact">View all FAQs <i class="bi bi-arrow-right ms-1"></i></a>
          </article>

          <article class="support-panel newsletter-panel agrabo-card">
            <h2>Stay Updated with AGRABO</h2>
            <p>Subscribe for news, offers and beekeeping insights.</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Enter your email address" aria-label="Email address">
              <button type="button">Subscribe</button>
            </div>
            <div class="newsletter-notes">
              <span><i class="bi bi-check-circle"></i>No spam</span>
              <span><i class="bi bi-check-circle"></i>Unsubscribe anytime</span>
              <span><i class="bi bi-check-circle"></i>Exclusive offers</span>
            </div>
          </article>
        </section>
      </div>
    </section>
  `,
  styles: [`
    .shop-hero {
      min-height: clamp(250px, 24vw, 330px);
      background:
        linear-gradient(90deg, rgba(255, 250, 239, 1) 0%, rgba(255, 250, 239, 0.95) 35%, rgba(255, 250, 239, 0.24) 66%, rgba(255, 250, 239, 0) 100%),
        var(--hero-image) center right / cover no-repeat;
    }

    .shop-hero .page-hero-content {
      padding: clamp(28px, 3.8vw, 44px) 0;
    }

    .hero-points {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 22px;
      max-width: 770px;
    }

    .hero-points div {
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr);
      column-gap: 10px;
      align-items: center;
      min-width: 0;
    }

    .hero-points i {
      color: var(--agrabo-amber);
      font-size: 1.55rem;
      grid-row: span 2;
    }

    .hero-points strong,
    .hero-points span {
      display: block;
    }

    .hero-points strong {
      color: var(--agrabo-deep);
      font-size: 0.82rem;
      font-weight: 900;
    }

    .hero-points span {
      color: #42342f;
      font-size: 0.7rem;
      line-height: 1.25;
    }

    .shop-page {
      padding: 0 0 14px;
    }

    .shop-promo {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      margin: 0 auto 16px;
      overflow: hidden;
    }

    .shop-promo div {
      display: grid;
      grid-template-columns: 48px minmax(0, 1fr);
      gap: 12px;
      align-items: center;
      padding: 18px 28px;
      border-right: 1px solid rgba(189, 106, 0, 0.22);
      min-width: 0;
    }

    .shop-promo div:last-child {
      border-right: 0;
    }

    .shop-promo i {
      color: var(--agrabo-green);
      font-size: 1.85rem;
      grid-row: span 2;
    }

    .shop-promo strong,
    .shop-promo span {
      display: block;
    }

    .shop-promo strong {
      color: var(--agrabo-deep);
      font-size: 0.88rem;
      font-weight: 900;
    }

    .shop-promo span {
      color: #3f312b;
      font-size: 0.78rem;
      line-height: 1.35;
    }

    .catalog-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 12px;
    }

    .category-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .category-pills button {
      min-width: 104px;
      color: var(--agrabo-brown);
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #efcf9c;
      border-radius: 7px;
      padding: 6px 18px;
      font-size: 0.78rem;
      font-weight: 900;
    }

    .category-pills button.active {
      color: #fff;
      background: linear-gradient(135deg, #c87500, #a35a00);
      border-color: #c87500;
    }

    .bulk-callout h2,
    .why-shop h2,
    .support-panel h2 {
      color: var(--agrabo-brown);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.2rem;
      font-weight: 900;
      margin: 0;
    }

    .sort-select {
      width: 170px;
      min-height: 34px;
      font-size: 0.8rem;
    }

    .shop-product-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .shop-card {
      display: grid;
      grid-template-columns: 42% minmax(0, 1fr);
      gap: 16px;
      align-items: center;
      min-width: 0;
      min-height: 118px;
      padding: 12px 16px;
      position: relative;
    }

    .product-badge {
      position: absolute;
      left: 14px;
      top: 10px;
      color: #fff;
      background: var(--agrabo-amber);
      border-radius: 5px;
      padding: 3px 10px;
      font-size: 0.64rem;
      font-weight: 900;
      z-index: 1;
    }

    .shop-card-image {
      display: grid;
      place-items: center;
      min-height: 98px;
    }

    .shop-card img {
      width: min(100%, 150px);
      max-height: 104px;
      object-fit: contain;
      filter: drop-shadow(0 12px 14px rgba(91, 37, 15, 0.15));
    }

    .shop-card h3 {
      color: var(--agrabo-deep);
      font-size: 1rem;
      font-weight: 900;
      margin: 0 0 2px;
    }

    .shop-card p {
      color: #5c4b44;
      font-size: 0.78rem;
      margin: 0 0 4px;
    }

    .shop-card strong {
      display: block;
      color: var(--agrabo-deep);
      font-size: 1.13rem;
      font-weight: 900;
      margin-bottom: 4px;
    }

    .rating {
      color: var(--agrabo-honey);
      font-size: 0.78rem;
      font-weight: 900;
      margin-bottom: 8px;
    }

    .rating span {
      color: #5d4b43;
      font-weight: 700;
    }

    .shop-card .btn {
      width: 100%;
      font-weight: 800;
    }

    .bulk-callout {
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr) auto;
      gap: 24px;
      align-items: center;
      min-height: 104px;
      margin: 14px 0 8px;
      padding: 12px 30px;
      overflow: hidden;
      background:
        linear-gradient(90deg, rgba(255, 251, 243, 0.96), rgba(255, 248, 234, 0.86)),
        linear-gradient(30deg, rgba(242, 160, 0, 0.13) 12%, transparent 12.5%, transparent 87%, rgba(242, 160, 0, 0.13) 87.5%, rgba(242, 160, 0, 0.13));
      background-size: auto, 44px 76px;
    }

    .bulk-callout img {
      width: 100%;
      max-height: 112px;
      object-fit: contain;
      align-self: end;
      filter: drop-shadow(0 14px 16px rgba(91, 37, 15, 0.16));
    }

    .bulk-callout p {
      color: #43352f;
      font-size: 0.88rem;
      margin: 6px 0 0;
      max-width: 540px;
    }

    .bulk-actions {
      display: grid;
      justify-items: center;
      gap: 8px;
    }

    .bulk-actions .btn {
      white-space: nowrap;
    }

    .bulk-actions span {
      color: #6a574f;
      font-size: 0.8rem;
    }

    .why-shop {
      text-align: center;
    }

    .why-shop-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0;
      margin-top: 8px;
    }

    .why-shop-grid div {
      display: grid;
      grid-template-columns: 52px minmax(0, 1fr);
      gap: 12px;
      align-items: center;
      text-align: left;
      padding: 12px 28px;
      border-right: 1px solid rgba(189, 106, 0, 0.24);
    }

    .why-shop-grid div:last-child {
      border-right: 0;
    }

    .why-shop-grid i {
      color: var(--agrabo-amber);
      font-size: 1.85rem;
      justify-self: center;
      grid-row: span 2;
    }

    .why-shop-grid strong,
    .why-shop-grid span {
      display: block;
    }

    .why-shop-grid strong {
      color: var(--agrabo-deep);
      font-size: 0.82rem;
      font-weight: 900;
    }

    .why-shop-grid span {
      color: #44362f;
      font-size: 0.74rem;
      line-height: 1.3;
    }

    .shop-support-grid {
      display: grid;
      grid-template-columns: 1.25fr 0.78fr 1.05fr;
      gap: 16px;
      margin-top: 12px;
    }

    .support-panel {
      min-width: 0;
      padding: 18px;
    }

    .mini-testimonials {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .mini-testimonials div {
      border: 1px solid rgba(189, 106, 0, 0.18);
      border-radius: 8px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.62);
    }

    .mini-testimonials i {
      color: var(--agrabo-amber);
      font-size: 1.2rem;
    }

    .mini-testimonials p {
      color: #44342e;
      font-size: 0.76rem;
      font-style: italic;
      line-height: 1.35;
      margin: 4px 0 8px;
    }

    .mini-testimonials strong,
    .mini-testimonials span {
      display: block;
      font-size: 0.72rem;
    }

    .mini-testimonials span {
      color: #69564d;
    }

    .faq-row {
      width: 100%;
      min-height: 34px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--agrabo-deep);
      background: rgba(255, 255, 255, 0.76);
      border: 1px solid rgba(189, 106, 0, 0.18);
      border-radius: 7px;
      margin-top: 8px;
      padding: 0 12px;
      font-size: 0.78rem;
      font-weight: 900;
    }

    .small-link {
      display: inline-block;
      color: var(--agrabo-amber);
      margin-top: 10px;
      font-size: 0.8rem;
      font-weight: 900;
      text-decoration: none;
    }

    .newsletter-panel p {
      color: #5b4941;
      font-size: 0.84rem;
      margin: 2px 0 14px;
    }

    .newsletter-form {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 140px;
      border: 1px solid rgba(189, 106, 0, 0.18);
      border-radius: 7px;
      overflow: hidden;
      background: #fff;
    }

    .newsletter-form input,
    .newsletter-form button {
      min-height: 38px;
      border: 0;
    }

    .newsletter-form input {
      padding: 0 14px;
      outline: 0;
    }

    .newsletter-form button {
      color: #fff;
      background: var(--agrabo-amber);
      font-weight: 900;
    }

    .newsletter-notes {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      color: #5a4942;
      margin-top: 16px;
      font-size: 0.74rem;
      font-weight: 700;
    }

    .newsletter-notes i {
      color: var(--agrabo-brown);
      margin-right: 6px;
    }

    @media (max-width: 1199px) {
      .shop-product-grid,
      .shop-promo,
      .why-shop-grid,
      .shop-support-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .shop-promo div:nth-child(2),
      .why-shop-grid div:nth-child(2) {
        border-right: 0;
      }

      .bulk-callout {
        grid-template-columns: 220px minmax(0, 1fr);
      }

      .bulk-actions {
        grid-column: 2;
        justify-items: start;
      }

      .newsletter-panel {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 768px) {
      .shop-hero {
        min-height: 330px;
        background-position: center bottom;
        background-size: auto 58%;
      }

      .shop-hero .page-hero-content {
        padding-bottom: 128px;
      }

      .hero-points,
      .shop-product-grid,
      .shop-promo,
      .bulk-callout,
      .why-shop-grid,
      .shop-support-grid,
      .mini-testimonials {
        grid-template-columns: 1fr;
      }

      .hero-points {
        max-width: 330px;
        gap: 10px;
      }

      .shop-promo div,
      .why-shop-grid div {
        border-right: 0;
        border-bottom: 1px solid rgba(189, 106, 0, 0.18);
      }

      .shop-promo div:last-child,
      .why-shop-grid div:last-child {
        border-bottom: 0;
      }

      .catalog-head {
        align-items: flex-start;
        flex-direction: column;
      }

      .sort-select {
        width: 100%;
      }

      .shop-card {
        grid-template-columns: 120px minmax(0, 1fr);
      }

      .bulk-callout {
        padding: 18px;
        text-align: left;
      }

      .bulk-callout img {
        max-height: 118px;
      }

      .bulk-actions {
        grid-column: auto;
        justify-items: stretch;
      }

      .newsletter-form {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .shop-card {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
  `]
})
export class ShopPage {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);
  readonly products$ = this.productService.getProducts();
  readonly reviewCounts = [128, 210, 342, 189, 156, 98];
  readonly testimonials = [
    {
      quote: "The best honey I've ever had. Pure, natural and tastes amazing.",
      name: 'Sarah N.',
      location: 'Kampala'
    },
    {
      quote: 'We buy in bulk for our hotel. Great quality and fast delivery.',
      name: 'James K.',
      location: 'Hotel Manager'
    },
    {
      quote: 'Supporting local beekeepers and getting top quality honey.',
      name: 'Grace A.',
      location: 'Entebbe'
    }
  ];
  readonly faqs = [
    'How long does delivery take?',
    'Is Deli Honey 100% pure?',
    'Do you offer bulk orders?'
  ];

  addToCart(product: Product): void {
    this.cart.add(product);
  }
}
