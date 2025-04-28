# TaskSync

**TaskSync** is a full-stack task management application developed as an assignment for **Naum Systems**. The application enables users to efficiently manage their daily tasks with features such as user authentication, task creation, editing, deletion, priority assignment, and completion tracking. TaskSync offers a modern, responsive user interface with dark mode support, secure authentication, and a robust backend API. The project demonstrates best practices in full-stack development, including RESTful API design, JWT-based authentication, password security, and a clean, user-friendly frontend experience.

---

## ✨ Project Overview

TaskSync is designed to help users efficiently organize and track their tasks. Users can:
- Register and log in securely
- Create, edit, and delete tasks
- Set task priorities (Low, Medium, High)
- Mark tasks as complete or incomplete
- Filter tasks by status (All, Active, Completed)
- Enjoy a seamless experience in both light and dark mode

---
---

## ▶️ How to Run the Application Locally

### **Start the Backend**
```bash
cd backend
npm start
# or
node server.js
```
- The backend will run on [http://localhost:5000](http://localhost:5000)

### **Start the Frontend**
Open a new terminal in the project root:
```bash
npm run dev
```
- The frontend will run on [http://localhost:5173](http://localhost:5173)

---

## 📝 Technical Details

- **Password Validation:** Registration enforces strong passwords (min 6 chars, 1 uppercase, 1 special symbol).
- **Authentication:** JWT tokens are used for all protected routes. Tokens are stored in localStorage and sent in the `Authorization` header.
- **API Endpoints:**
  - `POST /api/users/register` — Register a new user
  - `POST /api/users/login` — Log in and receive a JWT
  - `GET /api/tasks` — List tasks (with optional `status` filter)
  - `POST /api/tasks` — Create a new task
  - `PUT /api/tasks/:id` — Update a task
  - `DELETE /api/tasks/:id` — Delete a task

- **Dark Mode:** Fully supported via Tailwind and custom UI components.
- **Error Handling:** All forms provide user-friendly validation and toast notifications for errors and successes.

---

## 🧩 Steps Involved in the Project

1. **User registers or logs in** (with strong password validation)
2. **JWT token is issued** and stored in localStorage
3. **User can create, view, update, and delete tasks**
4. **Tasks are filtered** by status (All, Active, Completed)
5. **All API requests** are authenticated using the JWT token

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 📬 Contact

For questions or support, please open an issue or contact the maintainer.
