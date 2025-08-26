#  Task Manager SaaS

A full-stack task management platform built for scalability and performance. It features secure authentication, Redis-based caching for popular tasks, and a responsive frontend UI. Includes automated cache performance monitoring and TTL-based refresh logic. Built with **Node.js**, **MongoDB**, **React**, and **Tailwind CSS**, and optimized for cloud deployment.

---

##  Features

###  Authentication & User Management
- User registration and login
- Secure password hashing with **bcrypt**
- JWT-based authentication
- Protected routes for task operations

###  Task Management (CRUD)
- Create, read, update, and delete tasks
- Each task is linked to a specific user
- Task fields: `title`, `status`, `category`, `date`
- API endpoints scoped to authenticated users

### Redis Caching & Monitoring
- High-speed in-memory caching using **Redis**
- Caching applied to `/tasks/popular` endpoint
- TTL-based cache control (default: 300 seconds)
- Automatic cache invalidation on task create/update/delete
- Integrated cache behavior test script using **Node.js + Redis**
- Metrics collected: TTL, hit rate, response time
- Cache refresh logic triggered on TTL expires

###  Frontend UI & Task Analytics
- Login and Registration pages with form validation
- Dynamic task list rendering with real-time updates
- API integration for authentication and task retrieval
- Responsive design using **Tailwind CSS**
- Built with **React** and **React Router**
- Visualizes task completion rate and daily task count using **Chart.js**

## Cache Behavior Testing
A test script is included to monitor Redis cache performance:
- Initializes cache if missing
- Waits for TTL expiration
- Measures response time before and after expiry
- Tracks Redis hit/miss statistics
- Outputs a Markdown report to `monitoring/redis_cache_report.md`

Run the script:
```bash
node monitoring/redis_cache_test.js

---

##  Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React, Tailwind CSS, Axios, Chart.js |
| Backend   | Node.js, Express                    |
| Database  | MongoDB + Mongoose                  |
| Auth      | JWT, bcrypt                         |
| Caching   | Redis                               |
| Deployment| Docker / Railway / Vercel           |
| Monitoring| Redis CLI, Node.js script            |

