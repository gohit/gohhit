import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
import { ApiService, QuizQuestion, QuizSubmissionItem } from "../services/api.service";

@Component({
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  template: `
    <section class="card">
      <div class="top">
        <div>
          <span class="badge">MathBuddy</span>
          <h1 class="title">Quiz</h1>
          <p class="sub">Generate 5 questions for Grade 1–3 and get instant feedback.</p>
        </div>
        <div class="toolbar">
          <div class="field">
            <label>Grade</label>
            <select [(ngModel)]="grade">
              <option [value]="1">Grade 1</option>
              <option [value]="2">Grade 2</option>
              <option [value]="3">Grade 3</option>
            </select>
          </div>
          <button class="btn" (click)="generateQuiz()" [disabled]="loading">Generate</button>
        </div>
      </div>

      <div *ngIf="questions.length > 0" class="questions">
        <div *ngFor="let q of questions" class="question-block">
          <div class="qhead">
            <div class="qnum">Q{{ q.id }}</div>
            <div class="qtext">{{ q.question }}</div>
          </div>
          <input [(ngModel)]="answers[q.id]" placeholder="Your answer" />
        </div>

        <button class="btn" (click)="submitQuiz()" [disabled]="loading">Submit</button>
      </div>

      <div *ngIf="loading" class="loading">Working…</div>

      <div *ngIf="result" class="result">
        <div class="result-head">
          <div class="score">Score</div>
          <div class="score-num">{{ result.score }} / {{ result.total }}</div>
        </div>
        <div *ngFor="let item of result.results" class="result-item">
          <div class="qline"><strong>Q{{ item.id }}</strong> {{ item.question }}</div>
          <div class="aline">
            <span class="label">You:</span> {{ item.user_answer }}
          </div>
          <div class="aline">
            <span class="label">Correct:</span> {{ item.correct_answer }}
          </div>
          <div class="feedback" [class.ok]="item.is_correct" [class.bad]="!item.is_correct">
            {{ item.feedback }}
          </div>
        </div>
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
      .toolbar {
        display: flex;
        gap: 0.8rem;
        align-items: end;
      }
      .questions {
        display: grid;
        gap: 0.8rem;
      }
      .question-block {
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 16px;
        padding: 0.95rem;
        background: rgba(255, 255, 255, 0.05);
      }
      .qhead {
        display: flex;
        gap: 0.7rem;
        align-items: flex-start;
        margin-bottom: 0.65rem;
      }
      .qnum {
        width: 44px;
        height: 32px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        font-weight: 800;
        background: rgba(124, 58, 237, 0.18);
        border: 1px solid rgba(124, 58, 237, 0.28);
      }
      .qtext {
        color: rgba(255, 255, 255, 0.92);
        line-height: 1.4;
      }
      .loading {
        margin-top: 1rem;
        color: rgba(255, 255, 255, 0.7);
      }
      .result {
        margin-top: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 16px;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
      }
      .result-head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1rem;
        padding-bottom: 0.8rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 0.8rem;
      }
      .score {
        color: rgba(255, 255, 255, 0.72);
      }
      .score-num {
        font-weight: 900;
        font-size: 1.3rem;
      }
      .result-item {
        padding: 0.7rem 0;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
      }
      .result-item:last-child {
        border-bottom: none;
      }
      .ok {
        color: #86efac;
      }
      .bad {
        color: #fecaca;
      }
      .qline {
        color: rgba(255, 255, 255, 0.92);
        margin-bottom: 0.3rem;
      }
      .aline {
        color: rgba(255, 255, 255, 0.78);
        margin-top: 0.2rem;
      }
      .label {
        color: rgba(255, 255, 255, 0.55);
      }
      .feedback {
        margin-top: 0.35rem;
        color: rgba(255, 255, 255, 0.78);
      }
      .error {
        color: #fecaca;
        margin-top: 0.8rem;
      }
    `,
  ],
})
export class QuizComponent {
  grade = 1;
  questions: QuizQuestion[] = [];
  answers: Record<number, string> = {};
  loading = false;
  error = "";
  result: {
    score: number;
    total: number;
    results: Array<{
      id: number;
      question: string;
      user_answer: string;
      is_correct: boolean;
      correct_answer: string;
      feedback: string;
    }>;
  } | null = null;

  constructor(private readonly api: ApiService) {}

  generateQuiz(): void {
    this.error = "";
    this.result = null;
    this.loading = true;
    this.api.generateQuiz(this.grade).subscribe({
      next: (res) => {
        this.questions = res.questions;
        this.answers = {};
        this.loading = false;
      },
      error: () => {
        this.error = "Could not generate quiz. Please check backend is running.";
        this.loading = false;
      },
    });
  }

  submitQuiz(): void {
    this.error = "";
    const submissions: QuizSubmissionItem[] = this.questions.map((q) => ({
      id: q.id,
      question: q.question,
      user_answer: (this.answers[q.id] || "").trim(),
    }));

    const hasEmpty = submissions.some((s) => !s.user_answer);
    if (hasEmpty) {
      this.error = "Please answer all questions before submitting.";
      return;
    }

    this.loading = true;
    this.api.evaluateQuiz(this.grade, submissions).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
      },
      error: () => {
        this.error = "Could not evaluate quiz. Please try again.";
        this.loading = false;
      },
    });
  }
}
