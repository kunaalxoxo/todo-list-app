# To-Do List Web App

A full-stack to-do list application with task management, filtering, and due dates.

## Features
- Add, update, and delete tasks
- Mark tasks as complete
- Filter by all/active/completed
- Set due dates for tasks
- Persistent storage using JSON file

## Tech Stack
- Backend: Node.js + Express
- Frontend: HTML, CSS, JavaScript
- Storage: JSON file

## Setup Instructions

### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   Server will run on http://localhost:3000

### Frontend
1. Open `frontend/index.html` in your browser
   OR use a simple HTTP server:
   ```bash
   cd frontend
   python -m http.server 8000
   ```
   Then visit http://localhost:8000

## API Endpoints
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure
```
todo-app/
   ├── server.js
   ├── package.json
   ├── tasks.json (created automatically)
   ├── index.html
   ├── style.css
   ├── app.js
```

## Future Enhancements
- User authentication
- Task categories/tags
- Priority levels
- Search functionality
- Mobile responsive design improvements
