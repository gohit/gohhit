import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
import { ApiService, QuizQuestion, QuizSubmissionItem } from "../services/api.service";

@Component({
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  template: `
    <section class="card">
      <h1>MathBuddy Quiz</h1>
      <p>Generate a 5-question quiz for Grade 1-3 and get instant feedback.</p>

      <div class="toolbar">
        <label>
          Grade
          <select [(ngModel)]="grade">
            <option [value]="1">Grade 1</option>
            <option [value]="2">Grade 2</option>
            <option [value]="3">Grade 3</option>
          </select>
        </label>
        <button (click)="generateQuiz()" [disabled]="loading">Generate Quiz</button>
      </div>

      <div *ngIf="questions.length > 0" class="questions">
        <div *ngFor="let q of questions" class="question-block">
          <p><strong>Q{{ q.id }}.</strong> {{ q.question }}</p>
          <input [(ngModel)]="answers[q.id]" placeholder="Your answer" />
        </div>

        <button (click)="submitQuiz()" [disabled]="loading">Submit Answers</button>
      </div>

      <div *ngIf="result" class="result card">
        <h3>Score: {{ result.score }} / {{ result.total }}</h3>
        <div *ngFor="let item of result.results">
          <p>
            <strong>Q{{ item.id }}</strong>: {{ item.question }}<br />
            Your answer: {{ item.user_answer }}<br />
            Correct answer: {{ item.correct_answer }}<br />
            <span [class.ok]="item.is_correct" [class.bad]="!item.is_correct">{{ item.feedback }}</span>
          </p>
        </div>
      </div>

      <p *ngIf="error" class="error">{{ error }}</p>
    </section>
  `,
  styles: [
    `
      .toolbar {
        display: flex;
        gap: 0.8rem;
        align-items: end;
        margin-bottom: 1rem;
      }
      .questions {
        display: grid;
        gap: 0.8rem;
      }
      .question-block {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 0.8rem;
        background: #f9fafb;
      }
      .result {
        margin-top: 1rem;
      }
      .ok {
        color: #166534;
      }
      .bad {
        color: #b91c1c;
      }
      .error {
        color: #b91c1c;
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
