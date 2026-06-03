import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AdminShell } from '../../components/admin-shell/admin-shell';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-inventory-page',
  imports: [AdminShell, AsyncPipe],
  template: `
    <app-admin-shell>
      <div class="admin-page-head">
        <div>
          <span class="eyebrow">Inventory</span>
          <h1>Stock control</h1>
          <p>Monitor stock levels by product size and identify items that need replenishment.</p>
        </div>
      </div>

      <section class="admin-card">
        @if (products$ | async; as products) {
          <div class="inventory-grid">
            @for (product of products; track product.id) {
              <article>
                <img [src]="product.imageUrl || 'assets/products/deli-honey-500g.png'" [alt]="product.name">
                <div>
                  <strong>{{ product.name }} {{ product.size }}</strong>
                  <span [class.low]="product.stock <= 12">{{ product.stock <= 12 ? 'Low stock' : 'In stock' }}</span>
                  <div class="stock-bar"><b [style.width.%]="stockPercent(product.stock)"></b></div>
                  <small>{{ product.stock }} units available</small>
                </div>
              </article>
            }
          </div>
        }
      </section>
    </app-admin-shell>
  `,
  styles: [`
    .admin-page-head {
      margin-bottom: 22px;
    }

    h1 {
      color: var(--agrabo-deep);
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2rem, 4vw, 3.15rem);
      font-weight: 900;
      margin: 0 0 8px;
    }

    p {
      color: #5d4c45;
      margin: 0;
    }

    .admin-card {
      background: #fff;
      border: 1px solid rgba(31, 122, 58, 0.14);
      border-radius: 8px;
      box-shadow: 0 12px 30px rgba(31, 122, 58, 0.06);
      padding: 18px;
    }

    .inventory-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }

    article {
      display: grid;
      grid-template-columns: 72px minmax(0, 1fr);
      gap: 14px;
      align-items: center;
      background: var(--agrabo-mint);
      border-radius: 8px;
      padding: 14px;
    }

    img {
      width: 68px;
      height: 74px;
      object-fit: contain;
      background: #fff;
      border-radius: 8px;
      padding: 6px;
    }

    strong,
    span,
    small {
      display: block;
    }

    strong {
      color: var(--agrabo-deep);
      font-weight: 900;
    }

    span {
      color: var(--agrabo-green);
      font-size: 0.78rem;
      font-weight: 900;
      margin: 2px 0 8px;
    }

    span.low {
      color: var(--agrabo-amber);
    }

    small {
      color: #6f7a70;
      margin-top: 6px;
    }

    .stock-bar {
      height: 8px;
      overflow: hidden;
      background: rgba(31, 122, 58, 0.12);
      border-radius: 999px;
    }

    .stock-bar b {
      display: block;
      height: 100%;
      min-width: 6%;
      background: var(--agrabo-green);
      border-radius: inherit;
    }

    @media (max-width: 1000px) {
      .inventory-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 620px) {
      .inventory-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminInventoryPage {
  private readonly products = inject(ProductService);
  readonly products$ = this.products.getProducts();

  stockPercent(stock: number): number {
    return Math.max(8, Math.min(100, (stock / 40) * 100));
  }
}
