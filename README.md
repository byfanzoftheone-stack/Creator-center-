# By: FanzoftheOne — Productivity Core (Frontend + Backend)

## Structure
- `frontend/` — Next.js UI (deploy to **Vercel**)
- `backend/` — FastAPI API (deploy to **Railway**, with **Railway Postgres**)

---

## Railway (Backend)
1. Create a Railway project
2. Add **Postgres** to the project
3. Set backend **Root Directory**: `backend`
4. Railway will automatically detect the configuration from `railway.json` in the backend directory
5. Alternatively, you can manually set the **Start Command**:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
   ```
6. Add Railway Variables:
   - `DATABASE_URL` (Railway Postgres provides this)
   - `JWT_SECRET` (make a long random string)
   - `CORS_ORIGINS` (comma-separated). Example:
     ```
     http://localhost:3000,https://YOUR-VERCEL-DOMAIN
     ```

**Note**: The project includes `railway.toml` (root) and `railway.json` (backend) configuration files that Railway will use automatically.

Verify:
- `https://<railway-domain>/api/health`
- `https://<railway-domain>/docs`

---

## Vercel (Frontend)
1. Import repo
2. Vercel will automatically detect the configuration from `vercel.json`
3. Optionally set **Root Directory**: `frontend` (already configured in vercel.json)
4. Set Environment Variables:
   - `NEXT_PUBLIC_API_URL` = `https://<railway-domain>`  (NO `/api` suffix)

**Note**: The project includes `vercel.json` configuration that specifies build commands and output directory.

Run:
- Visit `/login`
- Register
- Create tasks

---

## Local Dev
Backend:
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL="postgresql://USER:PASS@HOST:PORT/DB"
export JWT_SECRET="dev-secret"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Frontend:
```bash
cd frontend
pnpm i
NEXT_PUBLIC_API_URL="http://localhost:8000" pnpm dev
```
# Creator-center-
