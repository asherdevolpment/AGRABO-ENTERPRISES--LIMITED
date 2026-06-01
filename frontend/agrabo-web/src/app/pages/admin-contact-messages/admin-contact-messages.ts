import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ContactService } from '../../services/contact.service';

interface AdminContactMessage {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
  status?: string;
  createdAt?: string;
}

@Component({
  selector: 'app-admin-contact-messages-page',
  imports: [AsyncPipe, DatePipe],
  template: `
    <section class="section-band admin-page">
      <div class="container">
        <p class="eyebrow">Admin</p>
        <h1 class="page-title mb-3">Contact messages</h1>
        <p class="text-muted">Messages submitted from the public contact form appear here.</p>

        <div class="message-grid">
          @if (messages$ | async; as messages) {
            @if (messages.length) {
              @for (message of messages; track message.id) {
                <article class="mini-card">
                  <div class="message-head">
                    <div>
                      <strong>{{ message.name || 'Website visitor' }}</strong>
                      <span>{{ message.subject || 'General inquiry' }}</span>
                    </div>
                    <small>{{ message.createdAt | date: 'mediumDate' }}</small>
                  </div>
                  <p>{{ message.message || 'No message provided.' }}</p>
                  <div class="message-contact">
                    <span><i class="bi bi-telephone"></i>{{ message.phone || '-' }}</span>
                    <span><i class="bi bi-envelope"></i>{{ message.email || '-' }}</span>
                  </div>
                </article>
              }
            } @else {
              <div class="mini-card">No contact messages yet. New website inquiries will show here.</div>
            }
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .message-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    .message-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }

    .message-head strong,
    .message-head span,
    .message-contact span {
      display: block;
    }

    .message-head span,
    .message-head small,
    .message-contact span {
      color: #6a5b55;
      font-size: 0.82rem;
    }

    .message-contact {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
    }

    .message-contact i {
      color: var(--agrabo-amber);
      margin-right: 6px;
    }

    @media (max-width: 768px) {
      .message-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminContactMessagesPage {
  private readonly contact = inject(ContactService);

  readonly messages$ = this.contact.list().pipe(
    map((items) => items as AdminContactMessage[]),
    catchError(() => of([] as AdminContactMessage[]))
  );
}
