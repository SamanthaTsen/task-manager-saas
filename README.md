# Task Manager SaaS

A full-stack task management platform with Redis caching, JWT authentication, and cloud deployment.

---

##  Features

### Authentication & User Management
- User registration and login
- Secure password hashing with bcrypt
- JWT-based authentication
- Protected routes for task operations

### Task Management (CRUD)
- Create, read, update, and delete tasks
- Each task is linked to a specific user
- Task fields: title, description, status, category
- API endpoints scoped to authenticated users

### Redis Caching
- Fast in-memory caching using Redis
- Configurable TTL (Time-To-Live) for cached items
- Automatic cache invalidation on data updates
- Simple metrics for cache hits/misses

### Deployment Ready
- Environment variable support via `.env`
- `.env.example` included for setup
- Cloud-ready architecture (e.g., Docker, Railway, Vercel, etc.)

---

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT, bcrypt
- **Caching**: Redis
- **Deployment**: Docker / Railway / Vercel (configurable)

---

## 📂 Project Structure

