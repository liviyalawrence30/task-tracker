import {TaskManager,groupBy} from "./tasks.js";
const taskForm=document.querySelector("#task-form");
const nameInput=document.querySelector("#task-name");
const priorityInput= document.querySelector("#priority");
const duedateInput=document.querySelector("#due-date");
const taskList=document.querySelector("#task-list");
const clearAllButton=document.querySelector("#clear-all");
const allButton=document.querySelector("#all");
const pendingButton=document.querySelector("#pending");
const doneButton=document.querySelector("#done");
const sortBy=document.querySelector("#sort-by");
const taskCounter=document.querySelector("#task-counter");
const taskTableBody=document.querySelector("#task-table-body");
const priorityTableBody = document.querySelector("#priority-table-body");
const manager=new TaskManager();
let current_filter="All";
let current_sort="";


taskForm.addEventListener("submit",function(event){
    event.preventDefault();
    const taskName=nameInput.value;
    const priority=priorityInput.value;
    const dueDate=duedateInput.value;
    
    manager.add({
        name:taskName,
        priority: priority,
        dueDate: dueDate
    });
    renderTasks();

    taskForm.reset();
    

});

clearAllButton.addEventListener("click",function(){
    manager.clearAll();
    renderTasks();
});

allButton.addEventListener("click",function(){
    current_filter="All";
    renderTasks();
});
pendingButton.addEventListener("click",function(){
    current_filter="Pending";
    renderTasks();
});
doneButton.addEventListener("click",function(){
    current_filter="Done";
    renderTasks();
});
sortBy.addEventListener("change",function(){
    current_sort=sortBy.value;
    renderTasks();
})

function renderTasks(){
    taskList.innerHTML="";
    taskTableBody.innerHTML="";
    priorityTableBody.innerHTML = "";
    let filteredTasks=manager.getAll();
    if(current_filter ==="Pending"){
        filteredTasks=manager.filter("pending");
    }
    if(current_filter === "Done"){
        filteredTasks=manager.filter("done");
    }
    if(current_sort === "priority"){
        filteredTasks=manager.sortBy("priority");
    }
    if(current_sort=== "dueDate"){
        filteredTasks=manager.sortBy("dueDate");
    }
    taskCounter.textContent=`Showing ${filteredTasks.length} of ${manager.getAll().length} tasks`;

    filteredTasks.map(function(task){
        const listItem=document.createElement("li");
        listItem.innerHTML=` Task :${task.name}<br>
        Priority: ${task.priority}<br>
        Due Date: ${task.dueDate}`;
        if(task.done){
            listItem.classList.add("done");
        }
        const today=new Date().toISOString().split("T")[0];
        if(task.dueDate<=today && !task.done){
            listItem.classList.add("overdue");
        }
        const doneButton=document.createElement("button");
        doneButton.textContent="Done";
        doneButton.addEventListener("click",function(){
             manager.toggle(task.id);
             renderTasks();
        });
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(doneButton);
        taskList.appendChild(listItem);

        
    });
     manager.getAll().forEach(function(task){
        const row=document.createElement("tr");
        row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.priority}</td>
        <td>${task.dueDate}</td>
        <td>${task.done ? "Done" : "Pending"}</td>
    `;
    taskTableBody.appendChild(row);
     });
        const grouped=groupBy(manager.getAll(),"priority");
        Object.keys(grouped).forEach(function(priority){
            const tasks=grouped[priority].map(function(task){
                return task.name;
            }).join(", ");
            const row=document.createElement("tr");
            row.innerHTML=`
            <td>${priority}</td>
            <td>${grouped[priority].length}</td>
            <td>${tasks}</td>
        
        `;
        priorityTableBody.appendChild(row);
        
        
        
        
    });
   
}
renderTasks();



