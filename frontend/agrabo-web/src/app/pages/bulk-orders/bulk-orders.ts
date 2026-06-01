import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BulkRequestService } from '../../services/bulk-request.service';

@Component({
  selector: 'app-bulk-orders-page',
  imports: [DecimalPipe, ReactiveFormsModule],
  template: `
    <section class="bulk-hero">
      <div class="container bulk-hero-grid">
        <div class="bulk-hero-copy">
          <h1 class="page-title">Wholesale Honey for<br>Hotels, Restaurants &amp; Retailers</h1>
          <p class="lead">
            Reliable, high-quality honey in bulk quantities to keep your business running smoothly.
            100% pure, locally sourced from trusted Ugandan beekeepers.
          </p>
          <div class="bulk-hero-points">
            <div><i class="bi bi-droplet-fill"></i><strong>100% Pure</strong><span>No additives. No fillers.</span></div>
            <div><i class="bi bi-truck"></i><strong>Fast Delivery</strong><span>Across Uganda.</span></div>
            <div><i class="bi bi-people"></i><strong>Business Support</strong><span>Dedicated to you.</span></div>
          </div>
        </div>
        <div class="bulk-hero-visual" aria-hidden="true">
          <img src="assets/bulk_hero transparent .png" alt="">
        </div>
      </div>
    </section>

    <section class="bulk-page site-page">
      <div class="container">
        <div class="bulk-layout">
          <div class="bulk-main agrabo-card">
            <h2 class="panel-title"><i class="bi bi-box-seam"></i>Bulk Packages</h2>

            <div class="package-grid">
              @for (pkg of packages; track pkg.size) {
                <article class="package-card">
                  <img [src]="pkg.image" [alt]="pkg.size + ' Deli Honey package'">
                  <div>
                    <h3>{{ pkg.size }}</h3>
                    <ul>
                      @for (item of pkg.points; track item) {
                        <li><i class="bi bi-check-lg"></i>{{ item }}</li>
                      }
                    </ul>
                  </div>
                  <p>From <strong>UGX {{ pkg.price | number }}</strong></p>
                </article>
              }
            </div>

            <div class="bulk-specs">
              @for (spec of specs; track spec.title) {
                <div>
                  <i [class]="spec.icon"></i>
                  <strong>{{ spec.title }}</strong>
                  <span>{{ spec.copy }}</span>
                </div>
              }
            </div>
          </div>

          <form id="quote" class="quote-card agrabo-card" [formGroup]="form" (ngSubmit)="submit()">
            <div class="quote-head">
              <h2><i class="bi bi-award"></i>Get a Business Quote</h2>
              <p>Tell us your needs and we'll get back with the best offer.</p>
            </div>
            <div class="quote-body">
              <div class="quote-grid">
                <input class="form-control" placeholder="Full Name" formControlName="name">
                <input class="form-control" placeholder="Business Name" formControlName="businessName">
                <input class="form-control wide" placeholder="Phone / WhatsApp" formControlName="phone">
                <input class="form-control wide" placeholder="Email Address" formControlName="email">
                <input class="form-control wide" placeholder="Location / City" formControlName="location">
                <label>
                  <span>Product Size Interest</span>
                  <select class="form-select" formControlName="quantity">
                    <option value="">Select package size</option>
                    <option>5L</option>
                    <option>10L</option>
                    <option>20L</option>
                    <option>Custom supply</option>
                  </select>
                </label>
                <label>
                  <span>Estimated Quantity</span>
                  <input class="form-control" placeholder="e.g. 20L per week" formControlName="estimatedQuantity">
                </label>
                <label class="wide">
                  <span>Additional Message (Optional)</span>
                  <textarea class="form-control" rows="3" placeholder="Tell us more about your requirements..." formControlName="message"></textarea>
                </label>
              </div>
              <button class="btn quote-submit w-100" type="submit" [disabled]="form.invalid">
                <i class="bi bi-whatsapp me-2"></i>Get Quote on WhatsApp
              </button>
              <p class="quote-note">or we'll contact you via phone/email</p>
            </div>
          </form>
        </div>

        <div class="middle-grid">
          <section class="process-card agrabo-card">
            <h2 class="panel-title"><i class="bi bi-box-seam"></i>How It Works</h2>
            <div class="process-steps">
              @for (step of steps; track step.title) {
                <article>
                  <span>{{ $index + 1 }}</span>
                  <i [class]="step.icon"></i>
                  <strong>{{ step.title }}</strong>
                  <p>{{ step.copy }}</p>
                </article>
              }
            </div>
          </section>

          <section class="business-trust agrabo-card">
            <h2 class="panel-title"><i class="bi bi-patch-check"></i>Why Businesses Trust AGRABO</h2>
            <div class="business-grid">
              @for (item of businessTrust; track item.title) {
                <div>
                  <i [class]="item.icon"></i>
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.copy }}</span>
                </div>
              }
            </div>
          </section>
        </div>

        <section class="business-customers agrabo-card">
          <h2>What Our Business Customers Say</h2>
          <div class="customer-row">
            @for (customer of customers; track customer.name) {
              <article>
                <div class="customer-logo">{{ customer.logo }}</div>
                <div>
                  <strong>{{ customer.name }}</strong>
                  <span>{{ customer.location }}</span>
                  <p>"{{ customer.quote }}"</p>
                  <small>- {{ customer.role }}</small>
                </div>
                <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              </article>
            }
          </div>
        </section>

        <section class="supplier-cta">
          <div>
            <h2>Need a reliable honey supplier?</h2>
            <p>Let's build a sweet partnership for your business.</p>
          </div>
          <a class="btn btn-honey" href="#quote"><i class="bi bi-clipboard-check me-2"></i>Get a Business Quote</a>
          <a class="btn btn-agrabo" href="https://wa.me/256706506319" target="_blank" rel="noopener"><i class="bi bi-whatsapp me-2"></i>Chat on WhatsApp</a>
        </section>
      </div>
    </section>
  `,
  styles: [`
    .bulk-hero {
      min-height: clamp(230px, 21vw, 290px);
      display: flex;
      align-items: center;
      overflow: hidden;
      border-top: 1px solid rgba(242, 160, 0, 0.34);
      border-bottom: 1px solid rgba(242, 160, 0, 0.28);
      background:
        radial-gradient(circle at 78% 50%, rgba(242, 160, 0, 0.1), transparent 18rem),
        linear-gradient(90deg, #fffaf1 0%, #fffaf1 62%, #fff6e4 100%);
    }

    .bulk-hero-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(320px, 40%);
      gap: clamp(18px, 4vw, 48px);
      align-items: center;
    }

    .bulk-hero-copy {
      padding: clamp(24px, 3.4vw, 38px) 0;
      position: relative;
      z-index: 1;
    }

    .bulk-hero-copy .lead {
      max-width: 600px;
      color: #352923;
      font-size: 0.94rem;
      line-height: 1.55;
    }

    .bulk-hero-points {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin-top: 18px;
      max-width: 580px;
    }

    .bulk-hero-points div {
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      gap: 8px;
      align-items: center;
      padding: 0;
    }

    .bulk-hero-points i {
      color: var(--agrabo-amber);
      font-size: 1.25rem;
      grid-row: span 2;
    }

    .bulk-hero-points strong,
    .bulk-hero-points span {
      display: block;
    }

    .bulk-hero-points strong {
      color: var(--agrabo-deep);
      font-size: 0.76rem;
      font-weight: 900;
    }

    .bulk-hero-points span {
      color: #4e403a;
      font-size: 0.66rem;
      line-height: 1.25;
    }

    .bulk-hero-visual {
      align-self: stretch;
      display: grid;
      place-items: end center;
      position: relative;
      min-height: 240px;
      justify-self: end;
    }

    .bulk-hero-visual::before {
      content: "";
      position: absolute;
      inset: auto 10% 18px 18%;
      height: 26px;
      background: radial-gradient(ellipse, rgba(91, 37, 15, 0.12), transparent 70%);
      filter: blur(4px);
    }

    .bulk-hero-visual img {
      width: min(100%, 470px);
      max-height: 245px;
      object-fit: contain;
      filter: drop-shadow(0 16px 18px rgba(91, 37, 15, 0.1));
      position: relative;
      transform: translateY(4px);
    }

    .bulk-page {
      padding: 14px 0 0;
    }

    .bulk-page .agrabo-card,
    .bulk-main,
    .quote-card,
    .process-card,
    .business-trust,
    .business-customers {
      background: rgba(255, 253, 247, 0.78);
      box-shadow: 0 8px 22px rgba(91, 37, 15, 0.045);
    }

    .bulk-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 410px;
      gap: 18px;
      align-items: start;
    }

    .bulk-main,
    .quote-card,
    .process-card,
    .business-trust,
    .business-customers {
      padding: 16px;
    }

    .panel-title {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--agrabo-brown);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.16rem;
      font-weight: 900;
      margin: 0 0 12px;
    }

    .panel-title i {
      color: var(--agrabo-amber);
      font-size: 1.3rem;
    }

    .package-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .package-card {
      display: grid;
      grid-template-columns: 92px minmax(0, 1fr);
      gap: 12px;
      align-items: center;
      border: 1px solid rgba(189, 106, 0, 0.18);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.58);
      padding: 12px;
      min-width: 0;
    }

    .package-card img {
      width: 100%;
      height: 84px;
      object-fit: contain;
      filter: drop-shadow(0 8px 10px rgba(91, 37, 15, 0.08));
    }

    .package-card h3 {
      color: var(--agrabo-brown);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.45rem;
      font-weight: 900;
      margin: 0 0 8px;
    }

    .package-card ul {
      display: grid;
      gap: 5px;
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: 0.72rem;
      line-height: 1.25;
    }

    .package-card li {
      display: flex;
      gap: 6px;
    }

    .package-card li i {
      color: var(--agrabo-green);
      font-weight: 900;
    }

    .package-card p {
      grid-column: 1 / -1;
      color: #4e403a;
      border-top: 1px solid rgba(189, 106, 0, 0.18);
      padding-top: 9px;
      margin: 0;
      text-align: center;
      font-size: 0.84rem;
    }

    .package-card p strong {
      color: var(--agrabo-deep);
      font-weight: 900;
    }

    .bulk-specs {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0;
      border: 1px solid rgba(189, 106, 0, 0.14);
      border-radius: 8px;
      background: rgba(255, 248, 234, 0.56);
      margin-top: 14px;
      overflow: hidden;
    }

    .bulk-specs div {
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      gap: 10px;
      align-items: center;
      padding: 14px 16px;
      border-right: 1px solid rgba(189, 106, 0, 0.2);
    }

    .bulk-specs div:last-child {
      border-right: 0;
    }

    .bulk-specs i {
      color: var(--agrabo-amber);
      font-size: 1.55rem;
      grid-row: span 2;
    }

    .bulk-specs strong,
    .bulk-specs span {
      display: block;
    }

    .bulk-specs strong {
      color: var(--agrabo-deep);
      font-size: 0.82rem;
      font-weight: 900;
    }

    .bulk-specs span {
      color: #4e403a;
      font-size: 0.7rem;
      line-height: 1.3;
    }

    .quote-card {
      overflow: hidden;
      padding: 0;
    }

    .quote-head {
      color: #fff;
      background: #7b3d09;
      padding: 13px 16px;
    }

    .quote-head h2 {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.2rem;
      font-weight: 900;
      margin: 0 0 3px;
    }

    .quote-head p,
    .quote-note {
      margin: 0;
      font-size: 0.74rem;
    }

    .quote-body {
      padding: 14px 16px 12px;
    }

    .quote-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .quote-grid .wide {
      grid-column: 1 / -1;
    }

    .quote-grid label {
      display: grid;
      gap: 4px;
      min-width: 0;
    }

    .quote-grid label span {
      color: var(--agrabo-deep);
      font-size: 0.72rem;
      font-weight: 900;
    }

    .quote-submit {
      color: #fff;
      background: #276b32;
      border: 0;
      border-radius: 7px;
      font-weight: 900;
      margin-top: 10px;
    }

    .quote-note {
      color: #6a574f;
      text-align: center;
      margin-top: 6px;
    }

    .middle-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 10px;
      margin-top: 10px;
    }

    .process-steps {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      position: relative;
    }

    .process-steps article {
      min-width: 0;
      position: relative;
    }

    .process-steps article:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 22px;
      left: 62px;
      width: calc(100% - 40px);
      border-top: 1px dashed rgba(91, 37, 15, 0.34);
    }

    .process-steps span {
      width: 24px;
      height: 24px;
      display: inline-grid;
      place-items: center;
      color: #fff;
      background: var(--agrabo-amber);
      border-radius: 999px;
      font-size: 0.76rem;
      font-weight: 900;
      margin-right: 12px;
    }

    .process-steps i {
      color: var(--agrabo-amber);
      font-size: 1.7rem;
      vertical-align: middle;
    }

    .process-steps strong {
      display: block;
      color: var(--agrabo-deep);
      font-size: 0.78rem;
      font-weight: 900;
      margin-top: 8px;
    }

    .process-steps p {
      color: #4f403a;
      font-size: 0.68rem;
      line-height: 1.3;
      margin: 4px 0 0;
    }

    .business-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 10px;
    }

    .business-grid div {
      min-width: 0;
    }

    .business-grid i {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      color: var(--agrabo-amber);
      background: rgba(189, 106, 0, 0.08);
      border-radius: 999px;
      margin-bottom: 6px;
    }

    .business-grid strong,
    .business-grid span {
      display: block;
    }

    .business-grid strong {
      color: var(--agrabo-deep);
      font-size: 0.72rem;
      font-weight: 900;
    }

    .business-grid span {
      color: #4f403a;
      font-size: 0.66rem;
      line-height: 1.28;
    }

    .business-customers {
      margin-top: 10px;
    }

    .business-customers h2,
    .supplier-cta h2 {
      color: var(--agrabo-brown);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.28rem;
      font-weight: 900;
      margin: 0 0 12px;
    }

    .customer-row {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
    }

    .customer-row article {
      display: grid;
      grid-template-columns: 52px minmax(0, 1fr) auto;
      gap: 10px;
      align-items: start;
      border: 1px solid rgba(189, 106, 0, 0.16);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.72);
      padding: 12px;
      min-width: 0;
    }

    .customer-logo {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      color: var(--agrabo-amber);
      border: 1px solid rgba(189, 106, 0, 0.22);
      border-radius: 999px;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.35rem;
      font-weight: 900;
    }

    .customer-row strong,
    .customer-row span,
    .customer-row small {
      display: block;
      font-size: 0.72rem;
    }

    .customer-row p {
      color: #4c3c36;
      font-size: 0.68rem;
      line-height: 1.35;
      margin: 5px 0;
    }

    .stars {
      color: var(--agrabo-honey);
      font-size: 0.75rem;
      white-space: nowrap;
    }

    .supplier-cta {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto auto;
      gap: 18px;
      align-items: center;
      color: var(--agrabo-deep);
      background:
        linear-gradient(90deg, rgba(255, 248, 234, 0.98), rgba(255, 239, 204, 0.9));
      border-radius: 8px;
      margin: 10px 0 0;
      padding: 18px 24px;
      overflow: hidden;
      border: 1px solid rgba(189, 106, 0, 0.16);
    }

    .supplier-cta h2,
    .supplier-cta p {
      margin: 0;
    }

    .supplier-cta p {
      font-size: 0.88rem;
    }

    @media (max-width: 1199px) {
      .bulk-layout,
      .bulk-hero-grid,
      .middle-grid,
      .supplier-cta {
        grid-template-columns: 1fr;
      }

      .package-grid,
      .customer-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .business-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
      .bulk-hero {
        min-height: auto;
      }

      .bulk-hero-points,
      .package-grid,
      .bulk-specs,
      .process-steps,
      .business-grid,
      .customer-row,
      .quote-grid {
        grid-template-columns: 1fr;
      }

      .bulk-hero-visual {
        display: grid;
        min-height: 130px;
        place-items: center;
        justify-self: stretch;
      }

      .bulk-hero-copy {
        padding: 30px 0 0;
      }

      .bulk-hero-visual img {
        width: min(82%, 300px);
        max-height: 130px;
        transform: none;
      }

      .bulk-hero-points {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
      }

      .bulk-hero-points div {
        grid-template-columns: 1fr;
        gap: 4px;
        text-align: center;
      }

      .bulk-hero-points i {
        grid-row: auto;
        justify-self: center;
      }

      .bulk-specs div {
        border-right: 0;
      }

      .process-steps article:not(:last-child)::after {
        display: none;
      }

      .package-card {
        grid-template-columns: 96px minmax(0, 1fr);
      }

      .supplier-cta {
        padding: 20px;
      }
    }

    @media (max-width: 480px) {
      .customer-row article {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .package-card {
        grid-template-columns: 78px minmax(0, 1fr);
        text-align: left;
      }

      .package-card img {
        height: 74px;
      }

      .customer-logo {
        justify-self: center;
      }
    }
  `]
})
export class BulkOrdersPage {
  private readonly fb = inject(FormBuilder);
  private readonly bulkRequests = inject(BulkRequestService);

