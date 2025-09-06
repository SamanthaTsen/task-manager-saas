#  Task Manager SaaS

A full-stack task management platform built for scalability, performance, and cloud-native deployment. It features secure authentication, Redis-based caching, CI/CD automation via GitHub Actions, and a responsive frontend UI. Built with **Node.js**, **MongoDB Atlas**, **React**, and **Tailwind CSS**, and deployed on **Render**.

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

### Cache Behavior Testing
A test script is included to monitor Redis cache performance:
- Initializes cache if missing
- Waits for TTL expiration
- Measures response time before and after expiry
- Tracks Redis hit/miss statistics
- Generates a Markdown report to `monitoring/redis_cache_report.md`
- Run the script: `node monitoring/redis_cache_test.js`

### Docker Support
This project includes Docker configuration for simplified local development and deployment.
- Build and Run
`docker build -t task-manager .`
`docker run -p 3000:3000 --env-file .env task-manager`
- Docker Compose
`docker-compose up --build`
- Environment Variables: Create a .env file with the following variables
`MONGO_URI=your_mongodb_connection_string`
`JWT_SECRET=your_jwt_secret`
`REDIS_URL=your_redis_connection_string`

### CI/CD with GitHub Actions
Automated deployment pipeline using GitHub Actions:
- Runs on every push to `main`
- Installs dependencies and builds frontend
- Triggers deployment to **Render** via API
- Uses GitHub Secrets to store `RENDER_API_KEY`
- Workflow file: `.github/workflows/deploy.yml`


### Cloud Deployment

| Layer        | Platform                     |
|--------------|------------------------------|
| Frontend	   | Render Static Site           | 
| Backend API	 | Render Web Service           | 
| Database	   | MongoDB Atlas                | 
| Caching	     | Render Redis                 | 
| CI/CD	       | GitHub Actions               | 


###  Tech Stack

| Layer       | Technology                                       |
|-------------|--------------------------------------------------|
| Frontend    | React, Tailwind CSS, Axios, Chart.js             |
| Backend     | Node.js, Express                                 |
| Database    | MongoDB Atlas + Mongoose                         |
| Auth        | JWT, bcrypt                                      |
| Caching     | Redis                                            |
| Deployment  | Render, Docker, Docker Compose, GitHub Actions   |
| Monitoring  | Redis CLI, Node.js script                        |

