#  Task Manager SaaS

A full-stack task management platform featuring secure authentication, Redis caching, and a responsive frontend UI. Built with **Node.js**, **MongoDB**, **React**, and **Tailwind CSS**, this project is designed for cloud deployment and scalable performance.

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
- Task fields: `title`, `description`, `status`, `category`
- API endpoints scoped to authenticated users

###  Redis Caching
- Fast in-memory caching using **Redis**
- Configurable TTL (Time-To-Live) for cached items
- Automatic cache invalidation on data updates
- Simple metrics for cache hits/misses

###  Frontend UI 
- Login and Registration pages with form validation
- Task List UI with dynamic rendering
- API integration for authentication and task retrieval
- Responsive design using **Tailwind CSS**
- Built with **React** and **React Router**


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

