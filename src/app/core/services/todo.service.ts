
import { inject, Injectable, signal } from '@angular/core';
import { Firestore,addDoc,setDoc,collection, getDoc, getDocs,query, where, doc, updateDoc, deleteDoc, Timestamp } from '@angular/fire/firestore';
import { from, Observable, of, single } from 'rxjs';
import  { Task, Todo } from '../models/todo';
import { NotificationsService } from './notifications.service';


@Injectable({
  providedIn: 'root'
})
export class TodoService {



  constructor() { }

  public blurSignal = signal(false);
   private firestore = inject(Firestore);
   public formState = signal(false);
   private notificationService = inject(NotificationsService);
   


  //  Create a new task here==================>
   async createTask(data:any) {
    console.log(data);
    try {
      const check =  this.checkTask(data);
     check.then(async (response)=>{
        if(response && (response!['title'] === data.title)){
         // return from(['Task already exit !']);
          this.formState.set(false);
          this.notificationService.errorMessage('Task already exit !','Task one');
        }else {
          const docRef =  await addDoc(collection(this.firestore,'Task'),data);
          if(docRef.id){
            // return from(['Task created successfully !']);
            this.formState.set(true);
            this.notificationService.successMessage('Task created successfully !','Task created');  
          }
        }
      })
    }catch(error){
      // return from(['Something went wrong !'])
     this.notificationService.errorMessage('Something went wrong !',"Failed task");
    }
  }


  // Check task by task title ==================>
 async checkTask(data:any){
  const collectionRef =  collection(this.firestore,'Task');
  const q = query(collectionRef,where('title',"==",data.title));
  const querySnapShot = await getDocs(q);

  let getData;
  querySnapShot.forEach((doc)=>{
    getData = doc.data();   
  })
  return getData;
  }

  // Get all tasks
 async getAllTask(){
   let data:any[] = [];
   const querySnapShot = await getDocs(collection(this.firestore,'Task'));
   querySnapShot.forEach((doc)=>{
    const dataWithId = {
      ...doc.data(),
      id:doc.id,
      start_date: (doc.data()['start_date'] as Timestamp).toDate(),
      end_date : (doc.data()['end_date'] as Timestamp).toDate()
    }
   data.push(dataWithId);
   })
   return data;
  }

  async getDataByTitle(title:string):Promise<any>{
      const q =await query(collection(this.firestore,'Task'), where("title", '==',title));
      const querySnapShot = await  getDocs(q);
      if(querySnapShot.empty){
       throw new Error("Data not found !");
      }
      let data;
      querySnapShot.forEach((doc)=>{
        data = doc.data();
      })
      alert(data)
      return data;
  }


  async updateTaskStatus(id:string,status:string){
    const collectionRef =  collection(this.firestore,'Task');
    try {
      const docRef =  doc(this.firestore,'Task',id);
      await updateDoc(docRef,{
        status:status
      })
        // const querySnapShot =await getDocs(q);
        //  querySnapShot.forEach( async (docSnapshot)=>{
        //   const docRef =  doc(this.firestore,'Task',docSnapshot.id);
        //   await updateDoc(docRef,{
        //     status:status
        //   })
        //  })
         return 'Document updated successfully !';
    }catch(error) {
         return 'Failed to update document !';
    }
}



async updateTaskDeadline(deadline:boolean,id:string){
  alert(deadline+"   "+id)
  const collectionRef =  collection(this.firestore,'Task');
  try {
    const docRef =  doc(this.firestore,'Task',id);
    await updateDoc(docRef,{
      deadline:deadline
    })
      // const querySnapShot =await getDocs(q);
      //  querySnapShot.forEach( async (docSnapshot)=>{
      //   const docRef =  doc(this.firestore,'Task',id);
      //   await updateDoc(docRef,{
      //     status:deadline
      //   })
      //  })
       return 'Document updated successfully !';
  }catch(error) {
       return 'Failed to update document !';
  }
}



async getTaskById(taskId:string):Promise<Task | Error>  {
  const docRef = doc(this.firestore,'Task',taskId);
  let data:Task;
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
     data = {
      title:  docSnap.data()['title'],
      description:docSnap.data()['description'],
      start_date: (docSnap.data()['start_date'] as Timestamp).toDate(),
      end_date : (docSnap.data()['end_date'] as Timestamp).toDate(),
      status:docSnap.data()['status'],
      priority:docSnap.data()['priority'],
      remainder:docSnap.data()['remainder']
    }
    return data;
  }
  return new Error("Document doesn't exit !");
}

async updateTasK(taskId:string,data:any):Promise<string>{
  try{
    const docRef = doc(this.firestore,'Task',taskId);
    const update = await updateDoc(docRef,data);
    return "Date updated successfully!"
  }catch(error) {
    return "Faild to update data!";
  }
}




async deleteTask(id:string){
  try {
   await deleteDoc(doc(this.firestore,'Task',id));
   return "Task deleted successfully !"
  }catch {
   return  new Error('Failed to delete task !');
  }

 
 
}

editTask(id:string) {

}



}


