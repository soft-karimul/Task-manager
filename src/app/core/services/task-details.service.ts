import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class TaskDetailsService {
  constructor() {}

  firestore = inject(Firestore);

  async getTaskDuration(id: string) {
    let data;
    const q = query(
      collection(this.firestore, 'taskDuration'),
      where('id', '==', id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data = doc.data();
    });
    return data;
  }

  async createTaskDuration(id: string,totalTime:any,start_time:any,location:any) {

    console.log(start_time[0].h+' : '+start_time[0].m+' : '+start_time[0].s+ location);
    const data = await this.getTaskDuration(id);
    if (data == undefined) {
      this.taskDuration(id,totalTime,start_time);
    }else {
      const q = await query(collection(this.firestore,"taskDuration"), where("id", "==",id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document)=>{
        const updateDocRef = doc(this.firestore, "taskDuration",document.id);
        await updateDoc(updateDocRef,{
          start_time: start_time,
          total_time: totalTime,
        })
      })
  
    }
  }

  async taskDuration(id: string,totalTime:any,start_time:any) {
    try {
      const docRef = await addDoc(collection(this.firestore, 'taskDuration'), {
        start_time: start_time,
        total_time: totalTime,
        id: id,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    console.log('task duration !');
  }
}
