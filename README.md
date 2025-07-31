# 📝 In-Memory Task Manager API

A lightweight RESTful API built using **Node.js** and **Express.js** to manage tasks in memory.

It supports the basic CRUD operations and filtering via query parameters, including filtering by `completion status`, `title`, `description`, and `priority`.

---

## 📌 Project Overview

This project demonstrates how to:

- Use an in-memory database (no external DB required)
- Build RESTful APIs with validation and filtering
- Handle HTTP methods like GET, POST, PUT, DELETE
- Manage basic task data including title, description, status, priority, and creation date

It is ideal for learning purposes or as a boilerplate for small apps.

---

## 🚀 Setup Instructions

### 1. Clone the Repository

git clone https://github.com/your-username/in-memory-task-api.git
cd in-memory-task-api

---

### 2. Install Dependecies

npm install

### 3. Start the Server

npm start

## 📦 API Endpoints

### 🔹 GET /tasks

Returns: All tasks

Query Filters:
	completed=true/false
	title=<string>
	description=<string>

✅ Example:
GET /tasks?completed=true
GET /tasks?title=Meeting

### 🔹 GET /tasks/:id

Fetch a single task by ID.

✅ Example:
GET /tasks/1

### 🔹 GET /tasks/priority/:level

Fetch tasks by priority.

Valid values: low, medium, high

✅ Example:
GET /tasks/priority/medium

### 🔹 POST /tasks

Create a new task.

📥 Request Body:

{
  "title": "Read a book",
  "description": "Read 'Atomic Habits' for 1 hour",
  "completed": false
}

Validation:
	•	title must be at least 3 characters
	•	description must be at least 5 characters
	•	completed must be boolean

🔁 Automatically adds:
	•	id (auto-increment)
	•	creationDate
	•	priority: "low" (default)

⸻

### 🔹 PUT /tasks/:id

Update task by ID.

📥 Request Body (partial or full):

{
  "completed": true,
  "priority": "high"
}

✅ Example:
PUT /tasks/2

### 🔹 DELETE /tasks/:id

Delete a task by its ID.

✅ Example:
DELETE /tasks/3

🔍 How to Test the API

🧪 Using Postman or cURL

🟢 Create Task (POST)
   curl -X POST http://localhost:3000/tasks \
   -H "Content-Type: application/json" \
   -d '{"title": "Learn Node", "description": "Study Express routing", "completed": false}'

🔵 Get All Tasks (GET)
   curl http://localhost:3000/tasks

🔴 Delete a Task (DELETE)
  curl -X DELETE http://localhost:3000/tasks/1

# 🧑‍💻 Author
    
    Koutilya Namdeo

