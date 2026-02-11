const API_URL = 'http://localhost:3000/api/tasks';
let currentFilter = 'all';

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const title = taskInput.value.trim();

    if (!title) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                dueDate: dueDateInput.value || null
            })
        });

        if (response.ok) {
            taskInput.value = '';
            dueDateInput.value = '';
            fetchTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function toggleTask(id, completed) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !completed })
        });
        fetchTasks();
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

function filterTasks(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-section button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`filter-${filter}`).classList.add('active');
    fetchTasks();
}

function renderTasks(tasks) {
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        const dateStr = task.dueDate ? `Due: ${task.dueDate}` : '';

        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" 
                   ${task.completed ? 'checked' : ''}
                   onchange="toggleTask(${task.id}, ${task.completed})">
            <div class="task-content">
                <div class="task-text">${task.title}</div>
                ${dateStr ? `<div class="task-date">${dateStr}</div>` : ''}
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;

        taskList.appendChild(li);
    });
}

document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

fetchTasks();
