import express from 'express';
import { tasks, lists } from './data';
import taskRouter from './router/task-router';
import listRouter from './router/list-router';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/lists', listRouter);

app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});

// GET metoder

// Hent en bestemt liste
app.get('/api/v1/lists/:listId', (request, response) => {
    const listId = request.params.listId;
    const list = lists.find(l => l.id == listId);
    
    if (list) {
        response.json(list);
    } else {
        response.status(404).send(`List with id '${listId}' not found.`);
    }
});

// Hent alle oppgaver for en gitt liste
app.get('/api/v1/lists/:listId/tasks', (request, response) => {
    const listId = request.params.listId;
    const listTasks = tasks.filter(t => t.listsID == listId);
    
    if (listTasks.length > 0) {
        response.json(listTasks);
    } else {
        response.status(404).send(`Tasks for list with id '${listId}' not found.`);
    }
});

//  Hent en bestemt oppgave for en gitt liste
app.get('/api/v1/lists/:listId/tasks/:taskId', (request, response) => {
    const listId = request.params.listId;
    const taskId = request.params.taskId;
    const task = tasks.find(t => t.listsID == listId && t.id == taskId);
    
    if (task) {
        response.json(task);
    } else {
        response.status(404).send(`Task with id '${taskId}' not found.`);
    }
});

// POST metoder

// Lag en ny liste
app.post('/api/v1/lists', (request, response) => {
    const list = request.body;
    
    if (!list.hasOwnProperty('id') || !list.hasOwnProperty('title')) {
        return response.status(400).send('A list needs the following properties: id and title.');
    }
    
    if (lists.find(l => l.id == list.id)) {
        response.status(400).send(`A list with id '${list.id}' already exists.`);
    } else {
        lists.push(list);
        response.status(201);
        response.location('lists/' + list.id);
        response.send();
    }
});

// Lag en ny oppgave for en gitt liste
app.post('/api/v1/lists/:listId/tasks', (request, response) => {
    const listId = request.params.listId;
    const task = request.body;
    
    if (!task.hasOwnProperty('id') || !task.hasOwnProperty('title') || !task.hasOwnProperty('done')) {
        return response.status(400).send('A task needs the following properties: id, title and done.');
    }
    
    if (tasks.find(t => t.id == task.id)) {
        response.status(400).send(`A task with id '${task.id}' already exists.`);
    } else {
        task.listsID = listId;
        tasks.push(task);
        response.status(201);
        response.location('tasks/' + task.id);
        response.send();
    }
});

// DELETE metoder

//  Slett en gitt liste og dens oppgaver
app.delete('/api/v1/lists/:listId/tasks/:taskId', (request, response) => {
    const listId = request.params.listId;
    const taskId = request.params.taskId;
    const index = tasks.findIndex(t => t.listsID == listId && t.id == taskId); 
    if (index != -1) {
        tasks.splice(index, 1);
        response.json(tasks);
    } else {
        response.status(404).send(`Failed to delete task with id '${taskId}'. Task not found.`);
    }
});

//  Slett en gitt oppgave i en bestemt liste
app.delete('/api/v1/lists/:listId', (request, response) => {
    const listId = request.params.listId;
    const listIndex = lists.findIndex(l => l.id == listId);
    if (listIndex != -1) {
        lists.splice(listIndex, 1);
        tasks = tasks.filter(t => t.listsID != listId);
        response.json({ lists, tasks });
    } else {
        response.status(404).send(`Failed to delete list with id '${listId}'. List not found.`);
    }
});