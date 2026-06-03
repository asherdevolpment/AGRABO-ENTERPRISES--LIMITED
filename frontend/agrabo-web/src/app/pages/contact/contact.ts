import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule],
  template: `
    <section class="contact-page">
      <div class="page-frame">
        <header class="page-head">
          <div>
            <span>Contact</span>
            <h1>How can we help?</h1>
            <p>Orders, delivery, bulk supply, and partnerships.</p>
          </div>
        </header>

        <section class="contact-methods" aria-label="Contact methods">
          @for (item of contactMethods; track item.title) {
            <a [href]="item.href" [target]="item.external ? '_blank' : null" [rel]="item.external ? 'noopener' : null" [class.primary]="item.primary">
              <i [class]="item.icon"></i>
              <span>
                <strong>{{ item.title }}</strong>
                <small>{{ item.value }}</small>
              </span>
            </a>
          }
        </section>

        <section class="contact-layout">
          <form class="message-form" [formGroup]="form" (ngSubmit)="submit()">
            <div class="form-title">
              <h2>Send a message</h2>
              <p>Short details are enough. We will reply by phone, WhatsApp, or email.</p>
            </div>

            @if (messageSent()) {
              <div class="message-success"><i class="bi bi-check-circle-fill"></i>Message sent.</div>
            }

            <div class="form-grid">
              <label><span>Name *</span><input class="form-control" placeholder="Your name" formControlName="name"></label>
              <label><span>Phone *</span><input class="form-control" placeholder="0700 000 000" formControlName="phone"></label>
              <label><span>Email</span><input class="form-control" type="email" placeholder="name@example.com" formControlName="email"></label>
              <label>
                <span>Subject *</span>
                <select class="form-select" formControlName="subject">
                  <option value="">Select subject</option>
                  <option>Product order</option>
                  <option>Bulk supply</option>
                  <option>Delivery question</option>
                  <option>Product availability</option>
                  <option>Partnership</option>
                  <option>General inquiry</option>
                </select>
              </label>
              <label class="wide"><span>Message *</span><textarea class="form-control" rows="4" placeholder="Your message" formControlName="message"></textarea></label>
            </div>

            <button class="btn btn-agrabo w-100" type="submit" [disabled]="form.invalid">Send message</button>
          </form>

          <aside class="contact-notes">
            @for (item of responseItems; track item.title) {
              <div>
                <i [class]="item.icon"></i>
                <strong>{{ item.title }}</strong>
                <span>{{ item.copy }}</span>
              </div>
            }
          </aside>
        </section>
      </div>
    </section>
  `,
  styles: [`
    .contact-page {
      background: #fff;
      padding: 18px 0 28px;
    }

    .page-frame {
      width: min(100% - 32px, 1180px);
      margin-inline: auto;
    }

    .page-head {
      border-bottom: 1px solid var(--agrabo-line);
      padding-bottom: 14px;
      margin-bottom: 16px;
    }

    .page-head span {
      color: var(--agrabo-green);
      font-size: 0.72rem;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .page-head h1 {
      color: var(--agrabo-deep);
      font-size: clamp(1.6rem, 3vw, 2.35rem);
      font-weight: 900;
      margin: 4px 0;
    }

    .page-head p {
      color: var(--agrabo-muted);
      font-size: 0.9rem;
      margin: 0;
    }

    .contact-methods {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }

    .contact-methods a {
      display: grid;
      grid-template-columns: 38px minmax(0, 1fr);
      align-items: center;
      gap: 10px;
      min-height: 68px;
      color: var(--agrabo-deep);
      background: #fff;
      border: 1px solid var(--agrabo-line);
      border-radius: 10px;
      padding: 10px 12px;
      text-decoration: none;
    }

    .contact-methods a.primary {
      color: #fff;
      background: var(--agrabo-green-dark);
      border-color: var(--agrabo-green-dark);
    }

    .contact-methods i {
      color: var(--agrabo-green);
      font-size: 1.2rem;
    }

    .contact-methods a.primary i {
      color: var(--agrabo-gold);
    }

    .contact-methods strong,
    .contact-methods small {
      display: block;
    }

    .contact-methods strong {
      font-size: 0.88rem;
      font-weight: 900;
    }

    .contact-methods small {
      color: var(--agrabo-muted);
      font-size: 0.76rem;
      font-weight: 700;
      overflow-wrap: anywhere;
    }

    .contact-methods a.primary small {
      color: rgba(255, 255, 255, 0.78);
    }

    .contact-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 330px;
      gap: 20px;
      align-items: start;
    }

    .message-form,
    .contact-notes {
      background: #fff;
      border: 1px solid var(--agrabo-line);
      border-radius: 10px;
      box-shadow: var(--agrabo-shadow-soft);
      padding: 18px;
    }

    .form-title h2 {
      color: var(--agrabo-deep);
      font-size: 1.15rem;
      font-weight: 900;
      margin: 0 0 4px;
    }

    .form-title p {
      color: var(--agrabo-muted);
      font-size: 0.82rem;
      margin: 0 0 14px;
    }

    .message-success {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--agrabo-green);
      background: var(--agrabo-leaf);
      border-radius: 8px;
      padding: 9px 10px;
      font-size: 0.82rem;
      font-weight: 900;
      margin-bottom: 12px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .form-grid label {
      display: grid;
      gap: 5px;
    }

    .form-grid span {
      color: var(--agrabo-deep);
      font-size: 0.76rem;
      font-weight: 900;
    }

    .form-grid .wide {
      grid-column: 1 / -1;
    }

    .message-form .btn {
      min-height: 40px;
      margin-top: 12px;
      font-size: 0.86rem;
    }

    .contact-notes {
      display: grid;
      gap: 10px;
    }

    .contact-notes div {
      display: grid;
      grid-template-columns: 30px minmax(0, 1fr);
      gap: 3px 10px;
      align-items: center;
      border-bottom: 1px solid var(--agrabo-line);
      padding-bottom: 10px;
    }

    .contact-notes div:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    .contact-notes i {
      color: var(--agrabo-green);
      grid-row: span 2;
    }

    .contact-notes strong {
      color: var(--agrabo-deep);
      font-size: 0.86rem;
      font-weight: 900;
    }

    .contact-notes span {
      color: var(--agrabo-muted);
      font-size: 0.78rem;
      line-height: 1.35;
    }

    @media (max-width: 900px) {
      .contact-methods {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .contact-layout {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 560px) {
      .contact-methods,
      .form-grid {
        grid-template-columns: 1fr;
      }

      .form-grid .wide {
        grid-column: auto;
      }
    }
  `]
})
export class ContactPage {
  private readonly fb = inject(FormBuilder);
  private readonly contact = inject(ContactService);
  readonly messageSent = signal(false);

