import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials-page',
  template: `
    <section class="page-hero" style="--hero-image: url('/assets/bulk_hero transparent .png')">
      <div class="container">
        <div class="page-hero-content">
          <h1 class="page-title">Loved by Families.<br>Trusted by Communities.</h1>
          <p class="lead">Real stories from our happy customers and partners. 100% pure honey. Real impact.</p>
          <div class="rating-row">
            <div><i class="bi bi-star-fill"></i><strong>4.9/5</strong><span>Average Rating</span></div>
            <div><i class="bi bi-people-fill"></i><strong>2,500+</strong><span>Happy Customers</span></div>
            <div><i class="bi bi-patch-check-fill"></i><strong>100%</strong><span>Would Recommend</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-band site-page testimonials-page">
      <div class="container">
        <div class="d-flex align-items-center gap-3 mb-4">
          <i class="bi bi-flower1 section-icon"></i>
          <h2 class="section-heading mb-0">What Our Customers Say</h2>
        </div>

        <div class="testimonial-grid">
          @for (quote of quotes; track quote.name) {
            <article class="testimonial-card agrabo-card">
              <div class="quote-mark">“</div>
              <p>{{ quote.text }}</p>
              <div class="star-row">★★★★★</div>
              <div class="person-row">
                <div><strong>{{ quote.name }}</strong><span>{{ quote.location }}</span></div>
                <img [src]="quote.image" [alt]="quote.name">
              </div>
            </article>
          }
        </div>

        <div class="trust-band agrabo-card mt-4">
          <div class="icon-feature"><i class="bi bi-droplet-fill"></i><div><strong>100% Pure Honey</strong><span>No additives. No fillers. Just pure natural honey.</span></div></div>
          <div class="icon-feature"><i class="bi bi-heart"></i><div><strong>Supporting Local Beekeepers</strong><span>Every purchase empowers beekeepers and their communities.</span></div></div>
          <div class="icon-feature"><i class="bi bi-shield-check"></i><div><strong>Quality You Can Trust</strong><span>Carefully harvested, tested and packed with love.</span></div></div>
          <div class="icon-feature"><i class="bi bi-truck"></i><div><strong>Fast & Reliable Delivery</strong><span>Quick delivery across Kampala and beyond.</span></div></div>
        </div>

        <div class="faq-section mt-4">
          <img src="assets/backgrounds/7.png" alt="Bees on honeycomb">
          <div class="agrabo-card faq-card">
            <h2 class="section-heading">Frequently Asked Questions</h2>
            <p>Find answers to the most common questions about our honey and services.</p>
            <div class="accordion">
              @for (faq of faqs; track faq) {
                <details>
                  <summary>{{ faq }}</summary>
                  <p>Yes. AGRABO will confirm details with you on WhatsApp and provide support for your order.</p>
                </details>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .rating-row {
      display: flex;
      gap: 34px;
      flex-wrap: wrap;
      margin-top: 26px;
    }

    .rating-row div {
      display: grid;
      grid-template-columns: 42px minmax(0, 1fr);
      gap: 8px;
      align-items: center;
    }

    .rating-row i {
      color: var(--agrabo-honey);
      font-size: 2rem;
      grid-row: span 2;
    }

    .rating-row strong,
    .rating-row span {
      display: block;
    }

    .section-icon {
      color: var(--agrabo-honey);
      font-size: 2rem;
    }

    .testimonial-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 20px;
    }

    .testimonial-card {
      padding: 20px;
      position: relative;
    }

    .quote-mark {
      color: var(--agrabo-honey);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 2.8rem;
      height: 28px;
      line-height: 0.8;
    }

    .testimonial-card p {
      font-style: italic;
      min-height: 84px;
      font-size: 0.9rem;
    }

    .person-row {
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 12px;
      margin-top: 12px;
    }

    .person-row strong,
    .person-row span {
      display: block;
    }

    .person-row span {
      color: #5f4e47;
      font-size: 0.82rem;
    }

    .person-row img {
      width: 58px;
      height: 58px;
      object-fit: cover;
      border-radius: 50%;
      border: 3px solid #fff2d4;
    }

    .trust-band {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 18px;
      padding: 18px;
    }

    .faq-section {
      display: grid;
      grid-template-columns: 40% minmax(0, 1fr);
      gap: 18px;
      align-items: stretch;
    }

    .faq-section > img {
      width: 100%;
      height: 100%;
      min-height: 220px;
      object-fit: cover;
      border-radius: 10px;
    }

    .faq-card {
      padding: 22px;
    }

    details {
      border: 1px solid var(--agrabo-line);
      border-radius: 8px;
      margin-top: 8px;
      background: rgba(255, 255, 255, 0.68);
    }

    summary {
      color: var(--agrabo-deep);
      cursor: pointer;
      font-weight: 800;
      padding: 12px 16px;
    }

    details p {
      color: #574741;
      padding: 0 16px 14px;
      margin: 0;
    }

    @media (max-width: 992px) {
      .testimonial-grid,
      .trust-band,
      .faq-section {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TestimonialsPage {
  readonly quotes = [
    { name: 'Sarah N.', location: 'Kampala', text: 'Deli Honey is the real deal! Pure, natural and tastes amazing. I love knowing I am supporting local beekeepers.', image: 'assets/testimonials/customer-1.svg' },
    { name: 'David K.', location: 'Cafe Owner, Entebbe', text: 'We use AGRABO honey in our cafe and customers can taste the difference. Excellent quality!', image: 'assets/testimonials/customer-2.svg' },
    { name: 'Immaculate A.', location: 'Kira', text: 'Great product and fast delivery. I ordered on WhatsApp and it arrived the same day!', image: 'assets/testimonials/customer-3.svg' },
    { name: 'John M.', location: 'Retailer, Mukono', text: 'I buy in bulk for my supermarket. AGRABO is reliable, consistent, and supports local beekeepers.', image: 'assets/testimonials/customer-4.svg' }
  ];

  readonly faqs = [
    'Is your honey 100% pure?',
    'Do you deliver in Kampala and surrounding areas?',
    'How do I order on WhatsApp?',
    'Do you supply businesses and organizations?',
    'How should I store honey?',
    'Can children eat honey?'
  ];
}
