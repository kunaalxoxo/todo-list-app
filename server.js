const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'tasks.json');

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

function readTasks() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeTasks(tasks) {
    fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
}

app.get('/api/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        completed: false,
        dueDate: req.body.dueDate || null,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    writeTasks(tasks);
    res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);
    const filteredTasks = tasks.filter(t => t.id !== taskId);

    if (filteredTasks.length === tasks.length) {
        return res.status(404).json({ error: 'Task not found' });
    }

    writeTasks(filteredTasks);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