  readonly packages = [
    {
      size: '5L',
      image: 'assets/products/deli-honey-bulk.png',
      price: 250000,
      points: ['Ideal for small businesses', 'Easy to store & handle', 'Consistent quality']
    },
    {
      size: '10L',
      image: 'assets/products/deli-honey-bulk.png',
      price: 480000,
      points: ['Perfect for growing businesses', 'Great balance of quality & value', 'Regular supply available']
    },
    {
      size: '20L',
      image: 'assets/products/deli-honey-bulk.png',
      price: 850000,
      points: ['Best for high-volume use', 'Maximum value savings', 'Priority supply & support']
    }
  ];

  readonly specs = [
    { title: 'Minimum Order', copy: 'As low as 5L per order.', icon: 'bi bi-briefcase' },
    { title: 'Delivery', copy: 'Nationwide delivery across Uganda.', icon: 'bi bi-truck' },
    { title: 'Lead Time', copy: '1-3 business days subject to location.', icon: 'bi bi-clock' },
    { title: 'Payment Options', copy: 'Mobile Money, bank transfer & cash.', icon: 'bi bi-credit-card' }
  ];

  readonly steps = [
    { title: 'Choose Package', copy: 'Select the size that fits your needs.', icon: 'bi bi-cart3' },
    { title: 'Request Quote', copy: 'Fill the form or chat with us on WhatsApp.', icon: 'bi bi-clipboard-check' },
    { title: 'Confirm & Pay', copy: 'We confirm your order and payment details.', icon: 'bi bi-cash-coin' },
    { title: 'We Deliver', copy: 'Fast, safe delivery to your location.', icon: 'bi bi-truck' }
  ];

