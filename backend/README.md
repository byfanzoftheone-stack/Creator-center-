# By: FanzoftheOne — Productivity API (Railway)

## Local run
```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL="postgresql://USER:PASS@HOST:PORT/DB"
export JWT_SECRET="change-me"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Open:
- http://localhost:8000/docs
- http://localhost:8000/api/health

## Deploying on Railway

1. Create a new project on Railway and add the PostgreSQL plugin.
2. Link your repository and set the project root to `backend` (Railway will detect `requirements.txt`).
3. Railway will provide a `DATABASE_URL` environment variable — it will be injected automatically.
4. Add the following environment variables in Railway (Project > Variables):
	- `JWT_SECRET` — set a secure secret
	- `CORS_ORIGINS` — comma-separated allowed origins for your frontend (e.g. `https://your-site.vercel.app`)
5. Railway will use the `Procfile` to run the web process. The app listens on `$PORT`.

Local test (optional):
```bash
cp .env.example .env
# set values in .env then
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

