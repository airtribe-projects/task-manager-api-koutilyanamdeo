const express = require('express');
const app = express();
const port = 3000;
const inMemoryDB = {users:[]};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/tasks', (req, res) => {
    const {completed,title,description} = req.query;
        console.log(completed);

    if (completed !== undefined) {
        const isCompletedFilter = completed.toLowerCase() === 'true';
        const filteredTasks = inMemoryDB.users.filter(task => task.completed === isCompletedFilter);
        return res.status(200).send(filteredTasks); 
    }else if (title || description) {
        const filteredTasks = inMemoryDB.users.filter(task => {
            return (title && task.title.includes(title)) || (description && task.description.includes(description));
        });
        return res.status(200).send(filteredTasks);
    }
    if (inMemoryDB.users.length === 0) {
        return res.status(204).send('No Content'); // No content to send back
    }
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

app.get('/tasks/priority/:level', (req, res) => {
    const priorityLevel = req.params.level.toLowerCase();
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priorityLevel)) {
        return res.status(400).send('Invalid priority level. Valid levels are: low, medium, high');
    }
    const filteredTasks = inMemoryDB.users.filter(task => task.priority === priorityLevel);
    if (filteredTasks.length === 0) {
        return res.status(404).send(`No tasks found with priority ${priorityLevel}`);
    }
    res.status(200).send(filteredTasks);
});

app.post('/tasks', (req, res) => {
    
    if (!req.body ) {
        return res.status(404).send('Task title,description,completed fields are required');
    }else if(!req.body.title || !req.body.description ) {
        return res.status(400).send('Task title,description fields are required');
    } else if (typeof req.body.completed !== 'boolean') {
        return res.status(400).send('Task completed field must be a boolean');
    }
    if (req.body.title.length < 3 || req.body.description.length < 5) {
        return res.status(400).send('Task title must be at least 3 characters and description at least 5 characters long');
    }
    const newTask = req.body;
    newTask.id = inMemoryDB.users.length + 1; // Assign a new ID
    newTask.creationDate = new Date().toISOString();
    newTask.priority = !newTask.priority ?  'low' : newTask.priority.toLowerCase(); // Default priority
    inMemoryDB.users.push(newTask);
    inMemoryDB.users.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate)); // Sort by creation date
    res.status(200).send(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    if(!req.body){
        return res.status(400).send('fields are required for updation');
    }
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
    res.status(200).send("Task Successfully Deleted"); // No content to send back
});
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;