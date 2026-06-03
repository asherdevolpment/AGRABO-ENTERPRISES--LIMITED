import { AsyncPipe, DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminShell } from '../../components/admin-shell/admin-shell';

interface DashboardSummary {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  productsInStock: number;
  bulkRequests: number;
  recentMessages?: Array<{ name?: string; subject?: string; message?: string }>;
}

@Component({
  selector: 'app-admin-dashboard-page',
  imports: [AdminShell, AsyncPipe, DecimalPipe, RouterLink],
  template: `
    <app-admin-shell>
      <div class="admin-page-head">
        <div>
          <span class="eyebrow">Dashboard</span>
          <h1>Business overview</h1>
          <p>Monitor orders, revenue, stock, bulk quote requests, and customer messages.</p>
        </div>
        <a class="btn btn-agrabo" routerLink="/admin/products">Manage products</a>
      </div>

      @if (summary$ | async; as summary) {
        <section class="metric-grid">
          <article><span>Total orders</span><strong>{{ summary.totalOrders }}</strong><small>All submitted orders</small></article>
          <article><span>Revenue</span><strong>UGX {{ summary.totalRevenue | number }}</strong><small>Recorded order value</small></article>
          <article><span>Pending</span><strong>{{ summary.pendingOrders }}</strong><small>Need follow-up</small></article>
          <article><span>Completed</span><strong>{{ summary.completedOrders }}</strong><small>Fulfilled orders</small></article>
          <article><span>Stock</span><strong>{{ summary.productsInStock }}</strong><small>Available units</small></article>
          <article><span>Bulk requests</span><strong>{{ summary.bulkRequests }}</strong><small>Quote pipeline</small></article>
        </section>

        <section class="dashboard-grid">
          <article class="admin-card">
            <div class="card-head">
              <div><span class="eyebrow">Shortcuts</span><h2>Admin sections</h2></div>
            </div>
            <div class="shortcut-grid">
              <a routerLink="/admin/orders"><i class="bi bi-receipt"></i><span>Orders</span></a>
              <a routerLink="/admin/customers"><i class="bi bi-people"></i><span>Customers</span></a>
              <a routerLink="/admin/inventory"><i class="bi bi-clipboard-data"></i><span>Inventory</span></a>
              <a routerLink="/admin/bulk-requests"><i class="bi bi-briefcase"></i><span>Bulk requests</span></a>
              <a routerLink="/admin/contact-messages"><i class="bi bi-envelope"></i><span>Messages</span></a>
              <a routerLink="/admin/reports"><i class="bi bi-bar-chart"></i><span>Reports</span></a>
              <a routerLink="/admin/settings"><i class="bi bi-gear"></i><span>Settings</span></a>
            </div>
          </article>

          <article class="admin-card">
            <div class="card-head">
              <div><span class="eyebrow">Inbox</span><h2>Recent messages</h2></div>
              <a routerLink="/admin/contact-messages">View all</a>
            </div>
            @if (summary.recentMessages?.length) {
              <div class="message-list">
                @for (message of summary.recentMessages; track message.name) {
                  <div>
                    <strong>{{ message.name || 'Website visitor' }}</strong>
                    <span>{{ message.subject || 'General inquiry' }}</span>
                    <p>{{ message.message }}</p>
                  </div>
                }
              </div>
            } @else {
              <div class="empty-state">No recent messages yet.</div>
            }
          </article>
        </section>
      }
    </app-admin-shell>
  `,
  styles: [`
    .admin-page-head {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 18px;
      margin-bottom: 22px;
    }

    h1,
    h2 {
      color: var(--agrabo-deep);
      font-family: Georgia, "Times New Roman", serif;
      font-weight: 900;
    }

    h1 {
      font-size: clamp(2rem, 4vw, 3.15rem);
      margin: 0 0 8px;
    }

    h2 {
      font-size: 1.25rem;
      margin: 0;
    }

    p {
      color: #5d4c45;
      margin: 0;
    }

    .metric-grid {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 14px;
      margin-bottom: 18px;
    }

    .metric-grid article,
    .admin-card {
      background: #fff;
      border: 1px solid rgba(31, 122, 58, 0.14);
      border-radius: 8px;
      box-shadow: 0 12px 30px rgba(31, 122, 58, 0.06);
    }

    .metric-grid article {
      padding: 16px;
    }

    .metric-grid span,
    .metric-grid small {
      display: block;
    }

    .metric-grid span {
      color: #69776b;
      font-size: 0.78rem;
      font-weight: 900;
    }

    .metric-grid strong {
      color: var(--agrabo-deep);
      display: block;
      font-size: 1.55rem;
      font-weight: 900;
      margin: 4px 0;
    }

    .metric-grid small {
      color: #839085;
      font-size: 0.72rem;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 18px;
    }

    .admin-card {
      padding: 18px;
    }

    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }

    .card-head a {
      color: var(--agrabo-green);
      font-weight: 900;
      text-decoration: none;
    }

    .shortcut-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .shortcut-grid a {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--agrabo-deep);
      background: var(--agrabo-mint);
      border-radius: 8px;
      min-height: 54px;
      padding: 0 14px;
      font-weight: 900;
      text-decoration: none;
    }

    .shortcut-grid i {
      color: var(--agrabo-green);
    }

    .message-list {
      display: grid;
      gap: 12px;
    }

    .message-list div,
    .empty-state {
      background: var(--agrabo-mint);
      border-radius: 8px;
      padding: 12px;
    }

    .message-list strong,
    .message-list span {
      display: block;
    }

    .message-list span {
      color: var(--agrabo-green);
      font-size: 0.78rem;
      font-weight: 900;
    }

    @media (max-width: 1200px) {
      .metric-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 820px) {
      .admin-page-head,
      .dashboard-grid {
        grid-template-columns: 1fr;
        flex-direction: column;
        align-items: flex-start;
      }

      .metric-grid,
      .shortcut-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 520px) {
      .metric-grid,
      .shortcut-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminDashboardPage {
  private readonly http = inject(HttpClient);

  readonly summary$ = this.http
    .get<DashboardSummary>(`${environment.apiUrl}/dashboard/summary`, { headers: this.authHeaders() })
    .pipe(
      catchError(() =>
        of({
          totalOrders: 0,
          totalRevenue: 0,
          pendingOrders: 0,
          completedOrders: 0,
          productsInStock: 0,
          bulkRequests: 0,
          recentMessages: []
        })
      )
    );

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('agrabo_admin_token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }
}
