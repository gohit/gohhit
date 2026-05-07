import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Component({
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <section class="card">
      <span class="badge">Contact</span>
      <h1>Say hello</h1>
      <p>
        Have a question, feedback, or an idea? Send me a message — I’m always open to learning and improving.
      </p>

      <div class="grid">
        <div class="field">
          <label>Name</label>
          <input [(ngModel)]="name" placeholder="Your name" />
        </div>

        <div class="field">
          <label>Email</label>
          <input [(ngModel)]="email" placeholder="you@example.com" />
        </div>
      </div>

      <div class="field">
        <label>Message</label>
        <textarea [(ngModel)]="message" rows="6" placeholder="Write your message..."></textarea>
      </div>

      <div class="actions">
        <button class="btn" (click)="submit()" [disabled]="loading || !canSubmit()">Send</button>
        <a class="link" href="mailto:mohit.1211ml@gmail.com">Or email directly</a>
      </div>

      <p *ngIf="status" class="status">{{ status }}</p>
      <p *ngIf="error" class="error">{{ error }}</p>
    </section>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 0.8rem;
      }
      .actions {
        margin-top: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.9rem;
        flex-wrap: wrap;
      }
      .link {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
      }
      .link:hover {
        text-decoration: underline;
      }
      .status {
        color: #86efac;
        margin-top: 0.8rem;
      }
      .error {
        color: #fecaca;
        margin-top: 0.8rem;
      }
    `,
  ],
})
export class ContactComponent {
  name = "";
  email = "";
  message = "";
  loading = false;
  status = "";
  error = "";

  constructor(private readonly http: HttpClient) {}

  canSubmit(): boolean {
    return this.name.trim().length > 0 && this.email.trim().length > 3 && this.message.trim().length > 3;
  }

  submit(): void {
    this.status = "";
    this.error = "";
    this.loading = true;

    const payload = {
      name: this.name.trim(),
      email: this.email.trim(),
      message: this.message.trim(),
    };

    const endpoint = (environment as any).contactFormEndpoint as string;

    if (endpoint && endpoint.trim()) {
      this.http.post(endpoint.trim(), payload).subscribe({
        next: () => {
          this.status = "Thanks! Your message was sent.";
          this.loading = false;
          this.name = "";
          this.email = "";
          this.message = "";
        },
        error: (err: HttpErrorResponse) => {
          this.error =
            (typeof err?.error?.detail === "string" && err.error.detail) ||
            "Could not send message right now. Please email me directly.";
          this.loading = false;
        },
      });
      return;
    }

    const subject = encodeURIComponent("GOHHIT — Contact");
    const body = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}\n`
    );
    window.location.href = `mailto:mohit.1211ml@gmail.com?subject=${subject}&body=${body}`;
    this.status = "Opening your email app...";
    this.loading = false;
  }
}

