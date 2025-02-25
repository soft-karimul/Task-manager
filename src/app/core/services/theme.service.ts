import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { 
    
  }

   subject = new BehaviorSubject<boolean>(false);

  
   toggleTheme(state:boolean){
    if(state){
      document.documentElement.setAttribute('data-bs-theme', 'dark');
     }else {
       document.documentElement.setAttribute('data-bs-theme', 'light');
     }
   }



}
