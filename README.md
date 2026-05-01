# gohhit.com + MathBuddy

This repository contains:

- `frontend/`: Angular site for `gohhit.com` (personal landing + project navigation)
- `backend/`: FastAPI server for MathBuddy AI tutor and quiz APIs

MathBuddy is intentionally a project inside your long-term personal domain flow.

## What this app does

- Root site acts as your portfolio-friendly homepage
- `MathBuddy` is a project section linked from home
- Supports primary maths (grade 1-3) chat tutoring
- Generates and evaluates 5-question quizzes

## Local setup

## 1) Backend (FastAPI)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Update `backend/.env`:

- `OPENAI_API_KEY`
- optional `OPENAI_MODEL` (default is `gpt-4o-mini`)

Run backend:

```bash
uvicorn app.main:app --reload --port 8000
```

## 2) Frontend (Angular)

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:4200`.

## Deployment suggestion (free tiers)

- Frontend: Vercel or Netlify (free)
- Backend: Render or Railway (free/low-cost starter tiers)
- Domain:
  - `gohhit.com` -> frontend
  - `api.gohhit.com` -> backend

## Interview talking points

- Cost control: `gpt-4o-mini`, low token limits, bounded input size
- Guardrails: primary maths only, polite non-math rejection
- Product architecture: personal site + project modules for long-term reuse
