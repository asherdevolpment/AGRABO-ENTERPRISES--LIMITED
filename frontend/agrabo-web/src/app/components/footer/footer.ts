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
            <div class="footer-brand">
              <img src="assets/logos/agrabo-logo-transparent.png" alt="AGRABO logo">
            </div>
            <p class="tagline">AGRABO Enterprise Limited<br>Pure honey. Stronger communities.</p>
            <div class="socials">
              <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
              <a href="https://wa.me/256706506319" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>

          <div>
            <h3>Quick Links</h3>
            <a routerLink="/shop">Shop Honey</a>
            <a routerLink="/bulk-orders">Bulk Orders</a>
            <a routerLink="/about">About Us</a>
            <a routerLink="/about" fragment="impact">Our Impact</a>
            <a routerLink="/testimonials">Testimonials</a>
            <a routerLink="/contact">Contact Us</a>
          </div>

          <div>
            <h3>Customer Care</h3>
            <a routerLink="/contact">FAQs</a>
            <a routerLink="/contact">Shipping & Delivery</a>
            <a routerLink="/contact">Returns & Refunds</a>
            <a routerLink="/contact">Terms & Conditions</a>
            <a routerLink="/contact">Privacy Policy</a>
          </div>

          <div>
            <h3>Contact Us</h3>
            <p><i class="bi bi-telephone-fill"></i> 0706506319</p>
            <p><i class="bi bi-whatsapp"></i> 0706506319</p>
            <p><i class="bi bi-envelope-fill"></i> info&#64;agrabo.ug</p>
          </div>

          <div>
            <h3>Our Location</h3>
            <p><i class="bi bi-geo-alt-fill"></i> Kampala, Uganda</p>
            <p>Serving customers across Uganda and beyond.</p>
          </div>
        </div>

        <div class="footer-bottom">
          <span>&copy; 2025 AGRABO Enterprise Limited. All Rights Reserved.</span>
          <span>Made with <span class="heart">&hearts;</span> in Uganda</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      color: #fff;
      background:
        linear-gradient(90deg, rgba(68, 31, 6, 0.92), rgba(107, 58, 12, 0.78)),
        url('/assets/footerbg.png') center bottom / cover no-repeat;
      border-top: 2px solid rgba(242, 160, 0, 0.5);
      padding: 24px 0 14px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.4fr 0.9fr 1fr 1.1fr 1.25fr;
      gap: clamp(18px, 4vw, 42px);
      align-items: start;
    }

    a {
      display: block;
      color: rgba(255, 255, 255, 0.82);
      text-decoration: none;
      font-size: 0.84rem;
      line-height: 1.45;
    }

    a:hover {
      color: #fff;
    }

    h3 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1rem;
      font-weight: 900;
      margin-bottom: 14px;
    }

    p {
      color: rgba(255, 255, 255, 0.86);
      font-size: 0.84rem;
      line-height: 1.45;
      margin-bottom: 6px;
    }

    .footer-brand {
      margin-bottom: 6px;
    }

    .footer-brand img {
      width: 138px;
      height: auto;
      filter: brightness(0) invert(1);
    }

    .tagline {
      margin: 0 0 10px;
    }

    .socials {
      display: flex;
      gap: 10px;
    }

    .socials a {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      color: var(--agrabo-brown);
      background: #fff;
      border-radius: 50%;
      font-size: 0.86rem;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      color: rgba(255, 255, 255, 0.72);
      border-top: 1px solid rgba(255, 255, 255, 0.13);
      margin-top: 18px;
      padding-top: 10px;
      font-size: 0.75rem;
    }

    .heart {
      color: #e84231;
      font-weight: 900;
    }

    @media (max-width: 991px) {
      .footer-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
      .footer {
        padding-bottom: 86px;
      }

      .footer-grid,
      .footer-bottom {
        grid-template-columns: 1fr;
      }

      .footer-grid {
        display: grid;
        gap: 20px;
      }

      .footer-bottom {
        flex-direction: column;
      }
    }
  `]
})
export class Footer {}
