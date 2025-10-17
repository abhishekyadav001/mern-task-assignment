Frontend README

Overview

This is the React frontend for the Project & Task Board Management System (MERN). It provides:
- Auth (login/register) with JWT stored in localStorage
- Project listing with owner info, pagination, create and owner-only delete
- Per-project Task Board with CRUD for the owner and read-only for others
- Responsive UI for mobile and desktop

Tech Stack

- React + TypeScript
- React Router
- @tanstack/react-query for server state
- MUI (Material UI) components
- Axios for HTTP

Getting Started

1) Install

```
npm install
```

2) Configure environment

Create a `.env` file (or `.env.local`) in `frontend/` with:

```
VITE_API_URL=http://localhost:5000/api
```

If omitted, it defaults to `http://localhost:5000/api`.

3) Run

```
npm run dev
```

The app will start on a Vite dev server (usually `http://localhost:5173`).

Auth Workflow

- Register (Name, Email, Password) or Login (Email, Password)
- Backend returns `{ token, user }`. The frontend stores:
  - `token` in localStorage and attaches it as `Authorization: Bearer <token>` on all requests
  - `user` (id, name, email) in localStorage via `AuthContext`
- Protected routes (`/` projects, `/projects/:projectId` task board) require a token

Projects

- List all projects (from all users) with pagination
  - Endpoint: `GET /api/projects?page={page}&limit={limit}`
  - Response: `{ items, total, page, limit, pages }`
- Each project shows: title, description, owner name (chip)
- Create project (title, description) — available to any authenticated user
- Delete project — only visible/enabled for the project owner

Task Board

- Navigate from projects list to `/projects/:projectId`
- Fetch project details: `GET /api/projects/:id` (for owner info)
- Fetch tasks: `GET /api/projects/:projectId/tasks`
- Ownership rules:
  - Owner can create, update status, and delete tasks
  - Non-owners see tasks read-only (no create, status disabled, no delete)
- Create task form fields: title, status (todo/in-progress/done), assignedTo (email), dueDate
  - Assigned user lookup: `GET /api/auth/users/search?q=<email_fragment>` (requires auth)

Responsive UI Details

- Task cards adapt to mobile:
  - Status dropdown becomes full-width on small screens
  - Assignee/due-date chips wrap instead of overflowing
  - Delete uses an icon button so it remains inside the card on mobile
- Project list uses MUI `Pagination` and clear loading/empty states

Key Files

- `src/context/AuthContext.tsx`: Stores `token` and `user` and persists them
- `src/api/client.ts`: Axios client with `VITE_API_URL` and auth header
- `src/pages/ProjectsPage.tsx`: Project list, create, delete (owner-only), pagination
- `src/pages/TaskBoardPage.tsx`: Project details, tasks board, owner gating, responsive cards
- `src/App.tsx`: Routes and private route guard

Common Scripts

```
npm run dev       # start development server
npm run build     # production build
npm run preview   # preview production build
```

Notes & Tips

- Ensure your backend is running and reachable at `VITE_API_URL`
- If you change the backend port or path, update `VITE_API_URL`
- After login/register, the UI will immediately reflect the authenticated state
- If permissions/UI look wrong, double-check that both `token` and `user` are present in localStorage


