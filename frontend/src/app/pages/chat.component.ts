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
      <div class="top">
        <div>
          <span class="badge">MathBuddy</span>
          <h1 class="title">Chat Tutor</h1>
          <p class="sub">Ask primary maths questions (Grade 1–3 only).</p>
        </div>
        <div class="controls">
          <div class="field">
            <label>Grade</label>
            <select [(ngModel)]="grade">
              <option [value]="1">Grade 1</option>
              <option [value]="2">Grade 2</option>
              <option [value]="3">Grade 3</option>
            </select>
          </div>

          <label class="checkbox">
            <input type="checkbox" [(ngModel)]="showSteps" />
            <span class="checkbox-label">Show steps</span>
          </label>
        </div>
      </div>

      <div class="chat-box" id="chatBox">
        <div
          *ngFor="let message of messages"
          class="msg"
          [class.me]="message.role === 'user'"
          [class.them]="message.role !== 'user'"
        >
          <div class="bubble">
            <div class="meta">{{ message.role === "user" ? "You" : "MathBuddy" }}</div>
            <div class="text">{{ message.content }}</div>
          </div>
        </div>
        <div *ngIf="isLoading" class="typing">Thinking…</div>
      </div>

      <div class="composer">
        <textarea
          [(ngModel)]="userInput"
          rows="2"
          placeholder="Example: If I have 8 apples and eat 3, how many are left?"
          (keydown.enter)="onEnter($event)"
        ></textarea>
        <button class="btn" (click)="sendMessage()" [disabled]="isLoading || !userInput.trim()">Send</button>
      </div>

      <p *ngIf="error" class="error">{{ error }}</p>
    </section>
  `,
  styles: [
    `
      .title {
        margin: 0.5rem 0 0.2rem;
      }
      .sub {
        margin: 0;
        color: rgba(255, 255, 255, 0.72);
      }
      .top {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: flex-start;
        margin-bottom: 1rem;
      }
      .controls {
        display: flex;
        gap: 0.8rem;
        align-items: end;
        flex-wrap: wrap;
      }
      .controls .field select {
        min-width: 9.5rem;
        background-color: rgba(15, 27, 51, 0.92);
      }
      .checkbox {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        padding: 0.55rem 0.85rem;
        border: 1px solid rgba(255, 255, 255, 0.16);
        background: rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        color: rgba(255, 255, 255, 0.82);
        min-height: 44px;
      }
      .checkbox-label {
        white-space: nowrap;
        line-height: 1.2;
      }
      .chat-box {
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 16px;
        padding: 0.9rem;
        margin-bottom: 0.8rem;
        background: rgba(255, 255, 255, 0.05);
        max-height: 420px;
        overflow: auto;
      }
      .msg {
        display: flex;
        margin-bottom: 0.7rem;
      }
      .msg.me {
        justify-content: flex-end;
      }
      .bubble {
        width: min(680px, 100%);
        border-radius: 16px;
        padding: 0.75rem 0.85rem;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(255, 255, 255, 0.07);
      }
      .msg.me .bubble {
        border-color: rgba(124, 58, 237, 0.35);
        background: rgba(124, 58, 237, 0.14);
      }
      .meta {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 0.2rem;
      }
      .text {
        white-space: pre-wrap;
        color: rgba(255, 255, 255, 0.92);
      }
      .typing {
        color: rgba(255, 255, 255, 0.65);
        font-size: 0.95rem;
        padding: 0.3rem 0.1rem;
      }
      .composer {
        display: flex;
        gap: 0.7rem;
        align-items: end;
      }
      .composer textarea {
        min-height: 48px;
      }
      .error {
        color: #fecaca;
        margin-top: 0.8rem;
      }
    `,
  ],
})
export class ChatComponent {
  grade = 1;
  showSteps = false;
  userInput = "";
  isLoading = false;
  error = "";
  messages: ChatMessage[] = [
    { role: "assistant", content: "Hi! I can help with grade 1-3 maths. Ask me a question." },
  ];

  constructor(private readonly api: ApiService) {}

  onEnter(ev: Event): void {
    const kev = ev as KeyboardEvent;
    if (kev.shiftKey) return;
    kev.preventDefault();
    this.sendMessage();
  }

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
