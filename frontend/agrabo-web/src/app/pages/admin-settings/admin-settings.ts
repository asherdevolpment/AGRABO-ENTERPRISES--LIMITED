import { Component } from '@angular/core';
import { AdminShell } from '../../components/admin-shell/admin-shell';

@Component({
  selector: 'app-admin-settings-page',
  imports: [AdminShell],
  template: `
    <app-admin-shell>
      <div class="admin-page-head">
        <div>
          <span class="eyebrow">Settings</span>
          <h1>Store settings</h1>
          <p>Central place for storefront contact details, checkout defaults, and delivery guidance.</p>
        </div>
      </div>

      <section class="settings-grid">
        @for (item of settings; track item.title) {
          <article>
            <i [class]="item.icon"></i>
            <div>
              <strong>{{ item.title }}</strong>
              <span>{{ item.value }}</span>
              <p>{{ item.copy }}</p>
            </div>
          </article>
        }
      </section>

      <section class="notice-card">
        <strong>Next admin upgrade</strong>
        <p>These settings are presented professionally now. The next step is connecting edit forms to the backend so AGRABO can update phone numbers, WhatsApp links, delivery fees, and delivery areas from this screen.</p>
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

    .settings-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .settings-grid article,
    .notice-card {
      background: #fff;
      border: 1px solid rgba(31, 122, 58, 0.14);
      border-radius: 8px;
      box-shadow: 0 12px 30px rgba(31, 122, 58, 0.06);
    }

    .settings-grid article {
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr);
      gap: 14px;
      padding: 18px;
    }

    .settings-grid i {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      color: var(--agrabo-green);
      background: var(--agrabo-leaf);
      border-radius: 999px;
      font-size: 1.2rem;
    }

    .settings-grid strong,
    .settings-grid span {
      display: block;
    }

    .settings-grid strong,
    .notice-card strong {
      color: var(--agrabo-deep);
      font-weight: 900;
    }

    .settings-grid span {
      color: var(--agrabo-green);
      font-weight: 900;
      margin: 2px 0 6px;
    }

    .settings-grid p {
      font-size: 0.86rem;
      line-height: 1.5;
    }

    .notice-card {
      margin-top: 16px;
      padding: 18px;
    }

    .notice-card p {
      margin-top: 4px;
      line-height: 1.55;
    }

    @media (max-width: 760px) {
      .settings-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminSettingsPage {
  readonly settings = [
    { title: 'WhatsApp ordering', value: '0706506319', copy: 'Used by checkout, contact, and quick ordering links.', icon: 'bi bi-whatsapp' },
    { title: 'Customer phone', value: '0706506319 / 0772987654', copy: 'Displayed on contact and customer support surfaces.', icon: 'bi bi-telephone' },
    { title: 'Email address', value: 'info@agrabo.ug', copy: 'Used for partnerships, formal inquiries, and business requests.', icon: 'bi bi-envelope' },
    { title: 'Delivery fee', value: 'UGX 5,000', copy: 'Default checkout delivery fee for public orders.', icon: 'bi bi-truck' },
    { title: 'Business hours', value: 'Mon - Sat, 8:00 AM - 6:00 PM', copy: 'Customer response hours shown across support pages.', icon: 'bi bi-clock' },
    { title: 'Storefront focus', value: 'Shop / Bulk / Contact', copy: 'Public navigation is intentionally minimal and sales-focused.', icon: 'bi bi-shop' }
  ];
}
