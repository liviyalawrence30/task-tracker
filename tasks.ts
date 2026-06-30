interface Task{
    id:number;
    name: string;
    priority: "Low"| "Medium"|"High";
    dueDate:string;
    done:boolean;
}
let tasks: Task[] =[];
function addTask(
    name:string,
    priority: "Low"| "Medium"|"High",
    dueDate: string
):Task{
    const newTask: Task={
        id: Date.now(),
        name,
        priority,
        dueDate,
        done: false
    };
tasks.push(newTask);
return newTask;
}
function toggleDone(id:number): void{
    const task=tasks.find(function(task){
        return task.id === id;
    });
    if(task){
        task.done= !task.done;
    }
}
