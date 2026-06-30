export interface Task{
    id:number;
    name: string;
    priority: "Low"| "Medium"|"High";
    dueDate:string;
    done:boolean;
}
export class TaskManager{
    private tasks:Task[]=[];
    constructor(){
        this.load();
    }
    add(data:Omit<Task,"id" | "done">):Task{
        const newTask: Task = {
        id: Date.now(),
        done:false,
        ...data
    };
    this.tasks.push(newTask);
    this.save();
    return newTask;

}
getAll(): Task[]{
    return [...this.tasks];
}
clearAll():void{
    this.tasks=[];
    this.save();
}
toggle(id:number): void{
    const task= this.tasks.find(task=> task.id === id);
    if(task){
        task.done=!task.done;
        this.save();
    }
}
filter(status:"all"|"done"|"pending"): Task[]{
    if(status === "done"){
        return this.tasks.filter(task=> task.done);
    }
    if(status === "pending"){
        return this.tasks.filter(task=>!task.done);
    }
    return [...this.tasks];
}
sortBy(field: keyof Pick<Task, "priority" | "dueDate">): Task[]{
    const sortedTasks=[...this.tasks];
    if(field === "priority"){
        const priorityOrder={
            High:1,
            Medium:2,
            Low:3
        };
        sortedTasks.sort((a,b)=>
            priorityOrder[a.priority] - priorityOrder[b.priority]
        );
    }else{
        sortedTasks.sort((a,b)=>
            new Date(a.dueDate).getTime()- new Date(b.dueDate).getTime()
        );
    }
    return sortedTasks;
}
private save(): void{
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
}
load():void{
    const storedTasks=localStorage.getItem("tasks");
    if(storedTasks){
        this.tasks=JSON.parse(storedTasks);
    }
}


}
export function groupBy<T> (
    items: T[],
    key: keyof T
): Record<string, T[]> {
        const groups: Record<string, T[]> = {};
        items.forEach((item)=>{
            const groupKey= String(item[key]);
            if(!groups[groupKey]){
                groups[groupKey]=[];
            }
            groups[groupKey].push(item);
        });
        return groups;
    }
