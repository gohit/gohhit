import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container nav">
        <a routerLink="/" class="brand">gohhit.com</a>
        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
          <a routerLink="/projects/mathbuddy/chat" routerLinkActive="active">MathBuddy</a>
        </nav>
      </div>
    </header>
    <main class="container main">
      <router-outlet />
    </main>
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
    `,
  ],
})
export class AppComponent {}
