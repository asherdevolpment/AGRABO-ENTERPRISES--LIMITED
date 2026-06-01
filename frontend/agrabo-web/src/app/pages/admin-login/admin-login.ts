import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login-page',
  imports: [ReactiveFormsModule],
  template: `
    <section class="section-band">
      <div class="container">
        <div class="mx-auto mini-card" style="max-width: 460px;">
          <p class="eyebrow">Admin</p>
          <h1 class="h2 fw-bold mb-4">Dashboard login</h1>
          <form [formGroup]="form" (ngSubmit)="submit()">
            <label class="form-label">Email</label>
            <input class="form-control mb-3" formControlName="email" type="email">
            <label class="form-label">Password</label>
            <input class="form-control mb-3" formControlName="password" type="password">
            <button class="btn btn-agrabo w-100" type="submit" [disabled]="form.invalid">Login</button>
          </form>
          <p class="small text-muted mt-3 mb-0">Starter admin: admin@agrabo.local / Admin@12345</p>
        </div>
      </div>
    </section>
  `
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
