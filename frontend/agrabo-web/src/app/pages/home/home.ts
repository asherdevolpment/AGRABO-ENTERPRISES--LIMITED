import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home-page',
  imports: [AsyncPipe, DecimalPipe, RouterLink],
  template: `
    <section class="hero-band">
      <div class="container position-relative">
        <div class="hero-copy">
          <p class="eyebrow mb-2">Pure. Natural. Uniquely Ugandan.</p>
          <h1 class="page-title mb-3">
            Honey with Purpose.<br>
            <span>Goodness You Can Trust.</span>
          </h1>
          <p class="hero-lead mb-4">
            100% pure, unprocessed honey from the rich forests of Uganda.
            Supporting local beekeepers. Strengthening communities.
          </p>
          <div class="d-flex flex-wrap gap-3">
            <a class="btn btn-honey btn-lg" routerLink="/shop"><i class="bi bi-bag-fill me-2"></i>Shop Best Sellers</a>
            <a class="btn btn-outline-success btn-lg order-btn" href="https://wa.me/256706506319" target="_blank" rel="noopener">
              <i class="bi bi-whatsapp me-2"></i>Order on WhatsApp
            </a>
          </div>

          <div class="hero-points">
            <div><i class="bi bi-droplet"></i><strong>100% Pure</strong><span>No additives. No fillers.</span></div>
            <div><i class="bi bi-geo-alt"></i><strong>Locally Sourced</strong><span>From trusted beekeepers</span></div>
            <div><i class="bi bi-people"></i><strong>Farmer Supported</strong><span>Empowering families</span></div>
            <div><i class="bi bi-truck"></i><strong>Fast Delivery</strong><span>Across Uganda</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="home-page site-page">
      <div class="container">
        <div class="dark-trust">
          <div><i class="bi bi-droplet"></i><strong>100% Pure Honey</strong><span>No additives. Just nature.</span></div>
          <div><i class="bi bi-people"></i><strong>Trusted by Thousands</strong><span>Happy customers nationwide.</span></div>
          <div><i class="bi bi-heart"></i><strong>Supporting Beekeepers</strong><span>Stronger communities.</span></div>
          <div><i class="bi bi-truck"></i><strong>Reliable Delivery</strong><span>On time, every time.</span></div>
        </div>

        <div class="section-kicker">
          <div>
            <p class="eyebrow mb-0">Shop our favourites</p>
            <h2>Best Sellers</h2>
          </div>
          <a class="btn btn-outline-dark btn-sm" routerLink="/shop">View All Products <i class="bi bi-arrow-right ms-1"></i></a>
        </div>

        <div class="best-seller-grid">
          @if (products$ | async; as products) {
            @for (product of products.slice(0, 4); track product.id) {
              <article class="best-card agrabo-card">
                @if ($first) {
                  <span class="badge text-bg-warning">Bestseller</span>
                }
                <a [routerLink]="['/product', product.id]" class="product-image-link">
                  <img [src]="product.imageUrl || 'assets/products/deli-honey-500g.png'" [alt]="product.name">
                </a>
                <h3>{{ product.name }}</h3>
                <div class="rating">&#9733;&#9733;&#9733;&#9733;&#9733; <span>({{ 245 - ($index * 36) }})</span></div>
                <p class="price">UGX {{ product.price | number }}</p>
                <button class="btn btn-honey w-100 btn-sm" type="button" (click)="addToCart(product)">
                  <i class="bi bi-bag me-2"></i>Add to Cart
                </button>
              </article>
            }
          }
        </div>

        <div class="why-title">
          <p class="eyebrow mb-0">Why choose AGRABO</p>
          <h2>Honey You Can Feel Good About</h2>
        </div>

        <div class="why-grid">
          <article class="why-card"><i class="bi bi-droplet"></i><div><strong>100% Pure &amp; Natural</strong><span>No additives, no preservatives. Just pure honey.</span></div></article>
          <article class="why-card"><i class="bi bi-leaf"></i><div><strong>Sustainably Sourced</strong><span>Ethically harvested from Uganda's rich forests.</span></div></article>
          <article class="why-card"><i class="bi bi-people"></i><div><strong>Supporting Communities</strong><span>Every purchase empowers local beekeepers.</span></div></article>
          <article class="why-card"><i class="bi bi-shield-check"></i><div><strong>Quality Guaranteed</strong><span>Carefully tested for purity and quality.</span></div></article>
        </div>

        <section class="bulk-banner">
          <div>
            <h2>Bulk Supply for Businesses,<br>Hotels, Schools &amp; Retailers</h2>
            <p>Competitive prices. Consistent quality. Reliable delivery.</p>
            <a class="btn btn-light btn-sm" routerLink="/bulk-orders">Request a Bulk Quote <i class="bi bi-arrow-right ms-1"></i></a>
          </div>
          <img src="assets/products/deli-honey-bulk.png" alt="Bulk Deli Honey containers">
        </section>

        <div class="testimonial-heading">
          <p class="eyebrow mb-0">What our customers say</p>
          <h2>Real People. Real Honey.</h2>
        </div>

        <div class="testimonial-grid">
          @for (item of testimonials; track item.name) {
            <article class="testimonial-card agrabo-card">
              <i class="bi bi-quote"></i>
              <p>"{{ item.quote }}"</p>
              <strong>{{ item.name }}</strong>
              <span>{{ item.location }}</span>
              <div>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-copy {
      max-width: 650px;
      padding: 38px 0 34px;
    }

    .page-title span {
      color: var(--agrabo-amber);
    }

    .hero-lead {
      max-width: 460px;
      color: #2f2723;
      font-size: 1rem;
      line-height: 1.5;
    }

    .order-btn {
      --bs-btn-color: var(--agrabo-green);
      --bs-btn-border-color: var(--agrabo-green);
      --bs-btn-hover-bg: var(--agrabo-green);
      --bs-btn-hover-border-color: var(--agrabo-green);
      --bs-btn-hover-color: #fff;
      background: rgba(255, 255, 255, 0.72);
      border-radius: 9px;
      font-weight: 800;
    }

    .hero-points {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 18px;
      max-width: 760px;
      margin-top: 28px;
    }

    .hero-points div {
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      gap: 8px;
      align-items: center;
    }

    .hero-points i {
      color: var(--agrabo-amber);
      font-size: 1.4rem;
      grid-row: span 2;
    }

    .hero-points strong,
    .hero-points span,
    .dark-trust strong,
    .dark-trust span {
      display: block;
    }

    .hero-points strong {
      color: var(--agrabo-deep);
      font-size: 0.78rem;
      font-weight: 900;
    }

    .hero-points span {
      color: #3f312b;
      font-size: 0.68rem;
      font-weight: 700;
      line-height: 1.25;
    }

    .home-page {
      padding: 0;
      position: relative;
    }

    .dark-trust {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0;
      color: #fff;
      background: linear-gradient(135deg, #4a210d, #7a3d05);
      border: 1px solid rgba(242, 160, 0, 0.36);
      border-radius: 8px;
      box-shadow: 0 16px 30px rgba(91, 37, 15, 0.16);
      margin: -28px 0 22px;
      overflow: hidden;
      position: relative;
      z-index: 2;
    }

    .dark-trust div {
      display: grid;
      grid-template-columns: 42px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      padding: 14px 22px;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }

    .dark-trust div:last-child {
      border-right: 0;
    }

    .dark-trust i {
      color: #ffc94a;
      font-size: 1.65rem;
      grid-row: span 2;
    }

    .dark-trust strong {
      font-size: 0.84rem;
      font-weight: 900;
    }

    .dark-trust span {
      color: rgba(255, 255, 255, 0.78);
      font-size: 0.7rem;
      line-height: 1.25;
    }

    .section-kicker {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 10px;
    }

    .section-kicker h2,
    .why-title h2,
    .bulk-banner h2,
    .testimonial-heading h2 {
      color: var(--agrabo-brown);
      font-family: Georgia, "Times New Roman", serif;
      font-weight: 900;
      line-height: 1;
      margin: 0;
    }

    .best-seller-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .best-card {
      min-width: 0;
      padding: 14px;
      position: relative;
    }

    .best-card .badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: var(--agrabo-amber) !important;
      color: #fff;
      font-size: 0.68rem;
    }

    .product-image-link {
      min-height: 126px;
      display: grid;
      place-items: center;
    }

    .best-card img {
      width: min(72%, 190px);
      max-height: 136px;
      object-fit: contain;
      filter: drop-shadow(0 12px 14px rgba(91, 37, 15, 0.16));
    }

    .best-card h3 {
      color: var(--agrabo-deep);
      font-size: 0.92rem;
      font-weight: 900;
      margin: 6px 0 4px;
    }

    .rating {
      color: var(--agrabo-honey);
      font-size: 0.76rem;
    }

    .rating span {
      color: #5f514c;
    }

    .price {
      color: var(--agrabo-deep);
      font-size: 1.05rem;
      font-weight: 900;
      margin: 4px 0 8px;
    }

    .why-title,
    .testimonial-heading {
      text-align: center;
      margin: 10px 0 8px;
    }

    .why-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
      margin-bottom: 14px;
    }

    .why-card {
      display: grid;
      grid-template-columns: 48px minmax(0, 1fr);
      gap: 12px;
      align-items: center;
      border: 1px solid var(--agrabo-line);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.78);
      padding: 14px 18px;
    }

    .why-card i {
      color: var(--agrabo-amber);
      font-size: 1.8rem;
      justify-self: center;
    }

    .why-card strong,
    .why-card span {
      display: block;
    }

    .why-card strong {
      color: var(--agrabo-deep);
      font-weight: 900;
      font-size: 0.88rem;
    }

    .why-card span {
      color: #4f403a;
      font-size: 0.78rem;
      line-height: 1.35;
    }

    .bulk-banner {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 360px;
      gap: 24px;
      align-items: center;
      color: #fff;
      border-radius: 8px;
      background:
        linear-gradient(90deg, rgba(165, 89, 0, 0.96), rgba(196, 108, 0, 0.9)),
        linear-gradient(30deg, rgba(255, 255, 255, 0.18) 12%, transparent 12.5%, transparent 87%, rgba(255, 255, 255, 0.18) 87.5%, rgba(255, 255, 255, 0.18));
      background-size: auto, 44px 76px;
      min-height: 118px;
      overflow: hidden;
      padding: 20px 34px;
      box-shadow: 0 12px 28px rgba(91, 37, 15, 0.18);
    }

    .bulk-banner h2,
    .bulk-banner p {
      color: #fff;
    }

    .bulk-banner p {
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 8px;
    }

    .bulk-banner img {
      width: 100%;
      max-height: 150px;
      object-fit: contain;
      filter: drop-shadow(0 18px 18px rgba(35, 14, 5, 0.2));
      align-self: end;
    }

    .testimonial-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
      padding-bottom: 12px;
    }

    .testimonial-card {
      padding: 16px 20px;
      min-width: 0;
    }

    .testimonial-card i {
      color: rgba(91, 37, 15, 0.35);
      font-size: 1.4rem;
    }

    .testimonial-card p {
      color: #3d302b;
      font-size: 0.84rem;
      font-style: italic;
      line-height: 1.4;
      margin: 4px 0 10px;
    }

    .testimonial-card strong,
    .testimonial-card span {
      display: block;
      font-size: 0.78rem;
    }

    .testimonial-card span {
      color: #6a554d;
    }

    .testimonial-card div {
      color: var(--agrabo-honey);
      text-align: right;
    }

    @media (max-width: 1199px) {
      .best-seller-grid,
      .why-grid,
      .dark-trust {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .bulk-banner {
        grid-template-columns: minmax(0, 1fr) 280px;
      }
    }

    @media (max-width: 768px) {
      .hero-copy {
        padding: 0;
      }

      .hero-points,
      .dark-trust,
      .best-seller-grid,
      .why-grid,
      .bulk-banner,
      .testimonial-grid {
        grid-template-columns: 1fr;
      }

      .hero-points {
        gap: 10px;
        max-width: 300px;
      }

      .dark-trust {
        margin-top: -18px;
      }

      .dark-trust div {
        border-right: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.14);
      }

      .dark-trust div:last-child {
        border-bottom: 0;
      }

      .section-kicker {
        align-items: flex-start;
        flex-direction: column;
      }

      .best-card img {
        width: min(58%, 160px);
      }

      .bulk-banner {
        padding: 20px;
      }

      .bulk-banner img {
        max-height: 120px;
      }
    }
  `]
})
export class HomePage {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);
  readonly products$ = this.productService.getProducts();
  readonly testimonials = [
    {
      quote: "Deli Honey is the real deal. Pure, natural and tastes amazing. I love knowing I'm supporting local beekeepers.",
      name: 'Sarah N.',
      location: 'Kampala'
    },
    {
      quote: "The best honey I've ever had. Great quality and fast delivery. My family loves it.",
      name: 'James K.',
      location: 'Entebbe'
    },
    {
      quote: 'We order in bulk for our hotel and the quality is consistently excellent. Highly recommend Agrabo.',
      name: 'Mercy A.',
      location: 'Jinja'
    }
  ];

  addToCart(product: Product): void {
    this.cart.add(product);
  }
}
