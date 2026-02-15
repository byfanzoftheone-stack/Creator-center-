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
