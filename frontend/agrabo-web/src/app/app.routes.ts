import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AboutPage } from './pages/about/about';
import { AdminBulkRequestsPage } from './pages/admin-bulk-requests/admin-bulk-requests';
import { AdminContactMessagesPage } from './pages/admin-contact-messages/admin-contact-messages';
import { AdminDashboardPage } from './pages/admin-dashboard/admin-dashboard';
import { AdminLoginPage } from './pages/admin-login/admin-login';
import { AdminOrdersPage } from './pages/admin-orders/admin-orders';
import { AdminProductsPage } from './pages/admin-products/admin-products';
import { AdminSettingsPage } from './pages/admin-settings/admin-settings';
import { BulkOrdersPage } from './pages/bulk-orders/bulk-orders';
import { CheckoutPage } from './pages/checkout/checkout';
import { ContactPage } from './pages/contact/contact';
import { HomePage } from './pages/home/home';
import { ProductDetailPage } from './pages/product-detail/product-detail';
import { ShopPage } from './pages/shop/shop';
import { TestimonialsPage } from './pages/testimonials/testimonials';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'AGRABO Deli Honey' },
  { path: 'shop', component: ShopPage, title: 'Shop Deli Honey' },
  { path: 'product/:id', component: ProductDetailPage, title: 'Deli Honey Product' },
  { path: 'checkout', component: CheckoutPage, title: 'Checkout' },
  { path: 'bulk-orders', component: BulkOrdersPage, title: 'Bulk Orders' },
  { path: 'about', component: AboutPage, title: 'About AGRABO' },
  { path: 'testimonials', component: TestimonialsPage, title: 'Testimonials' },
  { path: 'contact', component: ContactPage, title: 'Contact AGRABO' },
  { path: 'admin/login', component: AdminLoginPage, title: 'Admin Login' },
  { path: 'admin/dashboard', component: AdminDashboardPage, canActivate: [authGuard], title: 'Admin Dashboard' },
  { path: 'admin/products', component: AdminProductsPage, canActivate: [authGuard], title: 'Admin Products' },
  { path: 'admin/orders', component: AdminOrdersPage, canActivate: [authGuard], title: 'Admin Orders' },
  { path: 'admin/bulk-requests', component: AdminBulkRequestsPage, canActivate: [authGuard], title: 'Admin Bulk Requests' },
  { path: 'admin/contact-messages', component: AdminContactMessagesPage, canActivate: [authGuard], title: 'Admin Messages' },
  { path: 'admin/settings', component: AdminSettingsPage, canActivate: [authGuard], title: 'Admin Settings' },
  { path: '**', redirectTo: '' }
];
