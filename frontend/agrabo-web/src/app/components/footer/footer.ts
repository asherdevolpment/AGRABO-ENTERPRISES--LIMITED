import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <img class="footer-logo" src="assets/logos/agrabo-logo-transparent.png" alt="AGRABO logo">
            <p class="tagline">Deli Honey for homes, retailers, restaurants, institutions, and bulk buyers.</p>
          </div>

          <nav aria-label="Footer navigation">
            <h3>Shop</h3>
            <a routerLink="/shop">Products</a>
            <a routerLink="/bulk-orders">Bulk orders</a>
            <a routerLink="/contact">Contact</a>
            <a class="staff-link" routerLink="/admin/login">Staff login</a>
          </nav>

          <div>
            <h3>Support</h3>
            <p><i class="bi bi-telephone-fill"></i>0706506319</p>
            <p><i class="bi bi-whatsapp"></i>0706506319</p>
            <p><i class="bi bi-envelope-fill"></i>info&#64;agrabo.ug</p>
          </div>
        </div>

        <div class="footer-bottom">
          <span>&copy; 2026 AGRABO Enterprise Limited.</span>
          <span>Kampala, Uganda</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      color: var(--agrabo-deep);
      background: #fff;
      border-top: 1px solid var(--agrabo-line);
      padding: 30px 0 16px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.4fr 0.8fr 1fr;
      gap: clamp(22px, 5vw, 64px);
      align-items: start;
    }

    .footer-logo {
      width: 136px;
      height: auto;
      margin-bottom: 10px;
    }

    .tagline {
      max-width: 390px;
      color: var(--agrabo-muted);
      margin: 0;
      line-height: 1.6;
    }

    h3 {
      color: var(--agrabo-deep);
      font-size: 0.82rem;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    a,
    p {
      color: var(--agrabo-muted);
      font-size: 0.88rem;
      line-height: 1.55;
      margin-bottom: 7px;
      text-decoration: none;
    }

    a {
      display: block;
      width: fit-content;
    }

    a:hover {
      color: var(--agrabo-green);
    }

    i {
      color: var(--agrabo-green);
      margin-right: 8px;
    }

    .staff-link {
      color: #9a918a;
      margin-top: 10px;
      font-size: 0.8rem;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      color: #9a918a;
      border-top: 1px solid var(--agrabo-line);
      margin-top: 24px;
      padding-top: 14px;
      font-size: 0.78rem;
    }

    @media (max-width: 768px) {
      .footer {
        padding-bottom: 84px;
      }

      .footer-grid {
        grid-template-columns: 1fr;
      }

      .footer-bottom {
        flex-direction: column;
      }
    }
  `]
})
export class Footer {}
