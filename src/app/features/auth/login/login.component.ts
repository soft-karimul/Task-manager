import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import { RouterLink } from '@angular/router';
import { NavComponent } from "../../home/nav/nav.component";
import { UserI } from '../../../core/models/userInterface';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NavComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  loginForm:FormGroup = new FormGroup({});
  private authService  = inject(AuthService);
  
  constructor() {
   this.initializeForm(); 
  }

  initializeForm() {
    this.loginForm= new FormGroup({
      email:new FormControl('aa@gmail.com'),
      password:new FormControl('Md7861942@k')
    })
  }

  onSave(){
   const formValue:UserI =  this.loginForm.value;
   this.authService.login(formValue);
    this.loginForm.reset();
  }



}
