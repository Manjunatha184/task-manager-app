# Task Manager Application

A full-stack web application for managing tasks with user authentication, built with React, FastAPI, and PostgreSQL.

## Features

- **User Authentication**: Register and login with email and password
- **Task Management**: Create, read, update, and delete tasks
- **Task Status Tracking**: Mark tasks as Todo, In Progress, or Completed
- **Task Filtering**: Filter tasks by status
- **Responsive Design**: Works on desktop and mobile devices
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: Bcrypt password hashing

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT (python-jose)
- **Password Hashing**: bcrypt with passlib
- **Server**: Uvicorn

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Router**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

## Project Structure

```
task-manager/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── config.py            # Configuration and settings
│   │   ├── database.py          # Database connection and session
│   │   ├── models.py            # SQLAlchemy models (User, Task)
│   │   ├── schemas.py           # Pydantic schemas for validation
│   │   ├── auth.py              # Authentication logic and JWT
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── auth_routes.py   # Auth endpoints (register, login)
│   │       └── task_routes.py   # Task CRUD endpoints
│   ├── .env.example             # Example environment variables
│   └── requirements.txt         # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx             # Application entry point
│   │   ├── App.jsx              # Main app component with routing
│   │   ├── App.css              # Global styles
│   │   ├── pages/
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Register.jsx     # Registration page
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   ├── Auth.css         # Auth pages styling
│   │   │   └── Dashboard.css    # Dashboard styling
│   │   ├── components/
│   │   │   ├── TaskForm.jsx     # Task creation form
│   │   │   ├── TaskItem.jsx     # Individual task component
│   │   │   ├── TaskList.jsx     # Task list container
│   │   │   └── TaskItem.css     # Component styling
│   │   └── services/
│   │       └── api.js           # API client with axios
│   ├── index.html               # HTML entry point
│   ├── vite.config.js           # Vite configuration
│   ├── package.json             # Node dependencies
│   ├── .env.example             # Example environment variables
│   └── .gitignore               # Git ignore rules
│
└── database.sql                 # SQL schema for manual setup
```

## Prerequisites

- **Python 3.8+** - For backend
- **Node.js 16+** - For frontend
- **PostgreSQL 12+** - Database
- **Git** - Version control

## Setup Instructions

### 1. Database Setup

#### Option A: Using PostgreSQL CLI

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE task_manager_db;

# Create user (optional, recommended)
CREATE USER task_user WITH PASSWORD 'your_password';
ALTER ROLE task_user SET client_encoding TO 'utf8';
ALTER ROLE task_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE task_user SET default_transaction_deferrable TO on;
ALTER ROLE task_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE task_manager_db TO task_user;

# Exit PostgreSQL
\q
```

#### Option B: Using pgAdmin
1. Open pgAdmin
2. Create new database named `task_manager_db`
3. Note the connection details

#### Option C: Run SQL Schema
```bash
# If database exists, you can run the SQL schema directly:
psql -U postgres -d task_manager_db -f database.sql
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create .env file from example
cp .env.example .env

# Edit .env with your database credentials
# Example:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/task_manager_db
# JWT_SECRET=your-secret-key-change-this-in-production
# JWT_ALGORITHM=HS256
# JWT_EXPIRATION_HOURS=24
# ALLOWED_ORIGINS=["http://localhost:5173","http://localhost:3000"]

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations (creates tables if needed)
python -c "from app.database import init_db; init_db()"

# Start the server
cd app
uvicorn main:app --reload

# The API will be available at http://localhost:8000
# Swagger docs available at http://localhost:8000/docs
```

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Create .env file from example
cp .env.example .env

# Edit .env with backend URL (should be correct by default)
# Example:
# VITE_API_URL=http://localhost:8000

# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Tasks
- `GET /tasks` - Get all tasks for current user
- `GET /tasks/{id}` - Get specific task
- `POST /tasks` - Create new task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

## Request/Response Examples

### Register
```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00"
  }
}
```

### Create Task
```bash
POST /tasks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "todo"
}

Response:
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "todo",
  "user_id": 1,
  "created_at": "2024-01-01T00:00:00"
}
```

## Configuration

### Backend Configuration (.env)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT signing (change in production!)
- `JWT_ALGORITHM` - JWT algorithm (default: HS256)
- `JWT_EXPIRATION_HOURS` - Token expiration time
- `ALLOWED_ORIGINS` - CORS allowed origins

### Frontend Configuration (.env)
- `VITE_API_URL` - Backend API URL

## Development

### Backend Development
- API documentation available at `http://localhost:8000/docs`
- Use `uvicorn main:app --reload` for hot reload
- Database changes are auto-applied on app start

### Frontend Development
- Use `npm run dev` for development server with hot reload
- Use `npm run build` to create production build
- Use `npm run preview` to preview production build

## Database Troubleshooting

### Reset Database
```bash
# WARNING: This will delete all data

# Drop and recreate database
psql -U postgres -c "DROP DATABASE task_manager_db;"
psql -U postgres -c "CREATE DATABASE task_manager_db;"

# Restart backend to recreate tables
```

### Check Database Connection
```bash
# Test connection
psql -U postgres -d task_manager_db -c "SELECT 1;"

# List tables
psql -U postgres -d task_manager_db -c "\dt"
```

## Production Checklist

Before deploying to production:

1. **Security**
   - Change `JWT_SECRET` to a strong random value
   - Update `ALLOWED_ORIGINS` with your domain
   - Enable HTTPS
   - Set secure database password

2. **Database**
   - Set `echo=False` in SQLAlchemy config
   - Use connection pooling in production
   - Regular backups

3. **Frontend**
   - Run `npm run build` for optimized build
   - Deploy dist folder to static hosting or CDN

4. **Backend**
   - Set `uvicorn` to run with `--workers` for production
   - Use a production WSGI server (Gunicorn, etc.)
   - Add logging and monitoring
   - Set appropriate environment variables

## Troubleshooting

### "connection refused" error
- Ensure PostgreSQL is running
- Check DATABASE_URL is correct
- Verify database exists

### "module not found" errors
- Ensure `pip install -r requirements.txt` was run
- Check virtual environment is activated
- For frontend: ensure `npm install` was run

### "CORS error" on frontend
- Verify `VITE_API_URL` is correct
- Check backend `ALLOWED_ORIGINS` includes frontend URL
- Ensure backend is running

### Tasks not loading
- Check browser console for errors
- Verify auth token is saved in localStorage
- Check backend logs for database errors

## Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [JWT.io](https://jwt.io/)

## License

MIT License

## Support

For issues or questions, check the documentation or create an issue in the repository.
