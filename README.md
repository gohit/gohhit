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

## Deploy (production)

### 1) Backend on Render

1. Push this repo to GitHub (already done if you use Render Git integration).
2. [Render](https://render.com) → **New** → **Blueprint** → pick repo → select `render.yaml`, or **Web Service** manually:
   - **Root Directory**: `backend`
   - **Build**: `pip install -r requirements.txt`
   - **Start**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. **Environment** (service → Environment):
   - `OPENAI_API_KEY` → your key (secret)
   - `OPENAI_MODEL` → `gpt-4o-mini` (optional)
   - `CORS_ORIGINS` → `https://gohhit.com,https://www.gohhit.com` (match your real frontend URLs; add preview URLs if needed)
4. Note the public URL, e.g. `https://gohhit-mathbuddy-api.onrender.com`.

Optional custom domain: Render service → **Custom Domains** → `api.gohhit.com` → add DNS CNAME as Render shows.

### 2) Frontend API URL

Before building for production, set the API base in `frontend/src/environments/environment.prod.ts`:

- `apiUrl`: `https://api.gohhit.com/api` **or** `https://<your-render-service>.onrender.com/api` until DNS is ready.

Then commit (or rebuild) so production bundles call the right backend.

### 3) Frontend on Vercel

1. [Vercel](https://vercel.com) → **Add New Project** → import repo.
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build:prod`
4. **Output Directory**: `dist/gohhit-frontend/browser`
5. **Install Command**: `npm install`
6. `frontend/vercel.json` already SPA-rewrites client routes.

Custom domain: Project → **Domains** → `gohhit.com` / `www.gohhit.com` → follow DNS instructions from Vercel.

### 4) Frontend on Netlify (alternative)

Repo root has `netlify.toml` (build from `frontend`). Connect repo in Netlify; it uses that file automatically.

### DNS summary

- `gohhit.com` → frontend host (Vercel/Netlify)
- `api.gohhit.com` → backend host (Render CNAME)

## Interview talking points

- Cost control: `gpt-4o-mini`, low token limits, bounded input size
- Guardrails: primary maths only, polite non-math rejection
- Product architecture: personal site + project modules for long-term reuse
