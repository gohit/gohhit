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
          <a class="icon-link" href="mailto:mohit.1211ml@gmail.com" aria-label="Email" title="Email">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
              />
            </svg>
          </a>
          <a class="icon-link" href="https://github.com/gohit" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.8 1.6.8.9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0C16.9 5 17.9 5.3 17.9 5.3c.6 1.6.2 2.8.1 3.1.8.9 1.2 2 1.2 3.3 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
              />
            </svg>
          </a>
          <a
            class="icon-link"
            href="https://www.linkedin.com/in/mohit-lalwani-199a4914b/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 21h4V9H3v12Zm7 0h4v-6.2c0-1.7.3-3.4 2.4-3.4 2 0 2 1.9 2 3.5V21h4v-7c0-3.4-.7-6-4.7-6-1.9 0-3.2 1-3.7 2h-.1V9h-3.8v12Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .site-header {
        position: sticky;
        top: 0;
        z-index: 10;
        background: rgba(10, 16, 30, 0.55);
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(12px);
      }
      .nav {
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .brand {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.92);
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
        color: rgba(255, 255, 255, 0.78);
        padding: 0.4rem 0.55rem;
        border-radius: 6px;
      }
      nav a.active,
      nav a:hover {
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.92);
      }
      .main {
        padding: 1.2rem 0 2rem;
      }
      .site-footer {
        margin-top: 2rem;
        padding: 1.5rem 0;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(10, 16, 30, 0.35);
        backdrop-filter: blur(12px);
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
        color: rgba(255, 255, 255, 0.62);
        font-size: 0.92rem;
        margin-top: 0.2rem;
      }
      .footer-links {
        display: flex;
        gap: 0.9rem;
        flex-wrap: wrap;
        align-items: center;
      }
      .icon-link {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.16);
        background: rgba(255, 255, 255, 0.06);
        color: rgba(255, 255, 255, 0.9);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: background 120ms ease, border-color 120ms ease, transform 120ms ease;
      }
      .icon-link svg {
        width: 18px;
        height: 18px;
        display: block;
      }
      .icon-link:hover {
        background: rgba(255, 255, 255, 0.11);
        border-color: rgba(255, 255, 255, 0.22);
        transform: translateY(-1px);
      }
      .icon-link:focus-visible {
        outline: 2px solid rgba(124, 58, 237, 0.9);
        outline-offset: 2px;
      }
      @media (max-width: 640px) {
        .nav {
          height: auto;
          padding: 0.75rem 0;
          gap: 0.8rem;
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `,
  ],
})
export class AppComponent {}
