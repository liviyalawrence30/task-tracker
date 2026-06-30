export class TaskManager {
    constructor() {
        this.tasks = [];
        this.load();
    }
    add(data) {
        const newTask = {
            id: Date.now(),
            done: false,
            ...data
        };
        this.tasks.push(newTask);
        this.save();
        return newTask;
    }
    getAll() {
        return [...this.tasks];
    }
    clearAll() {
        this.tasks = [];
        this.save();
    }
    toggle(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.done = !task.done;
            this.save();
        }
    }
    filter(status) {
        if (status === "done") {
            return this.tasks.filter(task => task.done);
        }
        if (status === "pending") {
            return this.tasks.filter(task => !task.done);
        }
        return [...this.tasks];
    }
    sortBy(field) {
        const sortedTasks = [...this.tasks];
        if (field === "priority") {
            const priorityOrder = {
                High: 1,
                Medium: 2,
                Low: 3
            };
            sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        }
        else {
            sortedTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        }
        return sortedTasks;
    }
    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    load() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
    }
}
export function groupBy(items, key) {
    const groups = {};
    items.forEach((item) => {
        const groupKey = String(item[key]);
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
    });
    return groups;
}
