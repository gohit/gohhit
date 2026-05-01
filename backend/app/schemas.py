from pydantic import BaseModel, Field
from typing import List


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=500)
    grade: int = Field(ge=1, le=3)
    show_steps: bool = True


class ChatResponse(BaseModel):
    answer: str
    is_math_related: bool


class QuizGenerateRequest(BaseModel):
    grade: int = Field(ge=1, le=3)
    question_count: int = Field(default=5, ge=3, le=10)


class QuizQuestion(BaseModel):
    id: int
    question: str


class QuizGenerateResponse(BaseModel):
    questions: List[QuizQuestion]


class QuizSubmissionItem(BaseModel):
    id: int
    question: str
    user_answer: str = Field(min_length=1, max_length=100)


class QuizEvaluateRequest(BaseModel):
    grade: int = Field(ge=1, le=3)
    submissions: List[QuizSubmissionItem]


class QuizResultItem(BaseModel):
    id: int
    question: str
    user_answer: str
    is_correct: bool
    correct_answer: str
    feedback: str


class QuizEvaluateResponse(BaseModel):
    score: int
    total: int
    results: List[QuizResultItem]
