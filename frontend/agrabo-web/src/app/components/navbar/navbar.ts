import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header sticky-top">
      <div class="top-trust">
        <div class="container">
          <div class="top-trust-left">
            <span><i class="bi bi-droplet"></i>100% Pure Ugandan Honey</span>
            <span>Locally Sourced</span>
            <span>Supporting Local Beekeepers</span>
            <span>Pure - Natural - Unprocessed</span>
          </div>
          <div class="top-trust-right">
            <a routerLink="/checkout"><i class="bi bi-box-seam"></i>Track Order</a>
            <a routerLink="/contact"><i class="bi bi-question-circle"></i>Help Center</a>
          </div>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg bg-white agrabo-navbar">
        <div class="container">
          <a class="navbar-brand" routerLink="/">
            <img class="brand-logo" src="assets/logos/agrabo-logo-transparent.png" alt="AGRABO logo">
            <span>AGRABO Enterprise Limited</span>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="mainNav" class="collapse navbar-collapse">
            <ul class="navbar-nav mx-auto align-items-lg-center gap-lg-4">
              <li class="nav-item"><a class="nav-link" routerLink="/shop" routerLinkActive="active">Shop Honey <i class="bi bi-chevron-down"></i></a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/bulk-orders" routerLinkActive="active">Bulk Orders</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/about" routerLinkActive="active">About Us</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/about" fragment="impact">Our Impact</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/testimonials" routerLinkActive="active">Testimonials</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/contact" routerLinkActive="active">Contact</a></li>
            </ul>
            <div class="nav-actions">
              <button class="icon-action" type="button" aria-label="Search products"><i class="bi bi-search"></i></button>
              <a class="icon-action cart-btn" routerLink="/checkout" aria-label="View cart">
                <i class="bi bi-cart3"></i>
                <span>{{ cart.itemCount() }}</span>
              </a>
              <a class="btn btn-agrabo btn-sm whatsapp-order" href="https://wa.me/256706506319" target="_blank" rel="noopener">
                <i class="bi bi-whatsapp"></i>
                Order on WhatsApp
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
      box-shadow: 0 10px 28px rgba(91, 37, 15, 0.07);
      z-index: 1030;
    }

    .top-trust {
      background: linear-gradient(90deg, #fff5dc, #f8eed5);
      border-bottom: 1px solid rgba(189, 106, 0, 0.14);
      color: #4b2a18;
      font-size: 0.78rem;
      font-weight: 800;
    }

    .top-trust .container {
      min-height: 28px;
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: center;
    }

    .top-trust-left,
    .top-trust-right {
      display: flex;
      align-items: center;
      gap: clamp(14px, 3vw, 34px);
      white-space: nowrap;
    }

    .top-trust-left span + span::before {
      content: "•";
      color: var(--agrabo-amber);
      margin-right: clamp(14px, 3vw, 34px);
    }

    .top-trust a {
      color: #3d2417;
      text-decoration: none;
    }

    .top-trust i {
      color: var(--agrabo-amber);
      margin-right: 8px;
    }

    .agrabo-navbar {
      border-bottom: 1px solid rgba(242, 160, 0, 0.26);
      min-height: 72px;
    }

    .navbar-brand {
      min-width: 190px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1px;
      padding: 0;
    }

    .brand-logo {
      width: 122px;
      height: auto;
      object-fit: contain;
    }

    .navbar-brand span {
      color: #1f1714;
      font-size: 0.78rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .nav-link {
      color: #14100f;
      font-weight: 700;
      font-size: 0.94rem;
      padding-inline: 0 !important;
      position: relative;
    }

    .nav-link i {
      font-size: 0.68rem;
      margin-left: 4px;
    }

    .nav-link.active {
      color: var(--agrabo-amber);
    }

    .nav-link.active::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: var(--agrabo-amber);
      border-radius: 999px;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .icon-action {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      color: #1f1714;
      background: transparent;
      border: 0;
      border-radius: 999px;
      position: relative;
      text-decoration: none;
    }

    .icon-action:hover {
      background: rgba(189, 106, 0, 0.08);
      color: var(--agrabo-brown);
    }

    .cart-btn span {
      min-width: 16px;
      height: 16px;
      display: grid;
      place-items: center;
      position: absolute;
      top: 2px;
      right: 0;
      color: #fff;
      background: var(--agrabo-brown);
      border-radius: 999px;
      font-size: 0.62rem;
      font-weight: 900;
    }

    .whatsapp-order {
      padding-inline: 16px;
      white-space: nowrap;
    }

    @media (max-width: 991px) {
      .top-trust .container {
        justify-content: flex-start;
        gap: 16px;
        overflow-x: auto;
        white-space: nowrap;
        min-height: 30px;
      }

      .top-trust-left,
      .top-trust-right {
        gap: 16px;
      }

      .top-trust-left span + span::before {
        margin-right: 16px;
      }

      .navbar-brand {
        min-width: auto;
      }

      .brand-logo {
        width: 108px;
      }

      .navbar-nav {
        padding-block: 1rem;
      }

      .nav-link.active::after {
        right: auto;
        width: 34px;
      }

      .nav-actions {
        align-items: stretch;
        padding-bottom: 14px;
      }

      .whatsapp-order {
        flex: 1;
      }
    }

    @media (max-width: 575px) {
      .top-trust {
        font-size: 0.72rem;
      }

      .agrabo-navbar {
        min-height: 64px;
      }

      .brand-logo {
        width: 108px;
      }

      .navbar-brand span {
        font-size: 0.7rem;
      }
    }
  `]
})
export class Navbar {
  readonly cart = inject(CartService);
}
