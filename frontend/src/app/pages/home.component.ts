import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="card hero">
      <h1>Hi, I am building on gohhit.com</h1>
      <p>
        This is my personal website base. I can add multiple projects over time.
        The current featured project is MathBuddy.
      </p>
      <div class="actions">
        <a routerLink="/projects/mathbuddy/chat"><button>Open MathBuddy Chat</button></a>
        <a routerLink="/projects/mathbuddy/quiz"><button class="ghost">Open MathBuddy Quiz</button></a>
        <a routerLink="/contact"><button class="ghost2">Contact</button></a>
      </div>
    </section>

    <section class="card projects">
      <h2>Projects</h2>
      <div class="project-row">
        <div>
          <h3>MathBuddy (Primary Maths Tutor)</h3>
          <p>AI tutor focused on grade 1-3 maths with safe, child-friendly answers.</p>
        </div>
        <a routerLink="/projects/mathbuddy/chat"><button>Launch</button></a>
      </div>
    </section>
  `,
  styles: [
    `
      .hero h1 {
        margin-top: 0;
      }
      .actions {
        display: flex;
        gap: 0.7rem;
        flex-wrap: wrap;
      }
      .ghost {
        background: #4b5563;
      }
      .ghost2 {
        background: #111827;
      }
      .projects {
        margin-top: 1rem;
      }
      .project-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }
      .project-row h3 {
        margin-bottom: 0.3rem;
      }
      .project-row p {
        margin-top: 0;
      }
    `,
  ],
})
export class HomeComponent {}
