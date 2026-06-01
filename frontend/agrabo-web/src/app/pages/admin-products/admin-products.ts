import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-products-page',
  imports: [AsyncPipe, DecimalPipe, RouterLink],
  template: `
    <section class="section-band admin-products">
      <div class="container">
        <p class="eyebrow">Admin</p>
        <h1 class="page-title mb-3">Products</h1>
        <p class="text-muted">Products shown on the public shop are visible here. API create/edit controls can be added on top of this list.</p>

        <div class="product-admin-grid">
          @for (product of products$ | async; track product.id) {
            <article class="mini-card">
              <img [src]="product.imageUrl || 'assets/products/deli-honey-500g.png'" [alt]="product.name">
              <div>
                <strong>{{ product.name }}</strong>
                <span>{{ product.size }} / {{ product.isActive === false ? 'Hidden' : 'Visible' }}</span>
                <p>UGX {{ product.price | number }} | Stock: {{ product.stock }}</p>
                <a class="btn btn-sm btn-outline-dark" [routerLink]="['/product', product.id]">View public page</a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .product-admin-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .product-admin-grid article {
      display: grid;
      grid-template-columns: 90px minmax(0, 1fr);
      gap: 14px;
      align-items: center;
    }

    .product-admin-grid img {
      width: 100%;
      height: 86px;
      object-fit: contain;
    }

    .product-admin-grid strong,
    .product-admin-grid span {
      display: block;
    }

    .product-admin-grid span,
    .product-admin-grid p {
      color: #6a5b55;
      font-size: 0.84rem;
    }

    @media (max-width: 992px) {
      .product-admin-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 576px) {
      .product-admin-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminProductsPage {
  private readonly products = inject(ProductService);
  readonly products$ = this.products.getProducts();
}
