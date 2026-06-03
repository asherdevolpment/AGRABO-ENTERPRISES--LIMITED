import { Component } from '@angular/core';
import { AdminShell } from '../../components/admin-shell/admin-shell';

@Component({
  selector: 'app-admin-customers-page',
  imports: [AdminShell],
  template: `
    <app-admin-shell>
      <div class="admin-page-head">
        <div>
          <span class="eyebrow">Customers</span>
          <h1>Customer list</h1>
          <p>Track customer contacts, repeat buyers, and follow-up opportunities from orders and inquiries.</p>
        </div>
      </div>

      <section class="admin-card">
        <div class="empty-state">
          <i class="bi bi-people"></i>
          <strong>Customer records are ready for backend connection</strong>
          <span>When the orders API exposes customers, names, phone numbers, locations, and repeat order history will appear here.</span>
        </div>
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
      padding: 24px;
    }

    .empty-state {
      display: grid;
      place-items: center;
      min-height: 280px;
      text-align: center;
    }

    .empty-state i {
      color: var(--agrabo-green);
      font-size: 2.6rem;
    }

    .empty-state strong,
    .empty-state span {
      display: block;
      max-width: 560px;
    }

    .empty-state strong {
      color: var(--agrabo-deep);
      font-size: 1.2rem;
      margin: 10px 0 6px;
    }

    .empty-state span {
      color: #5d4c45;
      line-height: 1.55;
    }
  `]
})
export class AdminCustomersPage {}
