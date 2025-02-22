import { Component, inject, Input } from '@angular/core';
import { TaskDetailsComponent } from "../task-details/task-details.component";
import { TodoService } from '../../../core/services/todo.service';
import { TaskDetailsService } from '../../../core/services/task-details.service';
import { Task } from '../../../core/models/todo';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [DatePipe,RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {


 
  
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
   tasks:any;
  
    async ngOnInit(){

      this.getTaskDuration()
      this.getAllTask()
     }
  
  
     async getTaskDuration(){
      this.taskDuration =  await this.taskDetails.getTaskDuration(this.Id);
      this.startTime[0].h =  this.taskDuration.start_time[0].h;
      this.startTime[0].m = this.taskDuration.start_time[0].m;
      this.startTime[0].s = this.taskDuration.start_time[0].s;
     }
     
  
    ngAfterViewInit(){
  
    }
  
  
  
    getAllTask() {
      this.getTaskDuration();
     this.todoService.getAllTask().then((res)=>{
      this.tasks = res;
    
       const h =  (this.tasks.end_date.getHours() - this.tasks.start_date.getHours());
       const m =  (this.tasks.end_date.getMinutes() - this.tasks.start_date.getMinutes());
       const s =  (this.tasks.end_date.getSeconds() - this.tasks.start_date.getSeconds());
       this.totalTime = [{
        h:h,
        m:m,
        s:s
       }]
       this.taskDetails.createTaskDuration(this.Id,this.totalTime,this.startTime,'route');
     }).catch((error)=>{
      console.log(error);
     });
    }


    
   


  
  

  
  
  

  
  

    
  
  

}
