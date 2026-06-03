import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AdminBulkRequestsPage } from './pages/admin-bulk-requests/admin-bulk-requests';
import { AdminContactMessagesPage } from './pages/admin-contact-messages/admin-contact-messages';
import { AdminCustomersPage } from './pages/admin-customers/admin-customers';
import { AdminDashboardPage } from './pages/admin-dashboard/admin-dashboard';
import { AdminInventoryPage } from './pages/admin-inventory/admin-inventory';
import { AdminLoginPage } from './pages/admin-login/admin-login';
import { AdminOrdersPage } from './pages/admin-orders/admin-orders';
import { AdminProductsPage } from './pages/admin-products/admin-products';
import { AdminReportsPage } from './pages/admin-reports/admin-reports';
import { AdminSettingsPage } from './pages/admin-settings/admin-settings';
import { BulkOrdersPage } from './pages/bulk-orders/bulk-orders';
import { CheckoutPage } from './pages/checkout/checkout';
import { ContactPage } from './pages/contact/contact';
import { ProductDetailPage } from './pages/product-detail/product-detail';
import { ShopPage } from './pages/shop/shop';

export const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'shop', component: ShopPage, title: 'Shop Deli Honey' },
  { path: 'product/:id', component: ProductDetailPage, title: 'Deli Honey Product' },
  { path: 'checkout', component: CheckoutPage, title: 'Checkout' },
  { path: 'bulk-orders', component: BulkOrdersPage, title: 'Bulk Orders' },
  { path: 'contact', component: ContactPage, title: 'Contact AGRABO' },
  { path: 'admin/login', component: AdminLoginPage, title: 'Admin Login' },
  { path: 'admin/dashboard', component: AdminDashboardPage, canActivate: [authGuard], title: 'Admin Dashboard' },
  { path: 'admin/products', component: AdminProductsPage, canActivate: [authGuard], title: 'Admin Products' },
  { path: 'admin/orders', component: AdminOrdersPage, canActivate: [authGuard], title: 'Admin Orders' },
  { path: 'admin/customers', component: AdminCustomersPage, canActivate: [authGuard], title: 'Admin Customers' },
  { path: 'admin/inventory', component: AdminInventoryPage, canActivate: [authGuard], title: 'Admin Inventory' },
  { path: 'admin/bulk-requests', component: AdminBulkRequestsPage, canActivate: [authGuard], title: 'Admin Bulk Requests' },
  { path: 'admin/contact-messages', component: AdminContactMessagesPage, canActivate: [authGuard], title: 'Admin Messages' },
  { path: 'admin/reports', component: AdminReportsPage, canActivate: [authGuard], title: 'Admin Reports' },
  { path: 'admin/settings', component: AdminSettingsPage, canActivate: [authGuard], title: 'Admin Settings' },
  { path: '**', redirectTo: 'shop' }
];
