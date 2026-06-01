import { AsyncPipe, DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  imports: [AsyncPipe, DecimalPipe, RouterLink],
  template: `
    <section class="section-band admin-dashboard">
      <div class="container">
        <p class="eyebrow">Admin dashboard</p>
        <h1 class="page-title mb-3">Business management overview</h1>
        <p class="text-muted mb-4">Public orders, bulk quote requests, contact messages, products, and settings connect back here.</p>

        @if (summary$ | async; as summary) {
          <div class="row g-3 mb-4">
            <div class="col-md-4 col-xl-2"><div class="mini-card h-100"><span>Total orders</span><strong>{{ summary.totalOrders }}</strong></div></div>
            <div class="col-md-4 col-xl-2"><div class="mini-card h-100"><span>Revenue</span><strong>UGX {{ summary.totalRevenue | number }}</strong></div></div>
            <div class="col-md-4 col-xl-2"><div class="mini-card h-100"><span>Pending</span><strong>{{ summary.pendingOrders }}</strong></div></div>
            <div class="col-md-4 col-xl-2"><div class="mini-card h-100"><span>Completed</span><strong>{{ summary.completedOrders }}</strong></div></div>
            <div class="col-md-4 col-xl-2"><div class="mini-card h-100"><span>Stock</span><strong>{{ summary.productsInStock }}</strong></div></div>
            <div class="col-md-4 col-xl-2"><div class="mini-card h-100"><span>Bulk requests</span><strong>{{ summary.bulkRequests }}</strong></div></div>
          </div>

          <div class="dashboard-grid">
            <div class="mini-card">
              <h2>Admin sections</h2>
              <div class="d-flex flex-wrap gap-2">
                <a class="btn btn-outline-dark" routerLink="/admin/products">Products</a>
                <a class="btn btn-outline-dark" routerLink="/admin/orders">Orders</a>
                <a class="btn btn-outline-dark" routerLink="/admin/bulk-requests">Bulk Requests</a>
                <a class="btn btn-outline-dark" routerLink="/admin/contact-messages">Messages</a>
                <a class="btn btn-outline-dark" routerLink="/admin/settings">Settings</a>
              </div>
            </div>
            <div class="mini-card">
              <h2>Recent website messages</h2>
              @if (summary.recentMessages?.length) {
                @for (message of summary.recentMessages; track message.name) {
                  <div class="recent-message">
                    <strong>{{ message.name || 'Website visitor' }}</strong>
                    <span>{{ message.subject || 'General inquiry' }}</span>
                    <p>{{ message.message }}</p>
                  </div>
                }
              } @else {
                <p class="mb-0 text-muted">No recent messages yet.</p>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .admin-dashboard .mini-card span {
      display: block;
      color: #6a5b55;
      font-size: 0.82rem;
      font-weight: 800;
    }

    .admin-dashboard .mini-card strong {
      color: var(--agrabo-deep);
      font-size: 1.5rem;
      font-weight: 900;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }

    .dashboard-grid h2 {
      color: var(--agrabo-brown);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.15rem;
      font-weight: 900;
      margin-bottom: 14px;
    }

    .recent-message {
      border-top: 1px solid rgba(189, 106, 0, 0.14);
      padding-top: 10px;
      margin-top: 10px;
    }

    .recent-message p {
      color: #4c3d36;
      font-size: 0.86rem;
      margin: 4px 0 0;
    }

    @media (max-width: 768px) {
      .dashboard-grid {
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
