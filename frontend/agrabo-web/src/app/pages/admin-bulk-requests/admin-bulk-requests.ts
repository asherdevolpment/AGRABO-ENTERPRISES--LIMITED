import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AdminShell } from '../../components/admin-shell/admin-shell';
import { BulkRequestService } from '../../services/bulk-request.service';

interface AdminBulkRequest {
  id?: number;
  name?: string;
  businessName?: string;
  phone?: string;
  email?: string;
  location?: string;
  buyerType?: string;
  quantity?: string;
  estimatedQuantity?: string;
  message?: string;
  status?: string;
  createdAt?: string;
}

@Component({
  selector: 'app-admin-bulk-requests-page',
  imports: [AdminShell, AsyncPipe, DatePipe],
  template: `
    <app-admin-shell>
      <div class="admin-page-head">
        <div>
          <span class="eyebrow">Bulk pipeline</span>
          <h1>Bulk quote requests</h1>
          <p>Review business supply requests and follow up with pricing, availability, and delivery details.</p>
        </div>
      </div>

      <section class="request-grid">
        @if (requests$ | async; as requests) {
          @if (requests.length) {
            @for (request of requests; track request.id) {
              <article class="request-card">
                <div class="request-head">
                  <div>
                    <strong>{{ request.name || 'Customer' }}</strong>
                    <span>{{ request.businessName || request.buyerType || 'Bulk buyer' }}</span>
                  </div>
                  <small>{{ request.createdAt | date: 'mediumDate' }}</small>
                </div>
                <dl>
                  <div><dt>Package</dt><dd>{{ request.quantity || 'Not specified' }}</dd></div>
                  <div><dt>Quantity</dt><dd>{{ request.estimatedQuantity || 'Pending' }}</dd></div>
                  <div><dt>Location</dt><dd>{{ request.location || '-' }}</dd></div>
                  <div><dt>Contact</dt><dd>{{ request.phone || '-' }}</dd></div>
                </dl>
                @if (request.message) {
                  <p>{{ request.message }}</p>
                }
                <span class="status-pill">{{ request.status || 'new' }}</span>
              </article>
            }
          } @else {
            <div class="empty-state">No bulk requests yet. New submissions from the bulk page will show here.</div>
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

    .request-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .request-card,
    .empty-state {
      background: #fff;
      border: 1px solid rgba(31, 122, 58, 0.14);
      border-radius: 8px;
      box-shadow: 0 12px 30px rgba(31, 122, 58, 0.06);
      padding: 18px;
    }

    .request-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }

    .request-head strong,
    .request-head span {
      display: block;
    }

    .request-head span,
    .request-head small {
      color: #6f7a70;
      font-size: 0.8rem;
    }

    dl {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin: 0 0 12px;
    }

    dt {
      color: #738076;
      font-size: 0.72rem;
      font-weight: 900;
      text-transform: uppercase;
    }

    dd {
      color: var(--agrabo-deep);
      margin: 0;
      font-weight: 800;
    }

    .request-card p {
      background: var(--agrabo-mint);
      border-radius: 8px;
      padding: 10px;
      font-size: 0.86rem;
      margin-bottom: 12px;
    }

    .status-pill {
      display: inline-block;
      color: var(--agrabo-green);
      background: var(--agrabo-leaf);
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 0.76rem;
      font-weight: 900;
      text-transform: capitalize;
    }

    .empty-state {
      grid-column: 1 / -1;
      color: #5d4c45;
      min-height: 180px;
      display: grid;
      place-items: center;
    }

    @media (max-width: 820px) {
      .request-grid,
      dl {
        grid-template-columns: 1fr;
      }
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
