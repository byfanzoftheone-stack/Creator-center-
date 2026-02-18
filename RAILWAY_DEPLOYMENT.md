# Railway Deployment Guide

This guide walks you through deploying the Creator Center backend to Railway.

## Prerequisites
- Railway account (https://railway.app)
- This repository

## Deployment Steps

### 1. Create Railway Project
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose this repository: `byfanzoftheone-stack/Creator-center-`

### 2. Add PostgreSQL Database
1. In your Railway project, click "New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically provide a `DATABASE_URL` environment variable

### 3. Configure Backend Service
Railway should auto-detect the backend configuration from `railway.toml` and `nixpacks.toml`.

**If manual configuration is needed:**
- **Root Directory**: Leave empty (configs handle the path)
- **Build Command**: Auto-detected from nixpacks.toml
- **Start Command**: Auto-detected from railway.toml

### 4. Set Environment Variables
In your Railway backend service settings, add these environment variables:

**Required:**
- `DATABASE_URL` - Auto-populated by Railway when you add PostgreSQL
- `JWT_SECRET` - Generate a secure random string (e.g., use `openssl rand -hex 32`)
- `CORS_ORIGINS` - Comma-separated list of allowed frontend URLs

**Example CORS_ORIGINS:**
```
https://your-app.vercel.app,http://localhost:3000
```

**Optional (have defaults):**
- `JWT_ALGORITHM` - Default: `HS256`
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Default: `10080` (7 days)

### 5. Generate JWT Secret
Run this command to generate a secure JWT secret:
```bash
openssl rand -hex 32
```

Copy the output and paste it as the `JWT_SECRET` environment variable in Railway.

### 6. Deploy
Railway will automatically deploy when you push to your repository.

**Manual deployment:**
- Click "Deploy" in the Railway dashboard
- Wait for the build to complete

### 7. Verify Deployment
Once deployed, test these endpoints (replace `<your-railway-domain>` with your actual Railway URL):

1. **Health Check:**
   ```
   https://<your-railway-domain>/health
   ```
   Should return: `{"ok": true}`

2. **API Documentation:**
   ```
   https://<your-railway-domain>/docs
   ```
   Should show the FastAPI interactive documentation

3. **API Base:**
   ```
   https://<your-railway-domain>/api/health
   ```
   Should return health status

## Connecting Frontend
After deploying the backend, you'll need to update your Vercel frontend deployment:

1. Copy your Railway backend URL (e.g., `https://your-app.up.railway.app`)
2. In Vercel project settings, set the environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
   ```
   ⚠️ **Do NOT include `/api` at the end**

3. Redeploy your frontend on Vercel

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly in Railway
- Check Railway logs for connection errors
- Ensure PostgreSQL service is running

### CORS Errors
- Verify `CORS_ORIGINS` includes your frontend URL
- Check that there are no trailing slashes
- Ensure the URL protocol matches (http vs https)

### Build Failures
- Check Railway build logs
- Verify `requirements.txt` is up to date
- Ensure Python version matches `runtime.txt` (Python 3.11)

### Application Won't Start
- Check Railway deployment logs
- Verify all required environment variables are set
- Ensure `DATABASE_URL` is accessible

## Environment Variables Summary

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | Auto-provided by Railway |
| `JWT_SECRET` | Yes | Secret key for JWT tokens | `abc123...` (use `openssl rand -hex 32`) |
| `CORS_ORIGINS` | Yes | Allowed frontend origins | `https://myapp.vercel.app,http://localhost:3000` |
| `JWT_ALGORITHM` | No | JWT signing algorithm | `HS256` (default) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | Token expiration time | `10080` (7 days, default) |

## Next Steps
After successful deployment:
1. Test all API endpoints
2. Register a test user
3. Verify database operations work
4. Connect and test with frontend
