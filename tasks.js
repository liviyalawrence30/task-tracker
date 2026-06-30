"use strict";
let tasks = [];
function addTask(name, priority, dueDate) {
    const newTask = {
        id: Date.now(),
        name,
        priority,
        dueDate,
        done: false
    };
    tasks.push(newTask);
    return newTask;
}
function toggleDone(id) {
    const task = tasks.find(function (task) {
        return task.id === id;
    });
    if (task) {
        task.done = !task.done;
    }
}
