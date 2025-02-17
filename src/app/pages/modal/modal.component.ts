import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, input, Output, output, signal, ViewChild, viewChild, viewChildren } from '@angular/core';
import { NgModel ,FormsModule,FormControl, NgForm} from '@angular/forms';
import { TodoService } from '../../core/services/todo.service';
import { NotificationsService } from '../../core/services/notifications.service';
import { TodoComponent } from '../dashboard/todo/todo.component';


const enum Status {
  "pending",
  "completed"

}



@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  formStatus = signal(false);
  @Input() formdata: any[]  = []
  title = '';
  description = '';
  start_time = '';
  end_time = '';
  start_date:number = 0;
  end_date:number = 0;
  priority = '';
  remainder:boolean = false;
  status: 'pending' | 'completed' = 'pending';
  deadline:boolean = false;

taskService = inject(TodoService);
notificationService = inject(NotificationsService);
todoComponent = viewChild(TodoComponent);


  ngOnChanges(){
    this.updateTask(this.formdata);
  }


 


updateTask(formdata: any){
  this.formStatus.set(true);
  this.title = formdata[0].title;
  this.description = formdata[0].description;
  this.start_time = formdata[0].start_time;
  this.end_time = formdata[0].end_time;
  this.priority = formdata[0].priority;
  this.remainder = formdata[0].remainder;
  this.status = formdata[0].status;
}

updateForm(){
  const data = {
    title:this.title,
    description:this.description,
    start_date: new Date(this.start_date),
    end_date:new Date(this.end_date),
    priority:this.priority,
    remainder:Boolean(this.remainder),
    status: 'pending'
  }
  this.taskService.updateTasK(this.formdata[0].id,data).then((res)=>{
    this.close.emit();
     this.formStatus.set(false);
     this.notificationService.successMessage(res,'Updated');
  }).catch((error)=>{
    this.notificationService.errorMessage(error,'Error message');
  });
}



@ViewChild('taskForm') actorForm!: NgForm;
close = output<void>();
@Output() task = new EventEmitter<{title:string,description:string,start_date:Date,end_date:Date}>();

submitForm() {
  const data = {
    title:this.title,
    description:this.description,
    start_date: new Date(this.start_date),
    end_date:new Date(this.end_date),
    priority:this.priority,
    remainder:Boolean(this.remainder),
    status: 'pending',
    deadline: false
  }

 if(this.actorForm.valid){
  this.task.emit(data);
 }else {
    this.notificationService.errorMessage('Please fill all the fields','Error message');
 }
  




}

}
