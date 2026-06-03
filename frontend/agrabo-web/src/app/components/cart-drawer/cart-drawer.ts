import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [DecimalPipe, RouterLink],
  template: `
    @if (cart.drawerOpen()) {
      <button class="cart-backdrop" type="button" aria-label="Close cart" (click)="cart.closeDrawer()"></button>
      <aside class="cart-drawer" aria-label="Shopping cart">
        <header>
          <div>
            <span>Your cart</span>
            <h2>{{ cart.itemCount() }} item{{ cart.itemCount() === 1 ? '' : 's' }}</h2>
          </div>
          <button type="button" class="close-btn" aria-label="Close cart" (click)="cart.closeDrawer()">
            <i class="bi bi-x-lg"></i>
          </button>
        </header>

        @if (cart.items().length) {
          <div class="cart-items">
            @for (item of cart.items(); track item.product.id) {
              <article class="cart-item">
                <img [src]="item.product.imageUrl || 'assets/products/deli-honey-500g.png'" [alt]="item.product.name + ' ' + item.product.size">
                <div>
                  <strong>{{ item.product.name }}</strong>
                  <span>{{ item.product.size }}</span>
                  <small>UGX {{ item.product.price | number }}</small>
                  <div class="qty-control">
                    <button type="button" aria-label="Decrease quantity" (click)="cart.updateQuantity(item.product.id, item.quantity - 1)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button type="button" aria-label="Increase quantity" (click)="cart.updateQuantity(item.product.id, item.quantity + 1)">+</button>
                  </div>
                </div>
              </article>
            }
          </div>

          <footer>
            <div class="delivery-note">
              <i class="bi bi-truck"></i>
              <span>Delivery confirmed on WhatsApp after checkout.</span>
            </div>
            <div class="subtotal">
              <span>Subtotal</span>
              <strong>UGX {{ cart.subtotal() | number }}</strong>
            </div>
            <a class="btn btn-agrabo w-100" routerLink="/checkout" (click)="cart.closeDrawer()">Checkout</a>
            <button class="continue-btn" type="button" (click)="cart.closeDrawer()">Continue shopping</button>
          </footer>
        } @else {
          <div class="empty-cart">
            <i class="bi bi-bag"></i>
            <h3>Your cart is empty</h3>
            <p>Add honey from the shop to start an order.</p>
            <button class="btn btn-honey" type="button" (click)="cart.closeDrawer()">Shop products</button>
          </div>
        }
      </aside>
    }
  `,
  styles: [`
    .cart-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1045;
      background: rgba(18, 59, 37, 0.38);
      border: 0;
      animation: fadeBackdrop 180ms var(--agrabo-ease) both;
    }

    .cart-drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1050;
      width: min(100%, 420px);
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      background:
        radial-gradient(circle at 90% 8%, rgba(243, 167, 18, 0.14), transparent 15rem),
        linear-gradient(180deg, #fffaf0, #fff 42%, var(--agrabo-mint));
      box-shadow: -22px 0 44px rgba(18, 59, 37, 0.2);
      animation: slideDrawer 240ms var(--agrabo-ease) both;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border-bottom: 1px solid rgba(39, 107, 50, 0.16);
      padding: 22px;
    }

    header span {
      color: var(--agrabo-green);
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    h2 {
      color: var(--agrabo-deep);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.6rem;
      font-weight: 900;
      margin: 2px 0 0;
    }

    .close-btn {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      color: var(--agrabo-deep);
      background: var(--agrabo-leaf);
      border: 1px solid rgba(39, 107, 50, 0.14);
      border-radius: 999px;
    }

    .cart-items {
      min-height: 0;
      overflow: auto;
      padding: 8px 22px;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 86px minmax(0, 1fr);
      gap: 14px;
      background: rgba(255, 255, 255, 0.72);
      border: 1px solid rgba(31, 122, 58, 0.12);
      border-radius: 14px;
      box-shadow: var(--agrabo-shadow-soft);
      margin: 12px 0;
      padding: 12px;
    }

    .cart-item img {
      width: 82px;
      height: 92px;
      object-fit: contain;
      background: linear-gradient(135deg, #fff9ec, var(--agrabo-mint));
      border-radius: 12px;
      padding: 8px;
    }

    .cart-item strong,
    .cart-item span,
    .cart-item small {
      display: block;
    }

    .cart-item strong {
      color: var(--agrabo-deep);
      font-weight: 900;
    }

    .cart-item span {
      color: var(--agrabo-green);
      font-size: 0.78rem;
      font-weight: 900;
    }

    .cart-item small {
      color: #5d4c45;
      font-weight: 800;
      margin-top: 2px;
    }

    .qty-control {
      display: inline-flex;
      align-items: center;
      overflow: hidden;
      border: 1px solid rgba(39, 107, 50, 0.18);
      border-radius: 8px;
      margin-top: 10px;
    }

    .qty-control button {
      width: 34px;
      height: 30px;
      color: var(--agrabo-green);
      background: #fff;
      border: 0;
      font-weight: 900;
    }

    .qty-control span {
      width: 38px;
      color: var(--agrabo-deep);
      border-inline: 1px solid rgba(39, 107, 50, 0.14);
      text-align: center;
      line-height: 30px;
    }

    footer {
      border-top: 1px solid rgba(39, 107, 50, 0.16);
      padding: 18px 22px 22px;
    }

    .delivery-note {
      display: flex;
      gap: 10px;
      color: #4d3d36;
      background: var(--agrabo-leaf);
      border-radius: 14px;
      padding: 10px 12px;
      font-size: 0.82rem;
      font-weight: 700;
    }

    .delivery-note i {
      color: var(--agrabo-green);
    }

    .subtotal {
      display: flex;
      justify-content: space-between;
      color: var(--agrabo-deep);
      margin: 16px 0;
      font-size: 1.05rem;
      font-weight: 900;
    }

    .continue-btn {
      width: 100%;
      color: var(--agrabo-green);
      background: transparent;
      border: 0;
      margin-top: 12px;
      font-weight: 900;
    }

    .empty-cart {
      display: grid;
      place-items: center;
      align-content: center;
      min-height: 100%;
      padding: 30px;
      text-align: center;
    }

    .empty-cart i {
      color: var(--agrabo-green);
      font-size: 2.8rem;
    }

    .empty-cart h3 {
      color: var(--agrabo-deep);
      font-family: Georgia, "Times New Roman", serif;
      font-weight: 900;
      margin: 12px 0 4px;
    }

    .empty-cart p {
      color: #5d4c45;
      margin-bottom: 18px;
    }

    @keyframes slideDrawer {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    @keyframes fadeBackdrop {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `]
})
export class CartDrawer {
  readonly cart = inject(CartService);
}
