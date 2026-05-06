import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container nav">
        <a routerLink="/" class="brand">
          <img class="logo" src="/assets/logo.svg" alt="gohhit logo" />
          <span>GOHHIT</span>
        </a>
        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
          <a routerLink="/contact" routerLinkActive="active">Contact</a>
          <a routerLink="/projects/mathbuddy/chat" routerLinkActive="active">MathBuddy</a>
        </nav>
      </div>
    </header>
    <main class="container main">
      <router-outlet />
    </main>
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-left">
          <div class="footer-brand">GOHHIT</div>
          <div class="footer-sub">Built by Mohit Lalwani</div>
        </div>
        <div class="footer-links">
          <a href="mailto:mohit.1211ml@gmail.com">mohit.1211ml&#64;gmail.com</a>
          <a href="https://github.com/gohit" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/mohit-lalwani-199a4914b/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .site-header {
        background: #ffffff;
        border-bottom: 1px solid #e5e7eb;
      }
      .nav {
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .brand {
        text-decoration: none;
        color: #111827;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
      }
      .logo {
        width: 28px;
        height: 28px;
        display: block;
      }
      nav {
        display: flex;
        gap: 0.8rem;
      }
      nav a {
        text-decoration: none;
        color: #374151;
        padding: 0.4rem 0.55rem;
        border-radius: 6px;
      }
      nav a.active,
      nav a:hover {
        background: #eff6ff;
        color: #1d4ed8;
      }
      .main {
        padding: 1.1rem 0 2rem;
      }
      .site-footer {
        margin-top: 2rem;
        padding: 1.5rem 0;
        border-top: 1px solid #e5e7eb;
        background: #ffffff;
      }
      .footer-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .footer-brand {
        font-weight: 700;
      }
      .footer-sub {
        color: #6b7280;
        font-size: 0.92rem;
        margin-top: 0.2rem;
      }
      .footer-links {
        display: flex;
        gap: 0.9rem;
        flex-wrap: wrap;
      }
      .footer-links a {
        color: #1d4ed8;
        text-decoration: none;
      }
      .footer-links a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class AppComponent {}
