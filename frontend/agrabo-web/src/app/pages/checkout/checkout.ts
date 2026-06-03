import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout-page',
  imports: [DecimalPipe, ReactiveFormsModule],
  template: `
    <section class="checkout-page">
      <div class="page-frame">
        <header class="page-head">
          <div>
            <span><i class="bi bi-bag-check"></i>Checkout</span>
            <h1>Confirm your order</h1>
            <p>Enter delivery details. We finish confirmation on WhatsApp.</p>
          </div>
        </header>

        @if (orderSent()) {
          <div class="checkout-success">
            <i class="bi bi-check-circle-fill"></i>
            <span><strong>Order received.</strong> WhatsApp opened for confirmation.</span>
          </div>
        }

        <div class="checkout-layout">
          <form class="checkout-form" [formGroup]="form" (ngSubmit)="submit()">
            <section>
              <h2><i class="bi bi-person"></i>Your details</h2>
              <div class="form-grid">
                <label><span><i class="bi bi-person"></i>Full name *</span><input class="form-control" placeholder="Your name" formControlName="name"></label>
                <label><span><i class="bi bi-telephone"></i>Phone *</span><input class="form-control" placeholder="07XX XXX XXX" formControlName="phone"></label>
                <label><span><i class="bi bi-geo"></i>District / town *</span><input class="form-control" placeholder="Kampala" formControlName="district"></label>
                <label><span><i class="bi bi-pin-map"></i>Delivery area *</span><input class="form-control" placeholder="Area, road, village" formControlName="location"></label>
                <label class="wide"><span><i class="bi bi-signpost"></i>Landmark</span><input class="form-control" placeholder="Nearby building or stage" formControlName="landmark"></label>
              </div>
            </section>

            <section>
              <h2><i class="bi bi-truck"></i>Delivery and payment</h2>
              <div class="choice-grid">
                <label><input type="radio" formControlName="deliveryMethod" value="Delivery"><i class="bi bi-truck"></i><span><strong>Delivery</strong><small>To your location</small></span></label>
                <label><input type="radio" formControlName="deliveryMethod" value="Pickup"><i class="bi bi-shop"></i><span><strong>Pickup</strong><small>Arrange pickup</small></span></label>
                <label><input type="radio" formControlName="paymentMethod" value="MTN Mobile Money"><i class="bi bi-phone"></i><span><strong>MTN MoMo</strong><small>Manual confirmation</small></span></label>
                <label><input type="radio" formControlName="paymentMethod" value="Cash on Delivery"><i class="bi bi-wallet2"></i><span><strong>Cash</strong><small>Pay on arrival</small></span></label>
              </div>
            </section>

            <section>
              <h2><i class="bi bi-calendar2-check"></i>Optional notes</h2>
              <div class="form-grid">
                <label><span><i class="bi bi-calendar3"></i>Date</span><input class="form-control" type="date" formControlName="preferredDate"></label>
                <label><span><i class="bi bi-clock"></i>Time</span><input class="form-control" type="time" formControlName="preferredTime"></label>
                <label class="wide"><span><i class="bi bi-chat-left-text"></i>Note</span><textarea class="form-control" rows="3" placeholder="Optional note" formControlName="notes"></textarea></label>
              </div>
            </section>

            <button class="btn btn-agrabo w-100" type="submit" [disabled]="form.invalid || cart.items().length === 0">
              <i class="bi bi-whatsapp me-2"></i>Confirm on WhatsApp
            </button>
          </form>

          <aside class="order-summary">
            <h2><i class="bi bi-receipt"></i>Summary</h2>
            @if (cart.items().length) {
              <div class="summary-list">
                @for (item of cart.items(); track item.product.id) {
                  <div class="summary-item">
                    <img [src]="item.product.imageUrl || 'assets/PRODUCT TEMLATE .png'" [alt]="item.product.name + ' ' + item.product.size">
                    <div>
                      <strong>{{ item.product.name }} {{ item.product.size }}</strong>
                      <small>UGX {{ item.product.price | number }}</small>
                      <div class="mini-qty">
                        <button type="button" (click)="cart.updateQuantity(item.product.id, item.quantity - 1)">-</button>
                        <span>{{ item.quantity }}</span>
                        <button type="button" (click)="cart.updateQuantity(item.product.id, item.quantity + 1)">+</button>
                      </div>
                    </div>
                    <b>UGX {{ item.product.price * item.quantity | number }}</b>
                  </div>
                }
              </div>

              <div class="summary-totals">
                <div><span><i class="bi bi-basket"></i>Subtotal</span><strong>UGX {{ cart.subtotal() | number }}</strong></div>
                <div><span><i class="bi bi-truck"></i>Delivery</span><strong>UGX {{ deliveryFee | number }}</strong></div>
                <div class="total"><span><i class="bi bi-check2-circle"></i>Total</span><strong>UGX {{ cart.subtotal() + deliveryFee | number }}</strong></div>
              </div>
            } @else {
              <div class="empty-summary"><i class="bi bi-bag"></i>Your cart is empty.</div>
            }
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .checkout-page {
      background: #fff;
      padding: 16px 0 28px;
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
      display: inline-flex;
      align-items: center;
      gap: 7px;
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

    .checkout-success {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--agrabo-green);
      background: var(--agrabo-leaf);
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 0.86rem;
      margin-bottom: 14px;
    }

    .checkout-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 340px;
      gap: 16px;
      align-items: start;
    }

    .checkout-form,
    .order-summary {
      background: #fff;
      border: 1px solid var(--agrabo-line);
      border-radius: 10px;
      box-shadow: var(--agrabo-shadow-soft);
      padding: 16px;
    }

    .checkout-form section {
      border-bottom: 1px solid #eee8df;
      margin-bottom: 14px;
      padding-bottom: 14px;
    }

    .checkout-form section:last-of-type {
      border-bottom: 0;
    }

    .checkout-form h2,
    .order-summary h2 {
      color: var(--agrabo-deep);
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--agrabo-deep);
      font-size: 0.98rem;
      font-weight: 900;
      margin: 0 0 10px;
    }

    .checkout-form h2 i,
    .order-summary h2 i {
      color: var(--agrabo-green);
      font-size: 1rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 9px;
    }

    .form-grid label {
      display: grid;
      gap: 5px;
    }

    .form-grid span {
      color: var(--agrabo-deep);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.76rem;
      font-weight: 900;
    }

    .form-grid span i {
      color: var(--agrabo-green);
      font-size: 0.84rem;
    }

    .form-grid .wide {
      grid-column: 1 / -1;
    }

    .choice-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 9px;
    }

    .choice-grid label {
      display: grid;
      grid-template-columns: 16px 30px minmax(0, 1fr);
      gap: 8px;
      align-items: center;
      border: 1px solid var(--agrabo-line);
      border-radius: 8px;
      padding: 9px;
      background: #fff;
    }

    .choice-grid label:has(input:checked) {
      border-color: var(--agrabo-green);
      background: var(--agrabo-mint);
    }

    .choice-grid label > i {
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      color: var(--agrabo-green);
      background: #fff7e8;
      border-radius: 999px;
      font-size: 0.98rem;
    }

    .choice-grid label:has(input:checked) > i {
      color: #fff;
      background: var(--agrabo-green);
    }

    .choice-grid strong,
    .choice-grid small {
      display: block;
    }

    .choice-grid strong {
      color: var(--agrabo-deep);
      font-size: 0.8rem;
      font-weight: 900;
    }

    .choice-grid small {
      color: var(--agrabo-muted);
      font-size: 0.72rem;
    }

    .checkout-form .btn {
      min-height: 40px;
      font-size: 0.88rem;
    }

    .order-summary {
      position: sticky;
      top: 92px;
      border-top: 3px solid var(--agrabo-green);
    }

    .summary-list {
      display: grid;
      gap: 10px;
    }

    .summary-item {
      display: grid;
      grid-template-columns: 52px minmax(0, 1fr);
      gap: 10px;
      border-bottom: 1px solid var(--agrabo-line);
      padding-bottom: 10px;
    }

    .summary-item img {
      width: 48px;
      height: 52px;
      object-fit: contain;
      background: #fff8ee;
      border-radius: 8px;
    }

    .summary-item strong,
    .summary-item small,
    .summary-item b {
      display: block;
    }

    .summary-item strong {
      color: var(--agrabo-deep);
      font-size: 0.8rem;
      font-weight: 900;
    }

    .summary-item small {
      color: var(--agrabo-muted);
      font-size: 0.74rem;
      margin: 2px 0 6px;
    }

    .summary-item b {
      grid-column: 2;
      color: var(--agrabo-deep);
      font-size: 0.8rem;
    }

    .mini-qty {
      display: inline-grid;
      grid-template-columns: 30px 32px 30px;
      border: 1px solid var(--agrabo-line);
      border-radius: 7px;
      overflow: hidden;
    }

    .mini-qty button {
      border: 0;
      background: #fff;
      color: var(--agrabo-green);
      font-weight: 900;
    }

    .mini-qty span {
      border-inline: 1px solid var(--agrabo-line);
      text-align: center;
      font-weight: 900;
    }

    .summary-totals {
      display: grid;
      gap: 8px;
      margin-top: 14px;
    }

    .summary-totals div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--agrabo-muted);
      font-size: 0.86rem;
    }

    .summary-totals span {
      display: inline-flex;
      align-items: center;
      gap: 7px;
    }

    .summary-totals i {
      color: var(--agrabo-green);
    }

    .summary-totals strong {
      color: var(--agrabo-deep);
    }

    .summary-totals .total {
      border-top: 1px solid var(--agrabo-line);
      color: var(--agrabo-deep);
      font-size: 1rem;
      font-weight: 900;
      padding-top: 10px;
    }

    .summary-totals .total i {
      color: var(--agrabo-amber);
    }

    .empty-summary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: var(--agrabo-muted);
      font-size: 0.86rem;
      padding: 18px 0;
      text-align: center;
    }

    @media (max-width: 900px) {
      .checkout-layout {
        grid-template-columns: 1fr;
      }

      .order-summary {
        position: static;
      }
    }

    @media (max-width: 560px) {
      .form-grid,
      .choice-grid {
        grid-template-columns: 1fr;
      }

      .form-grid .wide {
        grid-column: auto;
      }
    }
  `]
})
export class CheckoutPage {
  private readonly fb = inject(FormBuilder);
  private readonly orders = inject(OrderService);
  readonly cart = inject(CartService);
  readonly deliveryFee = 5000;
  readonly orderSent = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    location: ['', Validators.required],
    district: ['', Validators.required],
    landmark: [''],
    deliveryMethod: ['Delivery', Validators.required],
    preferredDate: [''],
    preferredTime: [''],
    paymentMethod: ['MTN Mobile Money', Validators.required],
    notes: ['']
  });

  submit(): void {
    if (this.form.invalid || this.cart.items().length === 0) {
      return;
    }

    this.orderSent.set(false);
    const value = this.form.getRawValue();
    this.orders.createOrder({
      customer: {
        name: value.name,
        phone: value.phone,
        location: [value.location, value.district, value.landmark ? `Landmark: ${value.landmark}` : ''].filter(Boolean).join(' | ')
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
        this.orderSent.set(true);
        Swal.fire('Order saved', 'We are opening WhatsApp so you can confirm with AGRABO.', 'success');
        window.open(response.whatsappUrl, '_blank');
      },
      error: () => {
        Swal.fire('Order not sent', 'Start the backend and XAMPP MySQL, then try again.', 'error');
      }
    });
  }
}