  readonly businessTrust = [
    { title: 'Consistent Quality', copy: 'Every batch tested for purity.', icon: 'bi bi-patch-check' },
    { title: 'Reliable Supply', copy: 'Regular stock for your needs.', icon: 'bi bi-box2' },
    { title: 'Competitive Pricing', copy: 'Best value for bulk buyers.', icon: 'bi bi-tags' },
    { title: 'Local Impact', copy: 'Supporting local beekeepers.', icon: 'bi bi-flower1' },
    { title: 'Dedicated Support', copy: 'We help your business grow.', icon: 'bi bi-headset' }
  ];

  readonly customers = [
    { logo: 'S', name: 'Speke Resort', location: 'Munyonyo', quote: 'AGRABO honey quality is unmatched. Our guests love it and we rely on them for consistent supply.', role: 'Food & Beverage Manager' },
    { logo: 'S', name: 'Sheraton', location: 'Kampala Hotel', quote: 'Reliable deliveries and excellent service. A trusted partner for our kitchens.', role: 'Executive Chef' },
    { logo: 'J', name: 'Jumia', location: 'UGANDA', quote: 'Great product quality and packaging. Works perfectly for our gift hampers.', role: 'Procurement Lead' },
    { logo: 'C', name: 'Capital Shoppers', location: 'Kampala', quote: 'We have been sourcing from AGRABO for over a year. Consistent, professional, and dependable.', role: 'Store Manager' }
  ];

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    businessName: [''],
    phone: ['', Validators.required],
    email: [''],
    location: [''],
    quantity: ['', Validators.required],
    estimatedQuantity: [''],
    message: ['']
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.bulkRequests.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
        Swal.fire('Request received', 'AGRABO will contact you with a quote.', 'success');
      },
      error: () => Swal.fire('Request not sent', 'Start the backend and XAMPP MySQL, then try again.', 'error')
    });
  }
}
