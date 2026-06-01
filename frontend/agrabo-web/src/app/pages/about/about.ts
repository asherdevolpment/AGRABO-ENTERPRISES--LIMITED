import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-page',
  imports: [RouterLink],
  template: `
    <section class="page-hero" style="--hero-image: url('/assets/bulk_hero transparent .png')">
      <div class="container">
        <div class="page-hero-content">
          <p class="eyebrow">About AGRABO Enterprise Limited</p>
          <h1 class="page-title">Pure Honey.<br><span class="accent">Stronger Communities.</span></h1>
          <p class="lead">
            AGRABO is a Ugandan honey enterprise supplying natural Deli Honey to homes,
            retailers, hotels, restaurants, institutions, and bulk buyers while supporting local beekeepers.
          </p>
        </div>
      </div>
    </section>

    <section class="section-band site-page about-page">
      <div class="container">
        <div class="company-intro agrabo-card">
          <div>
            <p class="eyebrow">Who we are</p>
            <h2>AGRABO connects Ugandan honey producers to customers who value purity, consistency, and impact.</h2>
            <p>
              We source, package, and distribute honey products under the Deli Honey brand. Our work
              focuses on reliable supply, honest quality, and practical market access for beekeeping
              communities. Every jar and bulk order helps create income opportunities while giving
              customers honey they can trust.
            </p>
            <div class="intro-actions">
              <a class="btn btn-honey" routerLink="/shop">Shop Honey</a>
              <a class="btn btn-outline-dark" routerLink="/bulk-orders">Bulk Supply</a>
            </div>
          </div>
          <img src="assets/backgrounds/beekeeper-impact.png" alt="Ugandan beekeeper holding a honeycomb frame">
        </div>

        <div class="mission-row">
          <article class="agrabo-card">
            <i class="bi bi-bullseye"></i>
            <h2>Our Mission</h2>
            <p>To deliver pure, dependable Ugandan honey while creating sustainable market opportunities for local beekeepers and rural communities.</p>
          </article>
          <article class="agrabo-card">
            <i class="bi bi-eye"></i>
            <h2>Our Vision</h2>
            <p>To become Uganda's most trusted honey brand for households, retailers, institutions, and regional bulk buyers.</p>
          </article>
          <article class="agrabo-card">
            <i class="bi bi-heart"></i>
            <h2>Our Purpose</h2>
            <p>To prove that everyday products can carry real value: healthier homes, stronger local businesses, and better livelihoods.</p>
          </article>
        </div>

        <section class="values-section agrabo-card">
          <div>
            <p class="eyebrow">What guides us</p>
            <h2>Our Values</h2>
          </div>
          <div class="values-grid">
            @for (value of values; track value.title) {
              <article>
                <i [class]="value.icon"></i>
                <strong>{{ value.title }}</strong>
                <span>{{ value.copy }}</span>
              </article>
            }
          </div>
        </section>

        <section id="impact" class="impact-section">
          <div class="impact-head">
            <p class="eyebrow">Our impact</p>
            <h2>Better honey supply. Better beekeeper opportunities.</h2>
            <p>AGRABO's impact is built through practical work: sourcing fairly, creating reliable sales channels, and helping customers choose local honey.</p>
          </div>
          <div class="stats-row agrabo-card">
            @for (stat of stats; track stat.label) {
              <div><i [class]="stat.icon"></i><strong>{{ stat.value }}</strong><span>{{ stat.label }}</span></div>
            }
          </div>
          <div class="impact-grid">
            @for (item of impactAreas; track item.title) {
              <article class="agrabo-card">
                <i [class]="item.icon"></i>
                <h3>{{ item.title }}</h3>
                <p>{{ item.copy }}</p>
              </article>
            }
          </div>
        </section>

        <section class="what-we-do agrabo-card">
          <div>
            <p class="eyebrow">What we do</p>
            <h2>From local sourcing to customer delivery</h2>
          </div>
          <div class="work-grid">
            @for (item of work; track item.title) {
              <article>
                <span>{{ item.step }}</span>
                <strong>{{ item.title }}</strong>
                <p>{{ item.copy }}</p>
              </article>
            }
          </div>
        </section>

        <section class="team-section">
          <div class="team-copy agrabo-card">
            <p class="eyebrow">Our team</p>
            <h2>Built by people who care about quality and community.</h2>
            <p>
              AGRABO brings together sourcing, packaging, sales, delivery, and customer support.
              The team works with beekeepers, households, retailers, hotels, restaurants, and
              organizations to keep honey supply simple, reliable, and professional.
            </p>
            <a class="btn btn-outline-dark" routerLink="/contact">Talk to the Team</a>
          </div>
          @for (member of team; track member.role) {
            <article class="team-card agrabo-card">
              <div><i [class]="member.icon"></i></div>
              <strong>{{ member.role }}</strong>
              <span>{{ member.copy }}</span>
            </article>
          }
        </section>

        <div class="about-cta">
          <div>
            <h2>Work with AGRABO</h2>
            <p>Shop natural honey, request business supply, or contact us for partnerships and distribution.</p>
          </div>
          <a class="btn btn-light" routerLink="/shop"><i class="bi bi-bag me-2"></i>Shop Honey</a>
          <a class="btn btn-outline-light" routerLink="/contact"><i class="bi bi-envelope me-2"></i>Contact Us</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-page {
      padding-top: 28px;
    }

    .company-intro {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 360px;
      gap: 28px;
      align-items: center;
      padding: 28px;
      margin-bottom: 18px;
    }

    .company-intro h2,
    .impact-head h2,
    .what-we-do h2,
    .team-copy h2,
    .about-cta h2 {
      color: var(--agrabo-brown);
      font-family: Georgia, "Times New Roman", serif;
      font-weight: 900;
      line-height: 1.12;
      margin: 0 0 12px;
    }

    .company-intro p,
    .impact-head p,
    .what-we-do p,
    .team-copy p {
      color: #4a3b35;
      line-height: 1.55;
    }

    .company-intro img {
      width: 100%;
      min-height: 260px;
      object-fit: cover;
      border-radius: 8px;
    }

    .intro-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .mission-row,
    .impact-grid,
    .team-section {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin-bottom: 18px;
    }

    .mission-row article,
    .impact-grid article,
    .team-card {
      min-width: 0;
      padding: 22px;
    }

    .mission-row i,
    .impact-grid i,
    .values-grid i,
    .team-card i {
      color: var(--agrabo-amber);
      font-size: 1.8rem;
      margin-bottom: 10px;
    }

    .mission-row h2,
    .impact-grid h3,
    .values-section h2 {
      color: var(--agrabo-brown);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.18rem;
      font-weight: 900;
    }

    .mission-row p,
    .impact-grid p {
      color: #4c3d36;
      font-size: 0.9rem;
      margin: 0;
    }

    .values-section,
    .what-we-do {
      display: grid;
      grid-template-columns: 230px minmax(0, 1fr);
      gap: 24px;
      align-items: start;
      padding: 24px;
      margin-bottom: 18px;
    }

    .values-grid,
    .work-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
    }

    .values-grid article,
    .work-grid article {
      min-width: 0;
      border: 1px solid rgba(189, 106, 0, 0.14);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.62);
      padding: 16px;
    }

    .values-grid strong,
    .values-grid span,
    .work-grid strong,
    .work-grid p,
    .team-card strong,
    .team-card span,
    .stats-row strong,
    .stats-row span {
      display: block;
    }

    .values-grid strong,
    .work-grid strong,
    .team-card strong {
      color: var(--agrabo-deep);
      font-weight: 900;
    }

    .values-grid span,
    .work-grid p,
    .team-card span {
      color: #4e403a;
      font-size: 0.84rem;
      line-height: 1.4;
      margin: 6px 0 0;
    }

    .impact-section {
      margin-bottom: 18px;
    }

    .impact-head {
      max-width: 760px;
      margin-bottom: 14px;
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 0;
      text-align: center;
      padding: 18px;
      margin-bottom: 16px;
    }

    .stats-row div {
      border-right: 1px solid rgba(189, 106, 0, 0.18);
      padding: 0 12px;
    }

    .stats-row div:last-child {
      border-right: 0;
    }

    .stats-row i {
      color: var(--agrabo-olive);
      font-size: 1.75rem;
      margin-bottom: 6px;
    }

    .stats-row strong {
      color: var(--agrabo-deep);
      font-size: 1.35rem;
      font-weight: 900;
    }

    .stats-row span {
      color: #473832;
      font-size: 0.74rem;
      font-weight: 800;
    }

    .work-grid article span {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      color: #fff;
      background: var(--agrabo-amber);
      border-radius: 999px;
      font-weight: 900;
      margin-bottom: 10px;
    }

    .team-section {
      grid-template-columns: 1.4fr repeat(3, minmax(0, 1fr));
    }

    .team-copy {
      padding: 24px;
    }

    .team-card {
      text-align: center;
    }

    .team-card div {
      width: 58px;
      height: 58px;
      display: grid;
      place-items: center;
      margin: 0 auto 12px;
      border-radius: 999px;
      background: rgba(189, 106, 0, 0.08);
    }

    .team-card i {
      margin: 0;
    }

    .about-cta {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto auto;
      gap: 18px;
      align-items: center;
      color: #fff;
      border-radius: 8px;
      background: linear-gradient(135deg, #7b3d09, #4a210d);
      padding: 24px;
    }

    .about-cta h2,
    .about-cta p {
      color: #fff;
      margin: 0;
    }

    @media (max-width: 1199px) {
      .company-intro,
      .values-section,
      .what-we-do,
      .team-section {
        grid-template-columns: 1fr;
      }

      .values-grid,
      .work-grid,
      .stats-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .stats-row div {
        border-right: 0;
        border-bottom: 1px solid rgba(189, 106, 0, 0.14);
        padding: 14px;
      }
    }

    @media (max-width: 768px) {
      .about-page {
        padding-top: 18px;
      }

      .company-intro,
      .mission-row,
      .impact-grid,
      .values-grid,
      .work-grid,
      .stats-row,
      .about-cta {
        grid-template-columns: 1fr;
      }

      .company-intro,
      .values-section,
      .what-we-do,
      .team-copy,
      .about-cta {
        padding: 18px;
      }

      .company-intro img {
        min-height: 190px;
      }
    }
  `]
})
export class AboutPage {
  readonly values = [
    { title: 'Purity', copy: 'We keep honey natural, clean, and honest from sourcing to packaging.', icon: 'bi bi-droplet-fill' },
    { title: 'Trust', copy: 'We build dependable relationships with customers, retailers, and suppliers.', icon: 'bi bi-shield-check' },
    { title: 'Community', copy: 'We support the people behind the honey: local beekeepers and rural families.', icon: 'bi bi-people-fill' },
    { title: 'Sustainability', copy: "We encourage responsible beekeeping and care for Uganda's natural resources.", icon: 'bi bi-leaf-fill' }
  ];

