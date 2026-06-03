import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AdminShell } from '../../components/admin-shell/admin-shell';
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
  imports: [AdminShell, AsyncPipe, DatePipe],
  template: `
    <app-admin-shell>
      <div class="admin-page-head">
        <div>
          <span class="eyebrow">Inbox</span>
          <h1>Contact messages</h1>
          <p>Messages from the public contact form appear here for follow-up.</p>
        </div>
      </div>

      <section class="message-grid">
        @if (messages$ | async; as messages) {
          @if (messages.length) {
            @for (message of messages; track message.id) {
              <article class="message-card">
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
            <div class="empty-state">No contact messages yet. New website inquiries will show here.</div>
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

    .message-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .message-card,
    .empty-state {
      background: #fff;
      border: 1px solid rgba(31, 122, 58, 0.14);
      border-radius: 8px;
      box-shadow: 0 12px 30px rgba(31, 122, 58, 0.06);
      padding: 18px;
    }

    .message-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
    }

    .message-head strong,
    .message-head span,
    .message-contact span {
      display: block;
    }

    .message-head span {
      color: var(--agrabo-green);
      font-size: 0.8rem;
      font-weight: 900;
    }

    .message-head small,
    .message-contact span {
      color: #6f7a70;
      font-size: 0.8rem;
    }

    .message-card p {
      background: var(--agrabo-mint);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
    }

    .message-contact {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
    }

    .message-contact i {
      color: var(--agrabo-green);
      margin-right: 6px;
    }

    .empty-state {
      grid-column: 1 / -1;
      color: #5d4c45;
      min-height: 180px;
      display: grid;
      place-items: center;
    }

    @media (max-width: 820px) {
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
