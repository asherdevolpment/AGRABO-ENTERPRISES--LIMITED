import { Component } from '@angular/core';
import { AdminShell } from '../../components/admin-shell/admin-shell';

@Component({
  selector: 'app-admin-reports-page',
  imports: [AdminShell],
  template: `
    <app-admin-shell>
      <div class="admin-page-head">
        <div>
          <span class="eyebrow">Reports</span>
          <h1>Sales reports</h1>
          <p>Stage 1 reporting focuses on practical numbers: sales, best sellers, pending payments, and bulk leads.</p>
        </div>
      </div>

      <section class="report-grid">
        @for (report of reports; track report.title) {
          <article>
            <i [class]="report.icon"></i>
            <strong>{{ report.title }}</strong>
            <span>{{ report.value }}</span>
            <p>{{ report.copy }}</p>
          </article>
        }
      </section>

      <section class="notice-card">
        <strong>Backend-ready report area</strong>
        <p>Once the API exposes daily, weekly, and monthly sales totals, this page can show live totals, exportable reports, and best-selling product trends.</p>
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

    .report-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
    }

    .report-grid article,
    .notice-card {
      background: #fff;
      border: 1px solid rgba(31, 122, 58, 0.14);
      border-radius: 8px;
      box-shadow: 0 12px 30px rgba(31, 122, 58, 0.06);
    }

    .report-grid article {
      padding: 18px;
    }

    .report-grid i {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      color: var(--agrabo-green);
      background: var(--agrabo-leaf);
      border-radius: 999px;
      font-size: 1.2rem;
      margin-bottom: 14px;
    }

    .report-grid strong,
    .report-grid span {
      display: block;
    }

    .report-grid strong,
    .notice-card strong {
      color: var(--agrabo-deep);
      font-weight: 900;
    }

    .report-grid span {
      color: var(--agrabo-green);
      font-size: 1.6rem;
      font-weight: 900;
      margin: 4px 0;
    }

    .report-grid p,
    .notice-card p {
      font-size: 0.86rem;
      line-height: 1.5;
    }

    .notice-card {
      margin-top: 16px;
      padding: 18px;
    }

    @media (max-width: 1000px) {
      .report-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 620px) {
      .report-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminReportsPage {
  readonly reports = [
    { title: 'Today sales', value: 'UGX 0', copy: 'Connects to daily order totals once available.', icon: 'bi bi-graph-up' },
    { title: 'Pending payments', value: '0', copy: 'Manual mobile money, cash, and bank transfer confirmations.', icon: 'bi bi-cash-coin' },
    { title: 'Best seller', value: '500g', copy: 'Useful for planning inventory and promotions.', icon: 'bi bi-award' },
    { title: 'Bulk leads', value: '0', copy: 'Quote requests that need follow-up.', icon: 'bi bi-briefcase' }
  ];
}
