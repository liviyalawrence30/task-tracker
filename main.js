const taskForm=document.querySelector("#task-form");
const nameInput=document.querySelector("#task-name");
const priorityInput= document.querySelector("#priority");
const duedateInput=document.querySelector("#due-date");
const taskList=document.querySelector("#task-list");
const clearAllButton=document.querySelector("#clear-all");

taskForm.addEventListener("submit",function(event){
    event.preventDefault();
    const taskName=nameInput.value;
    const priority=priorityInput.value;
    const dueDate=duedateInput.value;
    const listItem=document.createElement("li");
    listItem.innerHTML=`task: ${taskName}<br>
    Priority : ${priority}<br>
    Due date: ${dueDate}`;

    const today=new Date().toISOString().split("T")[0];
    if(dueDate<=today){
        listItem.classList.add("overdue");
    }
    const doneButton=document.createElement("button");
    doneButton.textContent="Done";
    doneButton.addEventListener("click",function(){
        listItem.classList.toggle("done");
    });
    listItem.appendChild(document.createElement("br"));
    listItem.appendChild(doneButton);
    taskList.appendChild(listItem);
    taskForm.reset();
    

});

clearAllButton.addEventListener("click",function(){
    taskList.innerHTML="";
});



