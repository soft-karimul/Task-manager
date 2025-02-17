import { Component, inject, Input } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';
import { Task } from '../../../core/models/todo';
import { DatePipe } from '@angular/common';
import { TaskDetailsService } from '../../../core/services/task-details.service';

@Component({
  
  selector: 'app-task-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {

Id:string = '';
taskDuration:any;
 s_interval:any;
 timer_state:boolean = false;
 totalTime:[{h:number,m:number,s:number}] = [{
  h:0,
  m:0,
  s:0
 }];
 startTime:[{h:number,m:number,s:number}] = [{
  h:0,
  m:0,
  s:0
 }]

 todoService =  inject(TodoService);
 taskDetails = inject(TaskDetailsService);
 task!:Task;

  async ngOnInit(){
    this.getTaskDuration()
   }


   async getTaskDuration(){
    this.taskDuration =  await this.taskDetails.getTaskDuration(this.Id);
    this.startTime[0].h =  this.taskDuration.start_time[0].h;
    this.startTime[0].m = this.taskDuration.start_time[0].m;
    this.startTime[0].s = this.taskDuration.start_time[0].s;
   }
   

  ngAfterViewInit(){

  }



 
@Input()
set id(taskId:string){
  alert("route")
  this.Id = taskId;
  this.getTaskDuration();
 this.todoService.getTaskById(taskId).then((res:Task | Error)=>{
  this.task = res as Task;
   const h =  (this.task.end_date.getHours() - this.task.start_date.getHours());
   const m =  (this.task.end_date.getMinutes() - this.task.start_date.getMinutes());
   const s =  (this.task.end_date.getSeconds() - this.task.start_date.getSeconds());
   this.totalTime = [{
    h:h,
    m:m,
    s:s
   }]
   alert('router')
   this.taskDetails.createTaskDuration(this.Id,this.totalTime,this.startTime,'route');
 }).catch((error)=>{
  console.log(error);
 });
}

// Task timer here ================>
async start_task(){
 if(this.timer_state){
    clearInterval(this.s_interval);
    this.timer_state = false;
    return;
 }
 this.timer_state = true;
 this.s_interval =  setInterval(()=>{
     
    // if(this.totalTime[0].h === this.startTime[0].h &&  this.totalTime[0].m === this.startTime[0].m && this.totalTime[0].s ===this.startTime[0].s){
    //   clearInterval(this.s_interval);
    //   this.start_task();

    // }



      ++this.startTime[0].s;
      if(this.startTime[0].s >= 60){
        this.startTime[0].s = 0;
        ++this.startTime[0].m;
      }
      if(this.startTime[0].m >= 60){
        ++this.startTime[0].h;
        this.startTime[0].m = 0; 
      } 

this.startTime = [{
  h:this.startTime[0].h,
  m:this.startTime[0].m,
  s:this.startTime[0].s
}];
const res =   this.taskDetails.createTaskDuration(this.Id,this.totalTime,this.startTime,'interval');
 
// if(this.totalTime[0].h === this.startTime[0].h &&  this.totalTime[0].m === this.startTime[0].m && this.totalTime[0].s ===this.startTime[0].s){
  if(this.startTime[0].s == 17){
  
  clearInterval(this.s_interval);
  this.start_task();
  //update task deadline
  this.todoService.updateTaskDeadline(true,this.Id);
  this.todoService.updateTaskStatus(this.Id,'completed');
}


},1000)
}



end_task(){
clearInterval(this.s_interval);
}


ngOnDestroy(){
  clearInterval(this.s_interval);
  this.getTaskDuration();
}
  

}
