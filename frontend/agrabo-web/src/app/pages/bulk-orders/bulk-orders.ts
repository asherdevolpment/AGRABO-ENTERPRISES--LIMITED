import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { BulkRequestService } from '../../services/bulk-request.service';

@Component({
  selector: 'app-bulk-orders-page',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="bulk-page">
      <div class="page-frame">
        <header class="page-head">
          <div>
            <span>Bulk supply</span>
            <h1>Buy Deli Honey in bulk</h1>
            <p>Select an option and send a short quote request.</p>
          </div>
          <a routerLink="/shop"><i class="bi bi-arrow-left"></i>Shop retail sizes</a>
        </header>

        <section class="bulk-layout">
          <div>
            <div class="option-grid">
              @for (item of bulkProducts; track item.package) {
                <button type="button" class="bulk-option" [class.active]="selectedPackage() === item.package" (click)="choosePackage(item.package)">
                  <img [src]="item.image" [alt]="item.name">
                  <span>
                    <strong>{{ item.name }}</strong>
                    <small>{{ item.short }}</small>
                  </span>
                  @if (item.featured) {
                    <b>Recommended</b>
                  }
                </button>
              }
            </div>

            <div class="note-row">
              @for (item of buyingNotes; track item.title) {
                <span><i [class]="item.icon"></i>{{ item.title }}</span>
              }
            </div>
          </div>

          <form class="quote-card" [formGroup]="form" (ngSubmit)="submit()">
            <div class="form-title">
              <h2>Request pricing</h2>
              <p>We confirm price by quantity, location, and supply frequency.</p>
            </div>

            @if (requestSent()) {
              <div class="quote-success"><i class="bi bi-check-circle-fill"></i>Request received.</div>
            }

            <div class="quote-grid">
              <label><span>Name *</span><input class="form-control" formControlName="name" placeholder="Your name"></label>
              <label><span>Phone *</span><input class="form-control" formControlName="phone" placeholder="0700 000 000"></label>
              <label>
                <span>Buyer type *</span>
                <select class="form-select" formControlName="buyerType">
                  <option value="">Select type</option>
                  <option>Retailer</option>
                  <option>Hotel / restaurant</option>
                  <option>School / institution</option>
                  <option>Reseller</option>
                  <option>Office / organization</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                <span>Package *</span>
                <select class="form-select" formControlName="quantity">
                  @for (item of bulkProducts; track item.package) {
                    <option [value]="item.package">{{ item.package }}</option>
                  }
                  <option>Custom request</option>
                </select>
              </label>
              <label><span>Estimated quantity *</span><input class="form-control" formControlName="estimatedQuantity" placeholder="e.g. 20L monthly"></label>
              <label><span>Delivery area *</span><input class="form-control" formControlName="location" placeholder="Town or district"></label>
              <label class="wide"><span>Message</span><textarea class="form-control" rows="3" formControlName="message" placeholder="Optional note"></textarea></label>
            </div>

            <button class="btn btn-agrabo w-100" type="submit" [disabled]="form.invalid">Submit request</button>
            <a class="whatsapp-line" href="https://wa.me/256706506319" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i>WhatsApp bulk team</a>
          </form>
        </section>
      </div>
    </section>
  `,
  styles: [`
    .bulk-page {
      background: #fff;
      padding: 18px 0 28px;
    }

    .page-frame {
      width: min(100% - 32px, 1180px);
      margin-inline: auto;
    }

    .page-head {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 16px;
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
      font-size: clamp(1.6rem, 3vw, 2.45rem);
      font-weight: 900;
      margin: 4px 0 4px;
    }

    .page-head p {
      color: var(--agrabo-muted);
      font-size: 0.9rem;
      margin: 0;
    }

    .page-head a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--agrabo-green);
      font-size: 0.86rem;
      font-weight: 900;
      text-decoration: none;
      white-space: nowrap;
    }

    .bulk-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 390px;
      gap: 22px;
      align-items: start;
    }

    .option-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .bulk-option {
      position: relative;
      display: grid;
      grid-template-columns: 82px minmax(0, 1fr);
      align-items: center;
      gap: 14px;
      min-height: 108px;
      background: #fff;
      border: 1px solid var(--agrabo-line);
      border-radius: 10px;
      padding: 12px;
      text-align: left;
    }

    .bulk-option.active,
    .bulk-option:hover {
      border-color: var(--agrabo-amber);
      box-shadow: var(--agrabo-shadow-soft);
    }

    .bulk-option img {
      width: 72px;
      height: 72px;
      object-fit: contain;
      background: #fff8ee;
      border-radius: 8px;
      padding: 6px;
    }

    .bulk-option strong,
    .bulk-option small {
      display: block;
    }

    .bulk-option strong {
      color: var(--agrabo-deep);
      font-size: 0.95rem;
      font-weight: 900;
      margin-bottom: 4px;
    }

    .bulk-option small {
      color: var(--agrabo-muted);
      font-size: 0.78rem;
      font-weight: 700;
    }

    .bulk-option b {
      position: absolute;
      top: 8px;
      right: 8px;
      color: var(--agrabo-amber);
      font-size: 0.68rem;
      font-weight: 900;
    }

    .note-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-top: 12px;
    }

    .note-row span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 42px;
      color: #463f39;
      border: 1px solid var(--agrabo-line);
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 800;
    }

    .note-row i {
      color: var(--agrabo-green);
    }

    .quote-card {
      background: #fff;
      border: 1px solid var(--agrabo-line);
      border-radius: 10px;
      padding: 18px;
      box-shadow: var(--agrabo-shadow-soft);
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
      line-height: 1.4;
      margin: 0 0 14px;
    }

    .quote-success {
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

    .quote-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .quote-grid label {
      display: grid;
      gap: 5px;
    }

    .quote-grid span {
      color: var(--agrabo-deep);
      font-size: 0.76rem;
      font-weight: 900;
    }

    .quote-grid .wide {
      grid-column: 1 / -1;
    }

    .quote-card .btn {
      min-height: 40px;
      margin-top: 12px;
      font-size: 0.86rem;
    }

    .whatsapp-line {
      display: flex;
      justify-content: center;
      gap: 8px;
      color: var(--agrabo-green);
      font-size: 0.84rem;
      font-weight: 900;
      margin-top: 10px;
      text-decoration: none;
    }

    @media (max-width: 960px) {
      .bulk-layout {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .page-head {
        align-items: start;
        flex-direction: column;
      }

      .option-grid,
      .note-row,
      .quote-grid {
        grid-template-columns: 1fr;
      }

      .quote-grid .wide {
        grid-column: auto;
      }
    }
  `]
})
export class BulkOrdersPage {
  private readonly fb = inject(FormBuilder);
  private readonly bulkRequests = inject(BulkRequestService);
  readonly requestSent = signal(false);
  readonly selectedPackage = signal('20L');

  readonly bulkProducts = [
    { name: '5L Honey Pack', package: '5L', short: 'Small business supply', image: 'assets/products/deli-honey-bulk.png', featured: false },
    { name: '20L Honey Pack', package: '20L', short: 'Best value for business', image: 'assets/products/deli-honey-bulk.png', featured: true },
    { name: 'Carton Orders', package: 'Cartons', short: 'Retail-ready jars', image: 'assets/PRODUCT TEMLATE .png', featured: false },
    { name: 'Repeat Supply', package: 'Recurring supply', short: 'Scheduled restock', image: 'assets/products/deli-honey-1kg.png', featured: false }
  ];

  readonly buyingNotes = [
    { title: 'Quantity pricing', icon: 'bi bi-tags' },
    { title: 'Delivery or pickup', icon: 'bi bi-truck' },
    { title: 'Business supply', icon: 'bi bi-building-check' }
  ];

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    buyerType: ['', Validators.required],
    quantity: ['20L', Validators.required],
    estimatedQuantity: ['', Validators.required],
    location: ['', Validators.required],
    message: ['']
  });

  choosePackage(packageName: string): void {
    this.selectedPackage.set(packageName);
    this.form.controls.quantity.setValue(packageName);
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.requestSent.set(false);
    this.bulkRequests.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset({ quantity: this.selectedPackage() });
        this.requestSent.set(true);
        Swal.fire('Request received', 'AGRABO will contact you with a quote.', 'success');
      },
      error: () => Swal.fire('Request not sent', 'Start the backend and XAMPP MySQL, then try again.', 'error')
    });
  }
}
