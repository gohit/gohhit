import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
import { ApiService } from "../services/api.service";
import { HttpErrorResponse } from "@angular/common/http";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

@Component({
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  template: `
    <section class="card">
      <h1>MathBuddy Chat</h1>
      <p>Ask primary maths questions (Grade 1-3 only).</p>

      <div class="controls">
        <label>
          Grade
          <select [(ngModel)]="grade">
            <option [value]="1">Grade 1</option>
            <option [value]="2">Grade 2</option>
            <option [value]="3">Grade 3</option>
          </select>
        </label>

        <label class="checkbox">
          <input type="checkbox" [(ngModel)]="showSteps" />
          Show step-by-step
        </label>
      </div>

      <div class="chat-box">
        <div *ngFor="let message of messages" [class.user]="message.role === 'user'" class="bubble">
          <strong>{{ message.role === "user" ? "You" : "MathBuddy" }}:</strong>
          <span>{{ message.content }}</span>
        </div>
      </div>

      <textarea [(ngModel)]="userInput" rows="3" placeholder="Example: If I have 8 apples and eat 3, how many are left?"></textarea>
      <div class="actions">
        <button (click)="sendMessage()" [disabled]="isLoading || !userInput.trim()">Send</button>
      </div>
      <p *ngIf="error" class="error">{{ error }}</p>
    </section>
  `,
  styles: [
    `
      .controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.8rem;
        margin-bottom: 1rem;
      }
      .checkbox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .chat-box {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 0.8rem;
        margin-bottom: 0.7rem;
        background: #f9fafb;
        max-height: 340px;
        overflow: auto;
      }
      .bubble {
        margin-bottom: 0.8rem;
      }
      .user {
        color: #1d4ed8;
      }
      .actions {
        margin-top: 0.6rem;
      }
      .error {
        color: #b91c1c;
      }
    `,
  ],
})
export class ChatComponent {
  grade = 1;
  showSteps = true;
  userInput = "";
  isLoading = false;
  error = "";
  messages: ChatMessage[] = [
    { role: "assistant", content: "Hi! I can help with grade 1-3 maths. Ask me a question." },
  ];

  constructor(private readonly api: ApiService) {}

  sendMessage(): void {
    const text = this.userInput.trim();
    if (!text) return;

    this.error = "";
    this.messages.push({ role: "user", content: text });
    this.userInput = "";
    this.isLoading = true;

    this.api.chat({ message: text, grade: this.grade, show_steps: this.showSteps }).subscribe({
      next: (res) => {
        this.messages.push({ role: "assistant", content: res.answer });
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        const backendMessage =
          typeof err?.error?.detail === "string" ? err.error.detail : "";
        this.error = backendMessage || "Could not reach server. Please check backend is running.";
        this.isLoading = false;
      },
    });
  }
}
