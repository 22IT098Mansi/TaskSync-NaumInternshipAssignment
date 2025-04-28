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
## 🏗️ Technical Choices & Architecture

### Technical Choices

- **React + TypeScript (Frontend):**  
  Chosen for its component-based architecture, strong typing, and large ecosystem. TypeScript ensures type safety and reduces runtime errors, while React enables fast, interactive UIs.

- **Vite:**  
  Used as the frontend build tool for its speed, modern features, and excellent developer experience.

- **Tailwind CSS:**  
  Enables rapid UI development with utility-first classes, making it easy to implement responsive layouts and dark mode support.

- **Radix UI & Custom Components:**  
  For accessible, consistent, and customizable UI primitives, ensuring a professional and user-friendly interface.

- **Sonner:**  
  Provides toast notifications for user feedback on actions and errors.

- **Node.js + Express (Backend):**  
  A lightweight, fast, and flexible framework for building RESTful APIs. Express is widely used and well-supported.

- **Mongoose + MongoDB Atlas:**  
  Mongoose provides schema validation and a simple API for interacting with MongoDB. MongoDB Atlas offers a secure, scalable, and cloud-hosted database solution.

- **JWT (JSON Web Tokens):**  
  Used for stateless, secure authentication. JWTs are stored in localStorage and sent with each API request for protected routes.

- **bcryptjs:**  
  For secure password hashing, ensuring user credentials are safely stored.

---

### Architecture Overview

- **Frontend:**  
  - Built with React and TypeScript, styled with Tailwind CSS.
  - Handles routing, authentication state, and API communication.
  - Stores JWT tokens in localStorage and attaches them to API requests.
  - Provides a responsive, dark-mode-friendly UI.

- **Backend:**  
  - Exposes RESTful endpoints for user authentication and task management.
  - Validates and hashes passwords before storing them.
  - Issues JWT tokens on successful login/registration.
  - Protects all task-related endpoints with JWT authentication middleware.
  - Filters and sorts tasks by user, status, and priority.

- **Database:**  
  - MongoDB Atlas hosts the database in the cloud.
  - Mongoose schemas define the structure for users and tasks.
  - Each task is linked to a user via a reference.

- **Authentication Flow:**  
  - On registration or login, the backend issues a JWT.
  - The frontend stores the JWT and includes it in the `Authorization` header for all protected API requests.
  - The backend verifies the JWT for each request to protected endpoints.

---

**This architecture ensures:**  
- Security (with JWT and password hashing)
- Scalability (cloud database, stateless backend)
- Maintainability (clear separation of concerns)
- Great user experience (responsive, accessible, and visually appealing UI)

---

## 🗄️ Database Schema

### **User**
| Field      | Type      | Description                |
|------------|-----------|----------------------------|
| _id        | ObjectId  | MongoDB unique identifier  |
| email      | String    | User's email (unique)      |
| password   | String    | Hashed password            |
| createdAt  | Date      | Registration date          |

### **Task**
| Field      | Type      | Description                        |
|------------|-----------|------------------------------------|
| _id        | ObjectId  | MongoDB unique identifier          |
| userId     | ObjectId  | Reference to User                  |
| title      | String    | Task title                         |
| description| String    | Task description                   |
| status     | String    | 'complete' or 'incomplete'         |
| priority   | String    | 'Low', 'Medium', or 'High'         |
| createdAt  | Date      | Task creation date                 |

---
## 🛠️ Setup Instructions

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/task-sync-app.git
cd task-sync-app
```

---

### 2. **Backend Setup**

```bash
cd backend
npm install
```

#### **Configure Environment Variables**
Create a `.env` file in the `backend/` directory:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

- Get your MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Use a strong, random string for `JWT_SECRET`.

---

### 3. **Frontend Setup**

```bash
cd ..
npm install
```

#### **Configure API URL (if needed)**
If your backend runs on a different port or host, create a `.env` file in the project root:
VITE_API_URL=http://localhost:5000


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
- **Task Sorting:** Tasks
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