  readonly stats = [
    { value: '500+', label: 'Local Beekeepers Supported', icon: 'bi bi-people-fill' },
    { value: '5,000+', label: 'Hives Managed Across Uganda', icon: 'bi bi-flower1' },
    { value: '100%', label: 'Natural & Unprocessed', icon: 'bi bi-leaf-fill' },
    { value: '10+', label: 'Rural Communities Reached', icon: 'bi bi-geo-alt-fill' },
    { value: '24h', label: 'Bulk Quote Response Target', icon: 'bi bi-clock-fill' }
  ];

  readonly impactAreas = [
    { title: 'Beekeeper Market Access', copy: 'AGRABO helps create consistent demand for honey sourced from local beekeeping communities.', icon: 'bi bi-shop' },
    { title: 'Reliable Business Supply', copy: 'We support hotels, restaurants, schools, retailers, and institutions with packaged and bulk honey.', icon: 'bi bi-building-check' },
    { title: 'Local Value Addition', copy: 'Packaging, branding, and distribution help Ugandan honey reach more professional markets.', icon: 'bi bi-box-seam' }
  ];

  readonly work = [
    { step: '1', title: 'Source', copy: 'We work with trusted beekeeping networks and honey suppliers.' },
    { step: '2', title: 'Package', copy: 'Honey is prepared in jar, litre, and bulk formats for different customers.' },
    { step: '3', title: 'Supply', copy: 'We deliver to households, shops, restaurants, hotels, schools, and resellers.' },
    { step: '4', title: 'Support', copy: 'We assist customers with ordering, delivery, bulk planning, and repeat supply.' }
  ];

  readonly team = [
    { role: 'Sourcing Team', copy: 'Coordinates beekeeper relationships and honey supply quality.', icon: 'bi bi-flower1' },
    { role: 'Sales & Support', copy: 'Helps customers order, request quotes, and plan recurring supply.', icon: 'bi bi-headset' },
    { role: 'Delivery Team', copy: 'Handles timely dispatch across Kampala and wider Uganda.', icon: 'bi bi-truck' }
  ];
}
