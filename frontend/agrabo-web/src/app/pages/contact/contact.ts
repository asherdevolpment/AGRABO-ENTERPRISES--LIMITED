import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule],
  template: `
    <section class="page-hero" style="--hero-image: url('/assets/bulk_hero transparent .png')">
      <div class="container">
        <div class="page-hero-content">
          <h1 class="page-title">Contact Us & Delivery Info</h1>
          <p class="lead">We're here to help! Reach out for orders, partnerships, or any questions about our pure honey products.</p>
        </div>
      </div>
    </section>

    <section class="section-band site-page contact-page">
      <div class="container">
        <div class="contact-grid">
          <form class="message-form" [formGroup]="form" (ngSubmit)="submit()">
            <h2 class="section-heading"><i class="bi bi-envelope-open"></i>Send Us a Message</h2>
            <p>Have a question or need assistance? Fill out the form and our team will get back to you shortly.</p>
            <div class="row g-3">
              <div class="col-12"><input class="form-control" placeholder="Your Full Name" formControlName="name"></div>
              <div class="col-12"><input class="form-control" placeholder="Email Address" formControlName="email"></div>
              <div class="col-12"><input class="form-control" placeholder="Phone Number" formControlName="phone"></div>
              <div class="col-12">
                <select class="form-select" formControlName="subject">
                  <option value="">Select Subject</option>
                  <option>Product Order</option>
                  <option>Bulk Supply</option>
                  <option>Delivery Question</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div class="col-12"><textarea class="form-control" rows="5" placeholder="Your Message" formControlName="message"></textarea></div>
            </div>
            <button class="btn btn-honey mt-3" type="submit" [disabled]="form.invalid"><i class="bi bi-send me-2"></i>Send Message</button>
          </form>

          <div class="contact-cards">
            <div class="whatsapp-card">
              <h2><i class="bi bi-whatsapp"></i>Chat on WhatsApp</h2>
              <p>Get quick responses on product info, orders, and delivery.</p>
              <a class="btn btn-light btn-sm" href="https://wa.me/256706506319" target="_blank" rel="noopener"><i class="bi bi-whatsapp me-2"></i>Message Us Now</a>
            </div>
            <div class="agrabo-card contact-mini"><h2><i class="bi bi-telephone-fill"></i>Call Us</h2><p>Speak to our team for orders, bulk inquiries, and support.</p><strong>0706506319</strong><strong>0772987654</strong><span>Monday - Saturday<br>8:00 AM - 6:00 PM (EAT)</span></div>
            <div class="agrabo-card contact-mini"><h2><i class="bi bi-envelope"></i>Email Us</h2><p>We typically respond within a few hours.</p><strong>info&#64;agrabo.ug</strong></div>
          </div>

          <div class="location-col">
            <h2 class="section-heading"><i class="bi bi-geo-alt"></i>Our Location</h2>
            <p><strong>Agrabo Enterprise Limited</strong><br>Kampala, Uganda<br>We serve customers across Uganda and beyond.</p>
            <div class="map-frame">
              <iframe
                title="AGRABO location map"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Kampala%2C%20Uganda&output=embed">
              </iframe>
            </div>
            <div class="ready-card agrabo-card">
              <div>
                <h2><i class="bi bi-bag-check"></i>Ready to Place an Order?</h2>
                <p>Order directly on WhatsApp for fast and easy service from our team.</p>
                <a class="btn btn-outline-success" href="https://wa.me/256706506319" target="_blank" rel="noopener"><i class="bi bi-whatsapp me-2"></i>Order on WhatsApp</a>
              </div>
              <img src="assets/products/deli-honey-bulk.png" alt="Bulk Deli Honey">
            </div>
          </div>
        </div>

        <div class="delivery-grid mt-4">
          <div class="agrabo-card delivery-coverage">
            <h2 class="section-heading"><i class="bi bi-truck"></i>Delivery Coverage</h2>
            <p>We deliver across Uganda with fast, reliable service.</p>
            <div class="coverage-cards">
              @for (area of coverage; track area.title) {
                <div><i [class]="area.icon"></i><strong>{{ area.title }}</strong><span>{{ area.text }}</span></div>
              }
            </div>
          </div>
          <div class="agrabo-card hours-card">
            <h2 class="section-heading"><i class="bi bi-clock"></i>Operating Hours</h2>
            <p>We're available to serve you during the following hours.</p>
            <strong>Monday - Saturday</strong><span>8:00 AM - 6:00 PM</span>
            <strong>Sunday</strong><span>Closed</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.68fr 1.15fr;
      gap: 24px;
      align-items: start;
    }

    .message-form {
      padding-right: 24px;
      border-right: 1px solid rgba(189, 106, 0, 0.22);
    }

    .message-form h2 i,
    .location-col h2 i {
      color: var(--agrabo-amber);
      margin-right: 10px;
    }

    .message-form p,
    .location-col p,
    .contact-mini p {
      color: #4b3c35;
      font-size: 0.9rem;
    }

    .contact-cards {
      display: grid;
      gap: 12px;
    }

    .whatsapp-card {
      color: #fff;
      border-radius: 10px;
      background: linear-gradient(135deg, #1f7a3c, #0f4f25);
      padding: 22px;
    }

    .whatsapp-card h2,
    .contact-mini h2,
    .ready-card h2 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.2rem;
      font-weight: 900;
    }

    .contact-mini {
      padding: 18px;
    }

    .contact-mini h2 i {
      color: var(--agrabo-amber);
      margin-right: 10px;
    }

    .contact-mini strong,
    .contact-mini span {
      display: block;
      color: var(--agrabo-brown);
    }

    .map-frame {
      min-height: 160px;
      border: 1px solid var(--agrabo-line);
      border-radius: 10px;
      margin-bottom: 14px;
      overflow: hidden;
      background: #f7f1e6;
    }

    .map-frame iframe {
      width: 100%;
      height: 210px;
      display: block;
      border: 0;
    }

    .ready-card {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 150px;
      gap: 12px;
      align-items: center;
      padding: 20px;
    }

    .ready-card img {
      width: 100%;
      object-fit: contain;
    }

    .delivery-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 310px;
      gap: 18px;
    }

    .delivery-coverage,
    .hours-card {
      padding: 22px;
    }

    .coverage-cards {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 12px;
    }

    .coverage-cards div {
      border: 1px solid rgba(189, 106, 0, 0.18);
      border-radius: 8px;
      padding: 14px;
      text-align: center;
    }

    .coverage-cards i {
      color: var(--agrabo-amber);
      font-size: 1.45rem;
    }

    .coverage-cards strong,
    .coverage-cards span,
    .hours-card strong,
    .hours-card span {
      display: block;
    }

    .coverage-cards span,
    .hours-card span {
      color: #55463f;
      font-size: 0.82rem;
    }

    @media (max-width: 992px) {
      .contact-grid,
      .delivery-grid,
      .coverage-cards,
      .ready-card {
        grid-template-columns: 1fr;
      }

      .message-form {
        padding-right: 0;
        border-right: 0;
      }

      .map-frame iframe {
        height: 240px;
      }
    }
  `]
})
export class ContactPage {
  private readonly fb = inject(FormBuilder);
  private readonly contact = inject(ContactService);

  readonly coverage = [
    { title: 'Kampala & Wakiso', text: 'Same-day or next-day delivery available.', icon: 'bi bi-geo-alt-fill' },
    { title: 'Central Region', text: 'Fast delivery to major towns and cities.', icon: 'bi bi-buildings-fill' },
    { title: 'Western Region', text: 'Reliable delivery to communities and businesses.', icon: 'bi bi-bank2' },
    { title: 'Northern Region', text: 'Serving more locations every day.', icon: 'bi bi-bar-chart-fill' },
    { title: 'Nationwide', text: 'Bulk orders delivered anywhere in Uganda.', icon: 'bi bi-globe2' }
  ];

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: [''],
    email: [''],
    subject: [''],
    message: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.contact.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
        Swal.fire('Message sent', 'AGRABO will reply soon.', 'success');
      },
      error: () => Swal.fire('Message not sent', 'Start the backend and XAMPP MySQL, then try again.', 'error')
    });
  }
}
