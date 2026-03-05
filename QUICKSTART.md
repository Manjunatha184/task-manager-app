# Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+

### Step 1: Database (2 minutes)

```bash
# Create database
psql -U postgres -c "CREATE DATABASE task_manager_db;"
```

Or using pgAdmin/MySQL Workbench, create database `task_manager_db`.

### Step 2: Backend (2 minutes)

```bash
cd backend

# Copy and edit .env
cp .env.example .env
# Edit .env: Update DATABASE_URL with your credentials

# Install and run
pip install -r requirements.txt
uvicorn main:app --reload
```

**Backend running at:** http://localhost:8000

### Step 3: Frontend (1 minute)

```bash
# New terminal
cd frontend

# Install and run
npm install
npm run dev
```

**Frontend running at:** http://localhost:5173

### Step 4: Try It Out

1. Go to http://localhost:5173
2. Register: Click "Register here" → Enter email & password
3. Login with your credentials
4. Create, update, and delete tasks!

## Useful URLs

| Service | URL | Notes |
|---------|-----|-------|
| Frontend | http://localhost:5174 | React app |
| Backend | http://localhost:8000 | FastAPI server |
| API Docs | http://localhost:8000/docs | Swagger UI |
| API Redoc | http://localhost:8000/redoc | ReDoc UI |

## Common Issues

**Can't connect to database?**
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1;"

# Verify .env DATABASE_URL is correct
```

**Frontend showing "Failed to fetch"?**
- Check backend is running on http://localhost:8000
- Verify `VITE_API_URL` in frontend/.env

**Port already in use?**
```bash
# Change Vite port (frontend/vite.config.js)
# Change Uvicorn port: uvicorn main:app --reload --port 8001
```

## Database Reset

```bash
psql -U postgres
DROP DATABASE task_manager_db;
CREATE DATABASE task_manager_db;
\q
# Restart backend
```

## Next Steps

- Read [README.md](./README.md) for full documentation
- Check API docs at http://localhost:8000/docs
- Customize styles in `frontend/src` CSS files
- Deploy to production when ready

Happy coding! 🚀
