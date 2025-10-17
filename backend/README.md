Setup

1. Copy .env.example to .env and adjust values
2. npm install
3. npm run dev

Environment variables

- PORT: Port for the Express server (default 5000)
- MONGO_URI: MongoDB connection string
- JWT_SECRET: Secret key to sign JWTs (use a strong value in production)

API

- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password }
- GET /api/projects (auth)
- POST /api/projects (auth)
- DELETE /api/projects/:id (auth) cascades tasks
- GET /api/projects/:projectId/tasks (auth)
- POST /api/projects/:projectId/tasks (auth)
- PATCH /api/projects/:projectId/:taskId (auth)
- DELETE /api/projects/:projectId/:taskId (auth)


