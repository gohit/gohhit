import json
import os
from pathlib import Path
from typing import Any, Dict, List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

from .schemas import (
    ChatRequest,
    ChatResponse,
    QuizEvaluateRequest,
    QuizEvaluateResponse,
    QuizGenerateRequest,
    QuizGenerateResponse,
    QuizQuestion,
    QuizResultItem,
)

BASE_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BASE_DIR / ".env")

app = FastAPI(title="MathBuddy API", version="1.0.0")

cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:4200,http://127.0.0.1:4200")
allowed_origins = [origin.strip() for origin in cors_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai_api_key = os.getenv("OPENAI_API_KEY")
openai_model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
client = OpenAI(api_key=openai_api_key) if openai_api_key else None


def _require_client() -> OpenAI:
    if not client:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY is not configured.")
    return client


def _parse_json_response(content: str) -> Dict[str, Any]:
    try:
        return json.loads(content)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=502, detail="Model returned invalid JSON.") from exc


@app.get("/api/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    ai = _require_client()
    system_prompt = (
        "You are MathBuddy, a primary-school math tutor for grades 1 to 3. "
        "You only answer math-related questions suitable for this age group. "
        "If the prompt is not a primary math question, set is_math_related=false and return a short, polite refusal. "
        "Keep language simple and child-friendly. "
        "Return strict JSON with keys: is_math_related (boolean), answer (string)."
    )

    style = "Give step-by-step explanation." if payload.show_steps else "Give only short final answer."
    user_prompt = (
        f"Grade level: {payload.grade}\n"
        f"Style: {style}\n"
        f"Question: {payload.message}"
    )

    completion = ai.chat.completions.create(
        model=openai_model,
        temperature=0.2,
        max_tokens=300,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    )
    content = completion.choices[0].message.content or "{}"
    parsed = _parse_json_response(content)

    return ChatResponse(
        answer=str(parsed.get("answer", "I can only help with primary math questions.")),
        is_math_related=bool(parsed.get("is_math_related", False)),
    )


@app.post("/api/quiz/generate", response_model=QuizGenerateResponse)
def generate_quiz(payload: QuizGenerateRequest) -> QuizGenerateResponse:
    ai = _require_client()

    prompt = (
        f"Create {payload.question_count} primary math questions for grade {payload.grade}. "
        "Use only age-appropriate arithmetic and simple word problems. "
        "Return strict JSON with this shape: {\"questions\":[{\"id\":1,\"question\":\"...\"}]} "
        "Do not include answers."
    )

    completion = ai.chat.completions.create(
        model=openai_model,
        temperature=0.4,
        max_tokens=400,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "You create safe primary-school math practice questions."},
            {"role": "user", "content": prompt},
        ],
    )

    content = completion.choices[0].message.content or "{}"
    parsed = _parse_json_response(content)
    raw_questions: List[Dict[str, Any]] = parsed.get("questions", [])
    questions = [
        QuizQuestion(id=int(item.get("id", idx + 1)), question=str(item.get("question", "")))
        for idx, item in enumerate(raw_questions)
        if str(item.get("question", "")).strip()
    ]

    if not questions:
        raise HTTPException(status_code=502, detail="Could not generate quiz questions.")

    return QuizGenerateResponse(questions=questions)


@app.post("/api/quiz/evaluate", response_model=QuizEvaluateResponse)
def evaluate_quiz(payload: QuizEvaluateRequest) -> QuizEvaluateResponse:
    ai = _require_client()

    prompt = (
        "You are grading a primary math quiz for grade "
        f"{payload.grade}. Evaluate each submission. "
        "Return strict JSON with shape: "
        "{\"results\":[{\"id\":1,\"question\":\"...\",\"user_answer\":\"...\",\"is_correct\":true,"
        "\"correct_answer\":\"...\",\"feedback\":\"...\"}]}. "
        "Feedback must be short and encouraging."
    )

    submissions = [
        {"id": item.id, "question": item.question, "user_answer": item.user_answer}
        for item in payload.submissions
    ]

    completion = ai.chat.completions.create(
        model=openai_model,
        temperature=0.1,
        max_tokens=600,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": json.dumps({"submissions": submissions})},
        ],
    )

    content = completion.choices[0].message.content or "{}"
    parsed = _parse_json_response(content)
    raw_results: List[Dict[str, Any]] = parsed.get("results", [])

    results = []
    correct_count = 0
    for entry in raw_results:
        item = QuizResultItem(
            id=int(entry.get("id", 0)),
            question=str(entry.get("question", "")),
            user_answer=str(entry.get("user_answer", "")),
            is_correct=bool(entry.get("is_correct", False)),
            correct_answer=str(entry.get("correct_answer", "")),
            feedback=str(entry.get("feedback", "")),
        )
        if item.is_correct:
            correct_count += 1
        results.append(item)

    if not results:
        raise HTTPException(status_code=502, detail="Could not evaluate quiz.")

    return QuizEvaluateResponse(score=correct_count, total=len(results), results=results)
