import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface ChatRequest {
  message: string;
  grade: number;
  show_steps: boolean;
}

export interface ChatResponse {
  answer: string;
  is_math_related: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
}

export interface QuizGenerateResponse {
  questions: QuizQuestion[];
}

export interface QuizSubmissionItem {
  id: number;
  question: string;
  user_answer: string;
}

export interface QuizEvaluateResponse {
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
}

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly apiBase = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  chat(payload: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiBase}/chat`, payload);
  }

  generateQuiz(grade: number): Observable<QuizGenerateResponse> {
    return this.http.post<QuizGenerateResponse>(`${this.apiBase}/quiz/generate`, {
      grade,
      question_count: 5,
    });
  }

  evaluateQuiz(grade: number, submissions: QuizSubmissionItem[]): Observable<QuizEvaluateResponse> {
    return this.http.post<QuizEvaluateResponse>(`${this.apiBase}/quiz/evaluate`, {
      grade,
      submissions,
    });
  }
}
