import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminShell } from '../../components/admin-shell/admin-shell';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-products-page',
  imports: [AdminShell, AsyncPipe, DecimalPipe, RouterLink],
  template: `
    <app-admin-shell>
      <div class="admin-page-head">
        <div>
          <span class="eyebrow">Inventory</span>
          <h1>Products</h1>
          <p>Review the products shown on the public shop, their pricing, stock, and visibility.</p>
        </div>
        <button class="btn btn-agrabo" type="button" disabled>Add product</button>
      </div>

      <section class="admin-card">
        @if (products$ | async; as products) {
          <div class="table-responsive">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                @for (product of products; track product.id) {
                  <tr>
                    <td>
                      <div class="product-cell">
                        <img [src]="product.imageUrl || 'assets/products/deli-honey-500g.png'" [alt]="product.name">
                        <div><strong>{{ product.name }}</strong><span>{{ product.description || 'No description' }}</span></div>
                      </div>
                    </td>
                    <td>{{ product.size }}</td>
                    <td>{{ product.price ? 'UGX ' + (product.price | number) : 'Quote' }}</td>
                    <td><span class="stock-pill" [class.low]="product.stock <= 12">{{ product.stock }}</span></td>
                    <td><span class="status-pill">{{ product.isActive === false ? 'Hidden' : 'Visible' }}</span></td>
                    <td><a class="table-link" [routerLink]="['/product', product.id]">View</a></td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </section>
    </app-admin-shell>
  `,
  styles: [`
    .admin-page-head {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 18px;
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
      padding: 8px 16px;
    }

    th {
      color: #66756a;
      font-size: 0.76rem;
      text-transform: uppercase;
    }

    td {
      color: var(--agrabo-deep);
      font-size: 0.9rem;
    }

    .product-cell {
      display: grid;
      grid-template-columns: 58px minmax(0, 1fr);
      gap: 12px;
      align-items: center;
      min-width: 260px;
    }

    .product-cell img {
      width: 54px;
      height: 58px;
      object-fit: contain;
      background: var(--agrabo-mint);
      border-radius: 8px;
      padding: 6px;
    }

    .product-cell strong,
    .product-cell span {
      display: block;
    }

    .product-cell span {
      color: #6f7a70;
      font-size: 0.78rem;
      max-width: 420px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .status-pill,
    .stock-pill {
      display: inline-block;
      color: var(--agrabo-green);
      background: var(--agrabo-leaf);
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 0.76rem;
      font-weight: 900;
    }

    .stock-pill.low {
      color: var(--agrabo-amber);
      background: #fff4dc;
    }

    .table-link {
      color: var(--agrabo-green);
      font-weight: 900;
      text-decoration: none;
    }

    @media (max-width: 720px) {
      .admin-page-head {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  `]
})
export class AdminProductsPage {
  private readonly products = inject(ProductService);
  readonly products$ = this.products.getProducts();
}
