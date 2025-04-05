
## 💡 Task management Dashboard

This is a **Dashboard Application** that supports:

- **User Authentication** (signup/login)
- **Two Roles:** `User` and `Admin`
- **Admin Panel:**
  - Manage Users (view, promote, deactivate)
  - View Stats
- **User Panel:**
  - View and edit their profile
  - Create/update/delete records (we’ll define what type)
- **Secure API** with role-based access
- **Responsive, clean UI** with Vue 3, Tailwind, and Headless UI

---

### ✍️ App Concept (Concrete)

**Entities:**
- Users
- Tasks (created by users)
- Admin can view all tasks, users, and stats

---

## 📦 Features List (Split by Role)

### 👤 User:
- Register/Login
- View & edit profile
- Create/Edit/Delete tasks
- View list of own tasks

### 🛡️ Admin:
- Login as admin
- View all users
- Promote or deactivate users
- View all tasks in the system
- View simple stats (e.g., total users, tasks created)


## 📡 API Design


### 🔐 Auth
| Method | Endpoint         | Description       |
|--------|------------------|-------------------|
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login and get token |

### 👤 Users (Admin Only)
| Method | Endpoint        | Description         |
|--------|-----------------|---------------------|
| GET    | `/api/users`    | List all users      |
| PUT    | `/api/users/:id/role` | Promote user       |
| PUT    | `/api/users/:id/status` | Activate/Deactivate user |

### 📝 Tasks (User)
| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/api/tasks`     | Get current user's tasks |
| POST   | `/api/tasks`     | Create new task          |
| PUT    | `/api/tasks/:id` | Update task              |
| DELETE | `/api/tasks/:id` | Delete task              |

### 📊 Stats (Admin)
| Method | Endpoint      | Description               |
|--------|---------------|---------------------------|
| GET    | `/api/stats`  | Get user/task counts      |

---

## 🗂️ Step 4: Project Structure (Monorepo)

```
/fullstack-dashboard/
│
├── /frontend/      → Vue 3 + Vite + Tailwind + Pinia
│   └── ...
│
├── /backend/       → Node.js + Express + MySQL
│   ├── /controllers
│   ├── /routes
│   ├── /middlewares
│   ├── /models
│   ├── /utils
│   └── index.js
│
├── .env
└── README.md
```

---