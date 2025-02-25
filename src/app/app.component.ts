import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FormsModule } from '@angular/forms'; 
import { of,map,fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './core/services/auth.service';
import { child } from '@angular/fire/database';
import { TodoService } from './core/services/todo.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'advanced-todo';


router = inject(Router);
authService = inject(AuthService);
todoServie = inject(TodoService);

  ngAfterViewInit(){

  }
  

  

  ngOnInit(){
    // document.documentElement.setAttribute('data-bs-theme', 'dark');
    //  if(localStorage.getItem('User')){
    //   this.router.navigate(['/dashboard']);
    //  }
  }

 



}
