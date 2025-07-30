const express = require('express');
const app = express();
const port = 3000;
const inMemoryDB = {users:[]};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/tasks', (req, res) => {
    res.status(200).send(inMemoryDB.users);
});
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = inMemoryDB.users.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).send('Task id not found');
    }
    res.status(200).send(task);
});

app.post('/tasks', (req, res) => {
    if (!req.body && !req.body.title && !req.body.description && !req.body.completed) {
        return res.status(400).send('Task title,description,completed fields are required');
    }
    const newTask = req.body;
    newTask.id = inMemoryDB.users.length + 1; // Assign a new ID
    inMemoryDB.users.push(newTask);
    res.status(200).send(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = inMemoryDB.users.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).send('Task id not found');
    }
    const updatedTask = req.body;
    inMemoryDB.users[taskIndex] = { ...inMemoryDB.users[taskIndex], ...updatedTask };
    inMemoryDB.users[taskIndex].id = taskId; // Maintain the same ID
    res.send(inMemoryDB.users[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = inMemoryDB.users.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).send('Task id not found');
    }
    inMemoryDB.users.splice(taskIndex, 1);
    res.status(200).send("successfully deleted"); // No content to send back
});
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;