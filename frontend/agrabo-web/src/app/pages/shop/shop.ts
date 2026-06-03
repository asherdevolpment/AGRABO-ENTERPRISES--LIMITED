import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';

type CatalogFilter = 'all' | 'jars' | 'family' | 'bulk';

@Component({
  selector: 'app-shop-page',
  imports: [DecimalPipe, RouterLink],
  template: `
    <section class="shop-page">
      <div class="shop-frame">
        <section id="products" class="products-section">
          <div class="section-title">
            <div>
              <span>Shop</span>
              <h1>Deli Honey products</h1>
            </div>
            @if (filter() !== 'all') {
              <button type="button" (click)="setFilter('all')">View all</button>
            }
          </div>

          <div class="shop-layout">
            <aside class="size-nav" aria-label="Shop by size">
              <strong>Shop by size</strong>
              @for (category of categories; track category.filter) {
                <button type="button" [class.active]="filter() === category.filter" (click)="setFilter(category.filter)">
                  <span class="category-icon">
                    <img [src]="category.image" [alt]="category.label">
                  </span>
                  <span>
                    <b>{{ category.label }}</b>
                    <small>{{ category.copy }}</small>
                  </span>
                </button>
              }
            </aside>

            @if (filteredProducts().length) {
              <div class="product-grid">
                @for (product of visibleProducts(); track product.id) {
                  <article class="product-card">
                    <a class="product-media" [routerLink]="['/product', product.id]">
                      <img [src]="productImage(product)" [alt]="product.name + ' ' + product.size">
                    </a>

                    <div class="product-info">
                      <h3>{{ product.name }}</h3>
                      <span>{{ product.size }}</span>
                      <p>{{ product.description || 'Pure Deli Honey for daily use.' }}</p>

                      <div class="product-bottom">
                        @if (product.price > 0) {
                          <strong>UGX {{ product.price | number }}</strong>
                          <button type="button" aria-label="Add product to cart" (click)="addToCart(product)">
                            <i class="bi bi-plus"></i>
                          </button>
                        } @else {
                          <strong>Quote</strong>
                          <a routerLink="/bulk-orders">Request quote</a>
                        }
                      </div>
                    </div>
                  </article>
                }
              </div>
            } @else {
              <div class="empty-products">
                <h3>No products found</h3>
              <button class="empty-action" type="button" (click)="setFilter('all')">View all products</button>
              </div>
            }
          </div>
        </section>

        <section class="shop-notes" aria-label="Shop notes">
          <span><i class="bi bi-leaf"></i>100% natural</span>
          <span><i class="bi bi-truck"></i>Kampala delivery</span>
          <span><i class="bi bi-box-seam"></i>Bulk supply available</span>
        </section>
      </div>
    </section>
  `,
  styles: [`
    .shop-page {
      background: #fff;
      padding: 0 0 10px;
    }

    .shop-frame {
      width: min(100% - 32px, 1440px);
      margin-inline: auto;
      padding-top: 14px;
    }

    .products-section {
      margin-bottom: 16px;
    }

    .section-title {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid #e6ddd3;
      padding-bottom: 12px;
      margin-bottom: 10px;
    }

    .section-title span {
      color: var(--agrabo-green);
      display: block;
      font-size: 0.72rem;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .section-title h1 {
      color: #12110f;
      font-size: clamp(1.45rem, 2.8vw, 2.2rem);
      font-weight: 900;
      margin: 0;
    }

    .section-title button {
      color: var(--agrabo-green);
      background: transparent;
      border: 0;
      font-size: 0.86rem;
      font-weight: 900;
    }

    .shop-layout {
      display: grid;
      grid-template-columns: 210px minmax(0, 1fr);
      gap: 16px;
      align-items: start;
    }

    .size-nav {
      position: sticky;
      top: 92px;
      display: grid;
      gap: 8px;
      background: #fff;
      border: 1px solid #e6ddd3;
      border-radius: 10px;
      padding: 10px;
    }

    .size-nav > strong {
      color: #12110f;
      font-size: 0.86rem;
      font-weight: 900;
      padding: 2px 4px 6px;
    }

    .size-nav button {
      display: grid;
      grid-template-columns: 42px minmax(0, 1fr);
      align-items: center;
      gap: 10px;
      min-height: 58px;
      background: #fff;
      border: 1px solid #e6ddd3;
      border-radius: 8px;
      padding: 8px;
      text-align: left;
    }

    .size-nav button.active,
    .size-nav button:hover {
      border-color: var(--agrabo-amber);
      background: #fff8ee;
    }

    .category-icon {
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      background: #fff3e2;
      border-radius: 999px;
    }

    .category-icon img {
      width: 30px;
      height: 30px;
      object-fit: contain;
    }

    .size-nav b,
    .size-nav small {
      display: block;
    }

    .size-nav b {
      color: #151210;
      font-size: 0.84rem;
      font-weight: 900;
      margin-bottom: 2px;
    }

    .size-nav small {
      color: #69645f;
      font-size: 0.72rem;
      font-weight: 700;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .product-card {
      display: grid;
      grid-template-columns: 170px minmax(0, 1fr);
      gap: 18px;
      min-height: 126px;
      background: #fff;
      border: 1px solid #e6ddd3;
      border-radius: 10px;
      padding: 10px 14px 10px 10px;
      overflow: hidden;
    }

    .product-card:hover {
      border-color: var(--agrabo-amber);
      box-shadow: var(--agrabo-shadow-soft);
    }

    .product-media {
      display: grid;
      place-items: center;
      height: 108px;
      background: #fff8ee;
      border-radius: 8px;
      overflow: hidden;
    }

    .product-media img {
      width: 92px;
      height: 96px;
      object-fit: contain;
      object-position: center;
    }

    .product-info {
      display: grid;
      align-content: start;
      min-width: 0;
      padding: 2px 0;
    }

    .product-info h3 {
      color: #14110f;
      font-size: 1rem;
      font-weight: 900;
      margin: 0 0 1px;
    }

    .product-info > span {
      color: var(--agrabo-amber);
      display: block;
      font-size: 0.86rem;
      font-weight: 900;
      margin-bottom: 10px;
    }

    .product-info p {
      color: #4f4a45;
      display: -webkit-box;
      font-size: 0.8rem;
      line-height: 1.35;
      min-height: 34px;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin: 0 0 10px;
    }

    .product-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: auto;
    }

    .product-bottom strong {
      color: #14110f;
      font-size: 0.98rem;
      font-weight: 900;
      white-space: nowrap;
    }

    .product-bottom button {
      display: grid;
      place-items: center;
      width: 34px;
      height: 34px;
      color: var(--agrabo-amber);
      background: #fff;
      border: 1px solid var(--agrabo-amber);
      border-radius: 8px;
      font-weight: 900;
      flex: 0 0 auto;
    }

    .product-bottom a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 34px;
      color: var(--agrabo-green);
      background: #fff;
      border: 1px solid var(--agrabo-amber);
      border-radius: 8px;
      font-size: 0.78rem;
      font-weight: 900;
      padding: 0 18px;
      text-decoration: none;
      white-space: nowrap;
    }

    .shop-notes {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      border: 1px solid #eadfce;
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 8px;
    }

    .shop-notes span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #403a35;
      font-size: 0.84rem;
      font-weight: 800;
    }

    .shop-notes i {
      color: var(--agrabo-green);
    }

    .empty-products {
      background: #fff;
      border: 1px solid #e6ddd3;
      border-radius: 12px;
      padding: 32px;
      text-align: center;
    }

    .empty-action {
      color: var(--agrabo-green);
      background: #fff;
      border: 1px solid var(--agrabo-amber);
      border-radius: 8px;
      font-size: 0.84rem;
      font-weight: 900;
      min-height: 38px;
      padding: 0 18px;
    }

    @media (max-width: 1180px) {
      .product-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 760px) {
      .shop-frame {
        width: min(100% - 22px, 1440px);
      }

      .shop-layout,
      .product-grid,
      .shop-notes {
        grid-template-columns: 1fr;
      }

      .size-nav {
        position: static;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .product-card {
        grid-template-columns: 132px minmax(0, 1fr);
        gap: 14px;
      }

      .product-media {
        height: 116px;
      }

      .shop-notes span {
        justify-content: flex-start;
      }
    }

    @media (max-width: 480px) {
      .product-card {
        grid-template-columns: 1fr;
      }

      .size-nav {
        grid-template-columns: 1fr;
      }

      .product-media img {
        width: 110px;
      }
    }
  `]
})
export class ShopPage {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);

  readonly products = toSignal(this.productService.getProducts(), { initialValue: [] });
  readonly filter = signal<CatalogFilter>('all');

  readonly categories: Array<{ label: string; copy: string; filter: CatalogFilter; image: string }> = [
    { label: 'Small jars', copy: 'Trial and daily use', filter: 'jars', image: 'assets/PRODUCT TEMLATE .png' },
    { label: 'Family size', copy: 'Home and office', filter: 'family', image: 'assets/PRODUCT TEMLATE .png' },
    { label: 'Bulk honey', copy: 'Business supply', filter: 'bulk', image: 'assets/products/deli-honey-bulk.png' },
    { label: 'All products', copy: 'View full catalog', filter: 'all', image: 'assets/PRODUCT TEMLATE .png' }
  ];


  readonly filteredProducts = computed(() => {
    const filter = this.filter();
    return this.products().filter((product) => filter === 'all' || this.productCategory(product) === filter);
  });

  readonly visibleProducts = computed(() => this.filteredProducts());

  setFilter(filter: CatalogFilter): void {
    this.filter.set(filter);
  }

  addToCart(product: Product): void {
    this.cart.add(product);
  }

  productImage(product: Product): string {
    return this.productCategory(product) === 'bulk' ? 'assets/products/deli-honey-bulk.png' : 'assets/PRODUCT TEMLATE .png';
  }

  private productCategory(product: Product): CatalogFilter {
    const size = product.size.toLowerCase();
    if (!product.price || size.includes('bulk') || size.includes('5l') || size.includes('20l')) {
      return 'bulk';
    }
    if (size.includes('1kg') || size.includes('2kg') || size.includes('1l')) {
      return 'family';
    }
    return 'jars';
  }
}
