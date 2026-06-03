import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-whatsapp-button',
  template: `
    <a class="whatsapp-float" [href]="url" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <i class="bi bi-whatsapp"></i>
    </a>
  `,
  styles: [`
    .whatsapp-float {
      position: fixed;
      right: 18px;
      bottom: 18px;
      width: 54px;
      height: 54px;
      display: grid;
      place-items: center;
      z-index: 20;
      color: #fff;
      background: #25d366;
      border-radius: 50%;
      box-shadow: 0 12px 28px rgba(31, 41, 51, 0.24);
      font-size: 1.55rem;
      text-decoration: none;
    }

    @media (max-width: 768px) {
      .whatsapp-float {
        left: 18px;
        right: 18px;
        bottom: 14px;
        width: auto;
        height: 54px;
        border-radius: 999px;
        gap: 10px;
        font-size: 1.4rem;
        font-weight: 900;
      }

      .whatsapp-float::after {
        content: "Order on WhatsApp";
        font-size: 1rem;
      }
    }
  `]
})
export class WhatsappButton {
  readonly url = `https://api.whatsapp.com/send?phone=${environment.whatsappNumber}`;
}