  readonly contactMethods = [
    { title: 'WhatsApp', value: '+256 706 506 319', icon: 'bi bi-whatsapp', href: 'https://wa.me/256706506319', external: true, primary: true },
    { title: 'Phone', value: '0706 506 319', icon: 'bi bi-telephone-fill', href: 'tel:+256706506319', external: false, primary: false },
    { title: 'Email', value: 'info@agrabo.ug', icon: 'bi bi-envelope-fill', href: 'mailto:info@agrabo.ug', external: false, primary: false },
    { title: 'Location', value: 'Kampala, Uganda', icon: 'bi bi-geo-alt-fill', href: 'https://www.google.com/maps?q=Kampala%2C%20Uganda', external: true, primary: false }
  ];

  readonly responseItems = [
    { title: 'Orders', copy: 'Sizes, prices, and delivery.', icon: 'bi bi-bag-check' },
    { title: 'Bulk', copy: 'Business and reseller supply.', icon: 'bi bi-box-seam' },
    { title: 'Delivery', copy: 'Confirmed by location.', icon: 'bi bi-truck' },
    { title: 'Fastest help', copy: 'Use WhatsApp for urgent issues.', icon: 'bi bi-headset' }
  ];

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: [''],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.messageSent.set(false);
    this.contact.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
        this.messageSent.set(true);
        Swal.fire('Message sent', 'AGRABO will reply soon.', 'success');
      },
      error: () => Swal.fire('Message not sent', 'Start the backend and XAMPP MySQL, then try again.', 'error')
    });
  }
}
