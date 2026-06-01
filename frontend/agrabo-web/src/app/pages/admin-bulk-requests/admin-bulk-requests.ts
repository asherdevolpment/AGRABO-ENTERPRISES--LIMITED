import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { BulkRequestService } from '../../services/bulk-request.service';

interface AdminBulkRequest {
  id?: number;
  name?: string;
  businessName?: string;
  phone?: string;
  email?: string;
  location?: string;
  quantity?: string;
  estimatedQuantity?: string;
  message?: string;
  status?: string;
  createdAt?: string;
}

@Component({
  selector: 'app-admin-bulk-requests-page',
  imports: [AsyncPipe, DatePipe],
  template: `
    <section class="section-band admin-page">
      <div class="container">
        <p class="eyebrow">Admin</p>
        <h1 class="page-title mb-3">Bulk requests</h1>
        <p class="text-muted">Quote requests submitted from the public bulk supply page appear here.</p>

        <div class="mini-card">
          @if (requests$ | async; as requests) {
            @if (requests.length) {
              <div class="table-responsive">
                <table class="table align-middle">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Package</th>
                      <th>Contact</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (request of requests; track request.id) {
                      <tr>
                        <td><strong>{{ request.name || 'Customer' }}</strong><br><span>{{ request.businessName || 'Individual buyer' }}</span></td>
                        <td>{{ request.quantity || 'Not specified' }}<br><span>{{ request.estimatedQuantity || 'Quantity pending' }}</span></td>
                        <td>{{ request.phone || '-' }}<br><span>{{ request.email || '' }}</span></td>
                        <td>{{ request.location || '-' }}</td>
                        <td>{{ request.createdAt | date: 'mediumDate' }}</td>
                        <td><span class="status-pill">{{ request.status || 'new' }}</span></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            } @else {
              <p class="mb-0">No bulk requests yet. New submissions from the bulk page will show here.</p>
            }
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .admin-page span {
      color: #6a5b55;
      font-size: 0.82rem;
    }

    .status-pill {
      display: inline-block;
      color: var(--agrabo-green) !important;
      background: rgba(39, 107, 50, 0.1);
      border-radius: 999px;
      padding: 4px 10px;
      font-weight: 900;
      text-transform: capitalize;
    }
  `]
})
export class AdminBulkRequestsPage {
  private readonly bulkRequests = inject(BulkRequestService);

  readonly requests$ = this.bulkRequests.list().pipe(
    map((items) => items as AdminBulkRequest[]),
    catchError(() => of([] as AdminBulkRequest[]))
  );
}
