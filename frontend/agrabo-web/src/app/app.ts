import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { CartDrawer } from './components/cart-drawer/cart-drawer';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { WhatsappButton } from './components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, WhatsappButton, CartDrawer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly router = inject(Router);

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}
