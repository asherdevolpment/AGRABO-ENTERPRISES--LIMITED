import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminShell } from '../../components/admin-shell/admin-shell';

interface AdminOrder {
  id?: number;
  customerName?: string;
  name?: string;
  customerPhone?: string;
  phone?: string;
  location?: string;
  total?: number;
  totalAmount?: number;
  paymentMethod?: string;
  status?: string;
  createdAt?: string;
}

@Component({
  selector: 'app-admin-orders-page',
  imports: [AdminShell, AsyncPipe, DatePipe, DecimalPipe],
  template: `
    <app-admin-shell>
      <div class="admin-page-head">
        <div>
          <span class="eyebrow">Orders</span>
          <h1>Customer orders</h1>
          <p>Track orders submitted from checkout and follow up through WhatsApp or phone.</p>
        </div>
      </div>

      <section class="admin-card">
        @if (orders$ | async; as orders) {
          @if (orders.length) {
            <div class="table-responsive">
              <table class="table align-middle">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Location</th>
                    <th>Payment</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  @for (order of orders; track order.id) {
                    <tr>
                      <td><strong>#{{ order.id || '-' }}</strong></td>
                      <td>{{ order.customerName || order.name || 'Customer' }}<br><span>{{ order.customerPhone || order.phone || '-' }}</span></td>
                      <td>{{ order.location || '-' }}</td>
                      <td>{{ order.paymentMethod || 'Pending' }}</td>
                      <td>UGX {{ (order.total || order.totalAmount || 0) | number }}</td>
                      <td><span class="status-pill">{{ order.status || 'new' }}</span></td>
                      <td>{{ order.createdAt | date: 'mediumDate' }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          } @else {
            <div class="empty-state">
              <i class="bi bi-receipt"></i>
              <strong>No orders yet</strong>
              <span>New checkout submissions will appear here.</span>
            </div>
          }
        }
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
      padding: 8px 16px;
    }

    th {
      color: #66756a;
      font-size: 0.76rem;
      text-transform: uppercase;
    }

    td span {
      color: #6f7a70;
      font-size: 0.8rem;
    }

    .status-pill {
      display: inline-block;
      color: var(--agrabo-green) !important;
      background: var(--agrabo-leaf);
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 0.76rem;
      font-weight: 900;
      text-transform: capitalize;
    }

    .empty-state {
      display: grid;
      place-items: center;
      min-height: 260px;
      color: #5d4c45;
      text-align: center;
    }

    .empty-state i {
      color: var(--agrabo-green);
      font-size: 2.4rem;
    }

    .empty-state strong,
    .empty-state span {
      display: block;
    }
  `]
})
export class AdminOrdersPage {
  private readonly http = inject(HttpClient);

  readonly orders$ = this.http.get<unknown[]>(`${environment.apiUrl}/orders`, { headers: this.authHeaders() }).pipe(
    map((orders) => orders as AdminOrder[]),
    catchError(() => of([] as AdminOrder[]))
  );

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('agrabo_admin_token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }
}
