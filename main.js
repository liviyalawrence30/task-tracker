
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
let tasks= JSON.parse(localStorage.getItem("tasks")) || [];
let current_filter="All";
let current_sort="";
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

taskForm.addEventListener("submit",function(event){
    event.preventDefault();
    const taskName=nameInput.value;
    const priority=priorityInput.value;
    const dueDate=duedateInput.value;
    const newTask={
        id:Date.now(),
        name:taskName,
        priority:priority,
        dueDate: dueDate,
        done:false
    };
    tasks.push(newTask);
    console.log("after:",tasks);
    saveTasks();
    renderTasks();

    taskForm.reset();
    

});

clearAllButton.addEventListener("click",function(){
    tasks=[];
    saveTasks();
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
    let filteredTasks=[...tasks];
    if(current_filter ==="Pending"){
        filteredTasks=tasks.filter(function(task){
            return !task.done;
        });
    }
    if(current_filter === "Done"){
        filteredTasks=tasks.filter(function(task){
            return task.done;
        });
    }
    if(current_sort === "priority"){
        const priorityOrder={
            High:1,
            Medium:2,
            Low:3
        };
        filteredTasks.sort(function(a,b){
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }
    if(current_sort=== "dueDate"){
        filteredTasks.sort(function(a,b){
            return new Date(a.dueDate)- new Date(b.dueDate);
        });
    }
    taskCounter.textContent=`Showing ${filteredTasks.length} of ${tasks.length} tasks`;

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
            task.done=!task.done;
            saveTasks();
            renderTasks();
        });
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(doneButton);
        taskList.appendChild(listItem);
        const row=document.createElement("tr");
        row.innerHTML=`
        <td>${task.name}</td>
        <td>${task.priority}</td>
        <td>${task.dueDate}</td>
        <td>${task.done? "Done":"Pending"}</td>
        `;
        taskTableBody.appendChild(row);
    });
   
}
renderTasks();



