import { Component } from "@angular/core";

@Component({
  standalone: true,
  template: `
    <section class="card">
      <h1>About</h1>
      <p>
        Hi, I’m <strong>Mohit Lalwani</strong> — from <strong>Jaipur, Rajasthan</strong>.
        I come from a business family and I’m currently working as a <strong>Software Engineer</strong>.
      </p>

      <p>
        I’m always excited about new things and eager to learn. I like building simple,
        practical products and improving them step-by-step.
      </p>

      <h3>What you’ll find here</h3>
      <ul>
        <li>A lightweight personal website base for long-term use</li>
        <li>Small projects I build and ship quickly</li>
      </ul>

      <h3>Featured project: MathBuddy</h3>
      <p>
        MathBuddy is a small GenAI + full-stack project that helps with primary maths (grade 1-3)
        through a chat tutor and quick quizzes.
      </p>
    </section>
  `,
})
export class AboutComponent {}
