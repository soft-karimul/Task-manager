import {
  Component,
  ComponentRef,
  inject,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { TodoService } from '../../../core/services/todo.service';
import {  interval, Unsubscribable } from 'rxjs';
import {  ReactiveFormsModule } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../core/services/notifications.service';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule,DatePipe,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  host: {
   
  }
})
export class TodoComponent {

  router = inject(Router)
  taskId:string|null = null;
  notificationService = inject(NotificationsService);
  componentRef = ComponentRef<ModalComponent>;
 



 //Seee task details =====================================>
  seeTaskDetails(id:any,event:Event){
    const HtmlElement = event.target as HTMLInputElement;
    if(HtmlElement.tagName ==="I" , HtmlElement.classList.contains('bx') && HtmlElement.classList.contains('bx-checkbox')){
      this.taskId = id;
      HtmlElement.classList.remove('bx-checkbox')
      HtmlElement.classList.add('bx-checkbox-checked');
      return;
    }else if(HtmlElement.tagName ==="I" , HtmlElement.classList.contains('bx') && HtmlElement.classList.contains('bx-checkbox-checked')){
      this.taskId = null;
      HtmlElement.classList.remove('bx-checkbox-checked')
      HtmlElement.classList.add('bx-checkbox');
      return;
    }
    this.router.navigate(['/dashboard/taskdetails/',{id:id}]);
  }

  //Task action =====================================>
  async taskAction(event:Event){
   const value = (event.target as HTMLSelectElement).value;
   const select = event.target as HTMLSelectElement;
   if(!this.taskId && value !==""){
 
    select.value = "";
     this.notificationService.errorMessage('Please select atleast one task','Action');
   }  
  
   if(value==="edit" && this.taskId){
    //call edit function here
    const currentTask = await this.allTask.filter((task)=> task.id==this.taskId);
    this.#componentRef?.instance.formStatus.set(true);
    this.showModal();
   this.#componentRef?.setInput('formdata',currentTask);
   this.#componentRef?.setInput('formStatus',true);
   
   }
   if(value==="delete" && this.taskId){
    //call delete function here
     this.todoService.deleteTask(this.taskId).then((res)=>{
      const select = event.target as HTMLSelectElement;
      select.value = "";
      this.notificationService.successMessage(res as string,'Delete message');
      this.getAllTask();
      
     }).catch((error)=>{
      select.value ="";
      this.notificationService.errorMessage(error,'Failed message');
     });
   }
  }

  todoService = inject(TodoService);

  allTask: any[] = [];
  searchItem: any[] = [];
  searchState = signal<boolean>(false);
  vcr = viewChild('container', { read: ViewContainerRef });
  #componentRef?: ComponentRef<ModalComponent>;
  timerStatus  = interval(1000);
  timeStamp!:Timestamp;
  unSubscribeTimeStatus!:Unsubscribable;


//Show model to add new task =====================================>

closePopup(){
  this.#componentRef?.instance.close.subscribe(() => {
    this.#componentRef?.destroy();
    this.todoService.blurSignal.set(false);
    this.getAllTask();
  });
}

  showModal() {
    this.vcr()?.clear();
    this.#componentRef = this.vcr()?.createComponent(ModalComponent);
    this.todoService.blurSignal.set(true);
    this.closePopup()
    this.#componentRef?.instance.task.subscribe((data) => {
      this.todoService.createTask(data).then((res)=>{
       this.#componentRef?.instance.close.emit();
       this.getAllTask();
      }).catch((error)=>{

      });
    });
  }

  // Get all task after ngonInit ====================>
  async ngOnInit() {
    await this.getAllTask();
  this.unSubscribeTimeStatus =   this.timerStatus.subscribe((res)=>{
     this.getTaskTime();
    })
  }

  getTaskTime(){
    this.allTask.map((task)=>{
    let fireBaseStartTime = task.start_date; 
    let firebaseEndTime = task.end_date;
    if(fireBaseStartTime > new Date()){
      this.todoService.updateTaskStatus(task.title,'pending').then((res)=>{
        this.getAllTask();
      });
    }else if (fireBaseStartTime < new Date()){
      this.todoService.updateTaskStatus(task.title,'dued').then((res)=>{
        this.getAllTask();
    })
  }
    })
  }


  



  // Search task by title =====================================>
  hideOption(input:HTMLInputElement) {
    this.searchState.set(false);
    this.searchItem = [];
  }
  showOption() {
    this.searchState.set(true);
    this.searchItem = this.allTask;
  }
  getInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchState.set(true);
    if (inputElement) {
      this.searchItem = [];
      const res = this.allTask.filter((task) =>
        task.title.includes(inputElement.value)
      );
      this.searchItem = res;
     this.getTaskByTitle(inputElement.value);
    }
  }
  readSearchItem(input: HTMLInputElement, li: HTMLLIElement) {
   
    const liContent: string = li.textContent ?? '';
    input.value = liContent;
    this.searchState.set(false);
    this.searchItem = [];
   this.getTaskByTitle(liContent);
  }
  // End search task by title =====================================>


  // Get task by title ====================================>
  getTaskByTitle(title:string) {
    this.todoService.getDataByTitle(title).then((res)=>{
      this.allTask = [];
      console.log(res);
      this.allTask.push(res);
    }).catch((error)=>{
      this.getAllTask();
    });
  }


  //Get all task at one time ========================>
  getAllTask() {
    this.todoService.getAllTask().then((response) => {
      this.allTask = [];
      response.forEach((Task)=>{
        this.allTask.push(Task);
      })
    }).catch((error)=>{
      console.log(error);
    });
  }


  ngOnDestroy(){
    this.unSubscribeTimeStatus.unsubscribe();
  }
}
