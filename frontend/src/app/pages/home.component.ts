import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="card hero-card">
        <span class="badge">Personal site • Projects • Experiments</span>
        <h1>
          Building simple, practical software —
          <span class="accent">and learning fast</span>.
        </h1>
        <p>
          Welcome to GOHHIT. This is my long-term home on the internet. I ship small projects, iterate quickly,
          and keep things clean and usable.
        </p>
        <div class="actions">
          <a routerLink="/projects/mathbuddy/chat"><button class="btn">Try MathBuddy</button></a>
          <a routerLink="/about"><button class="btn secondary">About</button></a>
          <a routerLink="/contact"><button class="btn ghost">Contact</button></a>
        </div>
      </div>

      <div class="card hero-side">
        <div class="kpi">
          <div class="kpi-num">1</div>
          <div class="kpi-text">Featured project</div>
        </div>
        <div class="project-card">
          <div class="project-top">
            <div>
              <div class="project-title">MathBuddy</div>
              <div class="project-sub">Primary math tutor (Grades 1–3)</div>
            </div>
            <span class="pill">GenAI + Full‑Stack</span>
          </div>
          <p class="project-desc">
            Chat tutor + quiz generator with guardrails. Built with Angular + FastAPI + OpenAI.
          </p>
          <div class="project-actions">
            <a routerLink="/projects/mathbuddy/chat"><button class="btn">Chat</button></a>
            <a routerLink="/projects/mathbuddy/quiz"><button class="btn secondary">Quiz</button></a>
          </div>
        </div>
      </div>
    </section>

    <section class="grid">
      <div class="card soft">
        <h3>What I’m doing here</h3>
        <p>
          A personal site that can grow with me. Each project is a page — easy to add, easy to share.
        </p>
      </div>
      <div class="card soft">
        <h3>What I like building</h3>
        <p>
          Practical apps, clean APIs, and products that feel simple. GenAI when it adds real value.
        </p>
      </div>
      <div class="card soft">
        <h3>Have an idea?</h3>
        <p>
          If you have suggestions or project ideas, I’d love to hear them.
        </p>
        <a routerLink="/contact"><button class="btn ghost">Send a message</button></a>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        display: flex;
        gap: 1rem;
        align-items: stretch;
      }
      .hero-card h1 {
        margin: 0.6rem 0 0.3rem;
        font-size: clamp(2rem, 3.5vw, 2.7rem);
        line-height: 1.08;
      }
      .accent {
        background: linear-gradient(135deg, #a78bfa, #22c55e);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .actions {
        margin-top: 1rem;
        display: flex;
        gap: 0.65rem;
        flex-wrap: wrap;
      }
      .hero-side {
        width: min(420px, 100%);
      }
      .kpi {
        display: flex;
        gap: 0.7rem;
        align-items: center;
        margin-bottom: 0.8rem;
      }
      .kpi-num {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        font-weight: 800;
        background: rgba(124, 58, 237, 0.18);
        border: 1px solid rgba(124, 58, 237, 0.28);
      }
      .kpi-text {
        color: rgba(255, 255, 255, 0.78);
      }
      .project-card {
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 14px;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.06);
      }
      .project-top {
        display: flex;
        justify-content: space-between;
        gap: 0.8rem;
        align-items: flex-start;
      }
      .pill {
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(255, 255, 255, 0.07);
        padding: 0.25rem 0.55rem;
        border-radius: 999px;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.75);
        white-space: nowrap;
      }
      .project-title {
        font-weight: 800;
        font-size: 1.1rem;
      }
      .project-sub {
        color: rgba(255, 255, 255, 0.72);
        font-size: 0.95rem;
        margin-top: 0.15rem;
      }
      .project-desc {
        margin: 0.8rem 0 0.9rem;
        color: rgba(255, 255, 255, 0.72);
      }
      .project-actions {
        display: flex;
        gap: 0.6rem;
        flex-wrap: wrap;
      }

      .grid {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }
      .grid h3 {
        margin-top: 0;
      }
      @media (max-width: 900px) {
        .hero {
          flex-direction: column;
        }
        .hero-side {
          width: 100%;
        }
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class HomeComponent {}
