import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header sticky-top">
      <nav class="navbar navbar-expand-lg bg-white agrabo-navbar">
        <div class="container">
          <a class="navbar-brand" routerLink="/shop" aria-label="AGRABO shop">
            <img class="brand-logo" src="assets/logos/agrabo-logo-transparent.png" alt="AGRABO logo">
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div id="mainNav" class="collapse navbar-collapse">
            <ul class="navbar-nav mx-auto align-items-lg-center">
              <li class="nav-item"><a class="nav-link" routerLink="/shop" routerLinkActive="active"><i class="bi bi-bag"></i>Shop</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/bulk-orders" routerLinkActive="active"><i class="bi bi-box-seam"></i>Bulk</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/contact" routerLinkActive="active"><i class="bi bi-headset"></i>Contact</a></li>
            </ul>

            <div class="nav-actions">
              <button class="icon-action cart-btn" type="button" aria-label="View cart" (click)="cart.openDrawer()">
                <i class="bi bi-cart3"></i>
                <span>{{ cart.itemCount() }}</span>
              </button>
              <a class="btn btn-agrabo btn-sm whatsapp-order" href="https://api.whatsapp.com/send?phone=256706506319" target="_blank" rel="noopener">
                <i class="bi bi-whatsapp"></i>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    .site-header {
      background: #fff;
      border-bottom: 1px solid var(--agrabo-line);
      box-shadow: 0 4px 16px rgba(29, 23, 20, 0.04);
      z-index: 1030;
    }

    .agrabo-navbar {
      min-height: 76px;
    }

    .navbar-brand {
      display: inline-flex;
      align-items: center;
      padding: 0;
    }

    .brand-logo {
      width: 128px;
      height: auto;
      object-fit: contain;
    }

    .navbar-nav {
      gap: clamp(10px, 2vw, 26px);
    }

    .nav-link {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: var(--agrabo-deep);
      font-weight: 800;
      font-size: 0.94rem;
      padding-inline: 0 !important;
      position: relative;
    }

    .nav-link i {
      color: var(--agrabo-green);
    }

    .nav-link.active {
      color: var(--agrabo-green);
    }

    .nav-link.active::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -7px;
      height: 2px;
      background: var(--agrabo-gold);
      border-radius: 999px;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .icon-action {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      color: var(--agrabo-deep);
      background: #fff;
      border: 1px solid var(--agrabo-line);
      border-radius: 8px;
      position: relative;
    }

    .icon-action:hover {
      color: var(--agrabo-green);
      border-color: rgba(31, 111, 58, 0.28);
      box-shadow: var(--agrabo-shadow-soft);
    }

    .cart-btn span {
      min-width: 18px;
      height: 18px;
      display: grid;
      place-items: center;
      position: absolute;
      top: -6px;
      right: -6px;
      color: #fff;
      background: var(--agrabo-amber);
      border: 2px solid #fff;
      border-radius: 999px;
      font-size: 0.62rem;
      font-weight: 900;
    }

    .whatsapp-order {
      min-height: 40px;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding-inline: 16px;
      white-space: nowrap;
    }

    @media (max-width: 991px) {
      .agrabo-navbar {
        min-height: 68px;
      }

      .brand-logo {
        width: 112px;
      }

      .navbar-nav {
        align-items: stretch !important;
        gap: 0;
        padding: 14px 0;
      }

      .nav-link {
        min-height: 42px;
      }

      .nav-link.active::after {
        bottom: 4px;
        right: auto;
        width: 34px;
      }

      .nav-actions {
        align-items: stretch;
        padding-bottom: 10px;
      }

      .whatsapp-order {
        flex: 1;
        justify-content: center;
      }
    }
  `]
})
export class Navbar {
  readonly cart = inject(CartService);
}
