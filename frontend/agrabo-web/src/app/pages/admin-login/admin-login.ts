import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login-page',
  imports: [ReactiveFormsModule],
  template: `
    <section class="admin-login">
      <div class="login-panel">
        <img src="assets/logos/agrabo-logo-transparent.png" alt="AGRABO logo">
        <span class="eyebrow">Secure admin</span>
        <h1>Sign in to manage the shop</h1>
        <p>Manage products, orders, quote requests, customer messages, and storefront settings.</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>
            <span>Email</span>
            <input class="form-control" formControlName="email" type="email" autocomplete="username">
          </label>
          <label>
            <span>Password</span>
            <input class="form-control" formControlName="password" type="password" autocomplete="current-password">
          </label>
          <button class="btn btn-agrabo w-100" type="submit" [disabled]="form.invalid">Login</button>
        </form>

        <small>Starter admin: admin&#64;agrabo.local / Admin&#64;12345</small>
      </div>
    </section>
  `,
  styles: [`
    .admin-login {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background:
        radial-gradient(circle at 80% 16%, rgba(31, 122, 58, 0.13), transparent 22rem),
        linear-gradient(135deg, #fffaf0 0%, var(--agrabo-mint) 100%);
      padding: 24px;
    }

    .login-panel {
      width: min(100%, 460px);
      background: #fff;
      border: 1px solid rgba(31, 122, 58, 0.14);
      border-radius: 8px;
      box-shadow: 0 18px 48px rgba(31, 122, 58, 0.1);
      padding: clamp(24px, 4vw, 36px);
    }

    img {
      width: 140px;
      margin-bottom: 18px;
    }

    h1 {
      color: var(--agrabo-deep);
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(2rem, 4vw, 2.65rem);
      font-weight: 900;
      line-height: 1;
      margin: 0 0 12px;
    }

    p {
      color: #5d4c45;
      line-height: 1.55;
      margin-bottom: 22px;
    }

    form,
    label {
      display: grid;
      gap: 8px;
    }

    form {
      gap: 14px;
    }

    label span {
      color: var(--agrabo-deep);
      font-size: 0.82rem;
      font-weight: 900;
    }

    small {
      display: block;
      color: #66756a;
      margin-top: 16px;
    }
  `]
})
export class AdminLoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    email: ['admin@agrabo.local', [Validators.required, Validators.email]],
    password: ['Admin@12345', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.auth.login(this.form.value.email || '', this.form.value.password || '').subscribe({
      next: () => this.router.navigateByUrl('/admin/dashboard'),
      error: () => Swal.fire('Login failed', 'Check the backend, database, and admin credentials.', 'error')
    });
  }
}
