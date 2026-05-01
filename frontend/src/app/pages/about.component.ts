import { Component } from "@angular/core";

@Component({
  standalone: true,
  template: `
    <section class="card">
      <h1>About</h1>
      <p>
        MathBuddy is a portfolio project built with Angular and FastAPI. It demonstrates
        a practical GenAI + full-stack workflow.
      </p>
      <h3>Tech stack</h3>
      <ul>
        <li>Frontend: Angular</li>
        <li>Backend: Python FastAPI</li>
        <li>Model: OpenAI cost-friendly default model</li>
      </ul>
      <h3>Safety limits</h3>
      <ul>
        <li>Supports only primary maths for grade 1-3</li>
        <li>Rejects non-math questions politely</li>
        <li>Uses simple, child-friendly language</li>
      </ul>
    </section>
  `,
})
export class AboutComponent {}
