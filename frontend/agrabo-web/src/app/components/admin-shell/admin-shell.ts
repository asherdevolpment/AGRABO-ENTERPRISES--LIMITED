import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <section class="admin-shell">
      <aside class="admin-sidebar">
        <a class="admin-brand" routerLink="/admin/dashboard">
          <img src="assets/logos/agrabo-logo-transparent.png" alt="AGRABO logo">
          <span>Admin</span>
        </a>

        <nav aria-label="Admin navigation">
          @for (item of navItems; track item.path) {
            <a [routerLink]="item.path" routerLinkActive="active">
              <i [class]="item.icon"></i>
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>

        <div class="sidebar-footer">
          <a routerLink="/shop"><i class="bi bi-shop"></i><span>View shop</span></a>
          <button type="button" (click)="logout()"><i class="bi bi-box-arrow-right"></i><span>Logout</span></button>
        </div>
      </aside>

      <div class="admin-main">
        <header class="admin-topbar">
          <div>
            <span>AGRABO Enterprise Limited</span>
            <strong>Business admin</strong>
          </div>
          <a class="btn btn-outline-dark btn-sm" routerLink="/shop">Open storefront</a>
        </header>

        <div class="admin-content">
          <ng-content />
        </div>
      </div>
    </section>
  `,
  styles: [`
    .admin-shell {
      display: grid;
      grid-template-columns: 260px minmax(0, 1fr);
      min-height: 100vh;
      background: #f8faf7;
    }

    .admin-sidebar {
      position: sticky;
      top: 0;
      height: 100vh;
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      background: #123b25;
      color: #fff;
      padding: 18px;
    }

    .admin-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #fff;
      text-decoration: none;
      margin-bottom: 26px;
    }

    .admin-brand img {
      width: 118px;
      filter: brightness(0) invert(1);
    }

    .admin-brand span {
      color: rgba(255, 255, 255, 0.72);
      border-left: 1px solid rgba(255, 255, 255, 0.18);
      padding-left: 12px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.72rem;
    }

    nav,
    .sidebar-footer {
      display: grid;
      align-content: start;
      gap: 6px;
    }

    nav a,
    .sidebar-footer a,
    .sidebar-footer button {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 42px;
      color: rgba(255, 255, 255, 0.78);
      background: transparent;
      border: 0;
      border-radius: 8px;
      padding: 0 12px;
      font: inherit;
      font-size: 0.9rem;
      font-weight: 800;
      text-align: left;
      text-decoration: none;
    }

    nav a:hover,
    nav a.active,
    .sidebar-footer a:hover,
    .sidebar-footer button:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(3px);
    }

    nav a.active {
      box-shadow: inset 3px 0 0 var(--agrabo-honey);
    }

    i {
      color: var(--agrabo-honey);
      width: 20px;
      text-align: center;
    }

    .admin-main {
      min-width: 0;
    }

    .admin-topbar {
      position: sticky;
      top: 0;
      z-index: 10;
      min-height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      background: rgba(255, 255, 255, 0.92);
      border-bottom: 1px solid rgba(31, 122, 58, 0.14);
      backdrop-filter: blur(12px);
      padding: 0 clamp(18px, 3vw, 34px);
    }

    .admin-topbar span,
    .admin-topbar strong {
      display: block;
    }

    .admin-topbar span {
      color: #68776a;
      font-size: 0.78rem;
      font-weight: 800;
    }

    .admin-topbar strong {
      color: var(--agrabo-deep);
      font-size: 1.05rem;
      font-weight: 900;
    }

    .admin-content {
      padding: clamp(18px, 3vw, 34px);
    }

    @media (max-width: 900px) {
      .admin-shell {
        grid-template-columns: 1fr;
      }

      .admin-sidebar {
        position: static;
        height: auto;
        grid-template-rows: auto auto auto;
      }

      nav,
      .sidebar-footer {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 520px) {
      nav,
      .sidebar-footer {
        grid-template-columns: 1fr;
      }

      .admin-topbar {
        align-items: flex-start;
        flex-direction: column;
        padding-block: 14px;
      }
    }
  `]
})
export class AdminShell {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'bi bi-speedometer2' },
    { label: 'Products', path: '/admin/products', icon: 'bi bi-box-seam' },
    { label: 'Orders', path: '/admin/orders', icon: 'bi bi-receipt' },
    { label: 'Customers', path: '/admin/customers', icon: 'bi bi-people' },
    { label: 'Inventory', path: '/admin/inventory', icon: 'bi bi-clipboard-data' },
    { label: 'Bulk Requests', path: '/admin/bulk-requests', icon: 'bi bi-briefcase' },
    { label: 'Messages', path: '/admin/contact-messages', icon: 'bi bi-envelope' },
    { label: 'Reports', path: '/admin/reports', icon: 'bi bi-bar-chart' },
    { label: 'Settings', path: '/admin/settings', icon: 'bi bi-gear' }
  ];

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/admin/login');
  }
}
