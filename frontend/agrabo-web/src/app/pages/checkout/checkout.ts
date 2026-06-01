import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout-page',
  imports: [DecimalPipe, ReactiveFormsModule],
  template: `
    <section class="section-band checkout-page site-page honey-drip">
      <div class="container">
        <div class="checkout-head">
          <h1 class="page-title">WhatsApp-Assisted Checkout</h1>
          <div class="breadcrumb-line">Home <i class="bi bi-chevron-right"></i> <span>Checkout</span></div>
          <p>Complete your order and our team will assist you on WhatsApp.<br><strong>Fast, simple and reliable.</strong></p>
        </div>

        <div class="checkout-grid">
          <form class="agrabo-card checkout-form" [formGroup]="form" (ngSubmit)="submit()">
            <section>
              <h2><i class="bi bi-person-fill"></i>Your Details</h2>
              <p>We'll use this to confirm and deliver your order.</p>
              <div class="row g-3">
                <div class="col-md-6"><label class="form-label">Full Name *</label><input class="form-control" placeholder="Enter your full name" formControlName="name"></div>
                <div class="col-md-6"><label class="form-label">Phone Number *</label><input class="form-control" placeholder="07XX XXX XXX" formControlName="phone"></div>
                <div class="col-12"><label class="form-label">Location *</label><input class="form-control" placeholder="Enter your town, city or area" formControlName="location"><small>E.g. Kampala, Entebbe, Mukono</small></div>
              </div>
            </section>

            <section>
              <h2><i class="bi bi-truck"></i>Delivery or Pickup</h2>
              <p>How would you like to receive your order?</p>
              <div class="choice-grid">
                <label class="choice-card">
                  <input type="radio" formControlName="deliveryMethod" value="Delivery">
                  <span><i class="bi bi-truck"></i><strong>Delivery</strong><small>We'll deliver to your location</small></span>
                </label>
                <label class="choice-card">
                  <input type="radio" formControlName="deliveryMethod" value="Pickup">
                  <span><i class="bi bi-shop"></i><strong>Pickup</strong><small>I'll pick up from a location</small></span>
                </label>
              </div>
              <div class="row g-3 mt-1">
                <div class="col-md-6"><label class="form-label">Preferred Date (Optional)</label><input class="form-control" type="date" formControlName="preferredDate"></div>
                <div class="col-md-6"><label class="form-label">Preferred Time (Optional)</label><input class="form-control" type="time" formControlName="preferredTime"></div>
                <div class="col-12"><label class="form-label">Order Notes (Optional)</label><textarea class="form-control" rows="3" placeholder="Any special instructions or additional notes?" formControlName="notes"></textarea><small>We'll do our best to accommodate your request.</small></div>
              </div>
            </section>

            <section>
              <h2><i class="bi bi-lock-fill"></i>Payment Method</h2>
              <p>Pay when you receive your order.</p>
              <div class="choice-grid">
                <label class="choice-card">
                  <input type="radio" formControlName="paymentMethod" value="Cash on Delivery">
                  <span><i class="bi bi-wallet2"></i><strong>Cash on Delivery</strong><small>Pay in cash when your order arrives</small></span>
                </label>
                <label class="choice-card">
                  <input type="radio" formControlName="paymentMethod" value="Mobile Money">
                  <span><i class="bi bi-phone"></i><strong>Mobile Money</strong><small>Pay via MTN or Airtel Money</small></span>
                </label>
              </div>
            </section>

            <button class="btn btn-agrabo btn-lg w-100 mt-3" type="submit" [disabled]="form.invalid || cart.items().length === 0">
              <i class="bi bi-whatsapp me-2"></i>Confirm & Send to WhatsApp
            </button>
            <p class="text-center small text-muted mt-2 mb-0">You will be redirected to WhatsApp to complete your order.</p>
          </form>

          <aside class="agrabo-card order-summary">
            <h2><i class="bi bi-cart3"></i>Order Summary</h2>
            @if (cart.items().length) {
              @for (item of cart.items(); track item.product.id) {
                <div class="summary-item">
                  <img [src]="item.product.imageUrl || 'assets/products/deli-honey-500g.png'" [alt]="item.product.name + ' ' + item.product.size">
                  <div>
                    <strong>{{ item.product.name }} {{ item.product.size }}</strong>
                    <span>100% Pure Natural Honey</span>
                    <small>UGX {{ item.product.price | number }}</small>
                    <div class="mini-qty">
                      <button type="button" (click)="cart.updateQuantity(item.product.id, item.quantity - 1)">−</button>
                      <span>{{ item.quantity }}</span>
                      <button type="button" (click)="cart.updateQuantity(item.product.id, item.quantity + 1)">+</button>
                    </div>
                  </div>
                  <b>UGX {{ item.product.price * item.quantity | number }}</b>
                </div>
              }
              <div class="summary-totals">
                <div><span>Subtotal ({{ cart.itemCount() }} items)</span><strong>UGX {{ cart.subtotal() | number }}</strong></div>
                <div><span>Delivery Fee</span><strong>UGX {{ deliveryFee | number }}</strong></div>
                <div><span>Discount</span><strong>- UGX 0</strong></div>
                <div class="total"><span>Total</span><strong>UGX {{ cart.subtotal() + deliveryFee | number }}</strong></div>
              </div>
            } @else {
              <div class="empty-summary"><i class="bi bi-bag"></i><p>Your cart is empty. Add honey from the shop first.</p></div>
            }

            <div class="delivery-estimate">
              <i class="bi bi-truck"></i>
              <div><strong>Estimated Delivery</strong><span>Within 24 - 48 hours</span><small>You will receive a confirmation on WhatsApp.</small></div>
            </div>

            <div class="summary-trust">
              <div><i class="bi bi-lock"></i><strong>100% Secure Ordering</strong><span>Your details are safe with us.</span></div>
              <div><i class="bi bi-patch-check"></i><strong>Trusted by Beekeepers</strong><span>Supporting local communities.</span></div>
              <div><i class="bi bi-award"></i><strong>Quality Guaranteed</strong><span>Pure honey, no additives.</span></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .checkout-page {
      position: relative;
      padding-top: 46px;
    }

    .checkout-head {
      max-width: 620px;
      margin-bottom: 24px;
    }

    .checkout-head p {
      color: #3b2d27;
      margin-top: 14px;
    }

    .checkout-head strong {
      color: var(--agrabo-amber);
    }

    .checkout-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) 460px;
      gap: 42px;
      align-items: start;
    }

    .checkout-form,
    .order-summary {
      padding: 22px;
    }

    .checkout-form section {
      margin-bottom: 22px;
    }

    .checkout-form h2,
    .order-summary h2 {
      color: var(--agrabo-brown);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1.25rem;
      font-weight: 900;
      margin-bottom: 2px;
    }

    .checkout-form h2 i,
    .order-summary h2 i {
      color: var(--agrabo-amber);
      margin-right: 10px;
    }

    .checkout-form p,
    .checkout-form small {
      color: #5c4b44;
      font-size: 0.82rem;
    }

    .choice-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    .choice-card {
      display: flex;
      gap: 12px;
      align-items: center;
      border: 1px solid var(--agrabo-line);
      border-radius: 8px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.72);
      cursor: pointer;
    }

    .choice-card:has(input:checked) {
      border-color: var(--agrabo-amber);
      box-shadow: inset 0 0 0 1px var(--agrabo-amber);
    }

    .choice-card span,
    .choice-card strong,
    .choice-card small {
      display: block;
    }

    .choice-card span {
      display: grid;
      grid-template-columns: 38px minmax(0, 1fr);
      column-gap: 8px;
      align-items: center;
    }

    .choice-card i {
      color: var(--agrabo-amber);
      font-size: 1.4rem;
      grid-row: span 2;
    }

    .order-summary {
      position: sticky;
      top: 96px;
    }

    .summary-item {
      display: grid;
      grid-template-columns: 78px minmax(0, 1fr) auto;
      gap: 14px;
      align-items: center;
      border-bottom: 1px solid rgba(189, 106, 0, 0.18);
      padding: 18px 0;
    }

    .summary-item img {
      width: 72px;
      height: 82px;
      object-fit: contain;
    }

    .summary-item strong,
    .summary-item span,
    .summary-item small {
      display: block;
    }

    .summary-item strong {
      color: var(--agrabo-brown);
    }

    .summary-item b {
      color: var(--agrabo-deep);
    }

    .mini-qty {
      display: inline-flex;
      align-items: center;
      overflow: hidden;
      margin-top: 8px;
      border: 1px solid var(--agrabo-line);
      border-radius: 7px;
    }

    .mini-qty button {
      width: 34px;
      border: 0;
      background: #fff;
      color: var(--agrabo-brown);
      font-weight: 900;
    }

    .mini-qty span {
      width: 38px;
      text-align: center;
      border-inline: 1px solid var(--agrabo-line);
      background: #fff;
      font-weight: 800;
    }

    .summary-totals {
      padding-top: 14px;
    }

    .summary-totals div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .summary-totals .total {
      border-top: 1px solid rgba(189, 106, 0, 0.2);
      padding-top: 12px;
      color: var(--agrabo-deep);
      font-size: 1.25rem;
    }

    .delivery-estimate {
      display: grid;
      grid-template-columns: 60px minmax(0, 1fr);
      gap: 14px;
      align-items: center;
      border: 1px solid var(--agrabo-line);
      border-radius: 8px;
      margin-top: 18px;
      padding: 14px;
      background: rgba(255, 247, 231, 0.72);
    }

    .delivery-estimate i {
      color: var(--agrabo-amber);
      font-size: 2.2rem;
    }

    .delivery-estimate strong,
    .delivery-estimate span,
    .delivery-estimate small {
      display: block;
    }

    .summary-trust {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin-top: 18px;
    }

    .summary-trust div {
      display: grid;
      grid-template-columns: 30px minmax(0, 1fr);
      gap: 8px;
    }

    .summary-trust i {
      color: var(--agrabo-amber);
      font-size: 1.2rem;
    }

    .summary-trust strong,
    .summary-trust span {
      display: block;
      font-size: 0.78rem;
    }

    .empty-summary {
      display: grid;
      place-items: center;
      min-height: 180px;
      text-align: center;
      color: #6b5b53;
    }

    .empty-summary i {
      color: var(--agrabo-amber);
      font-size: 2.5rem;
    }

    @media (max-width: 992px) {
      .checkout-grid,
      .choice-grid {
        grid-template-columns: 1fr;
      }

      .order-summary {
        position: static;
      }
    }

    @media (max-width: 576px) {
      .summary-item {
        grid-template-columns: 64px minmax(0, 1fr);
      }

      .summary-item b {
        grid-column: 2;
      }
    }
  `]
})
export class CheckoutPage {
  private readonly fb = inject(FormBuilder);
  private readonly orders = inject(OrderService);
  readonly cart = inject(CartService);
  readonly deliveryFee = 5000;

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    location: ['', Validators.required],
    deliveryMethod: ['Delivery', Validators.required],
    preferredDate: [''],
    preferredTime: [''],
    paymentMethod: ['Cash on Delivery', Validators.required],
    notes: ['']
  });

  submit(): void {
    if (this.form.invalid || this.cart.items().length === 0) {
      return;
    }

    const value = this.form.getRawValue();
    this.orders.createOrder({
      customer: {
        name: value.name,
        phone: value.phone,
        location: value.location
      },
      notes: [
        value.notes,
        value.deliveryMethod,
        value.preferredDate ? `Preferred date: ${value.preferredDate}` : '',
        value.preferredTime ? `Preferred time: ${value.preferredTime}` : ''
      ].filter(Boolean).join(' | '),
      paymentMethod: value.paymentMethod,
      items: this.cart.items().map((item) => ({ productId: item.product.id, quantity: item.quantity }))
    }).subscribe({
      next: (response) => {
        this.cart.clear();
        Swal.fire('Order saved', 'We are opening WhatsApp so you can confirm with AGRABO.', 'success');
        window.open(response.whatsappUrl, '_blank');
      },
      error: () => {
        Swal.fire('Order not sent', 'Start the backend and XAMPP MySQL, then try again.', 'error');
      }
    });
  }
}
