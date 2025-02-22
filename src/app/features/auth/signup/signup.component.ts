import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavComponent } from '../../home/nav/nav.component';
import { UserI } from '../../../core/models/userInterface';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NavComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({});
  private authService = inject(AuthService);

  constructor() {
    this.initializeForm();
  }
  ngAfterViewInit() {}

  initializeForm() {
    this.signupForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSave() {
    const formValue: UserI = this.signupForm.value;
    this.authService.createNewUser(formValue);
    this.signupForm.reset();
  }
}
