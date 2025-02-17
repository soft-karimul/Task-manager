import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { UserI } from '../models/userInterface';
import { NotificationsService } from './notifications.service';
import { Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private auth = inject(Auth);
  private route = inject(Router);
  private notification = inject(NotificationsService);
  constructor() {
    console.log(this.auth);
  }

  //New user registration ====================>
  createNewUser(User: UserI) {
    createUserWithEmailAndPassword(this.auth, User.email, User.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: User.name })
          .then(() => {
            const user = userCredential.user;
            localStorage.setItem('User', JSON.stringify(user.email));
            this.notification.successMessage(
              'User register successfully !',
              'User registration '
            );
            setTimeout(() => {
              this.route.navigate(['login']);
            }, 2000);
          })
          .catch((error) => {
            this.notification.errorMessage(error.code, error.message);
          });
      })
      .catch((error) => {
        this.notification.errorMessage(error.code, error.message);
      });
  }

//  Login user ======================================>
  login(user: UserI) {
    signInWithEmailAndPassword(this.auth, user.email, user.password)
      .then((userCredential) => {
        const storeUser = { name:userCredential.user.displayName,email:userCredential.user.email };
        localStorage.setItem('User', JSON.stringify(storeUser));
        this.notification.successMessage(
          'User login successfully !',
          'Login user'
        );
        setTimeout(() => {
          this.route.navigate(['dashboard/overview']);
        }, 2000);
      })
      .catch((error) => {
        this.notification.errorMessage(error.code, error.message);
      });
  }

// Logout user =====================>
  logout() {
    signOut(this.auth);
    localStorage.removeItem('User');
    this.route.navigate(['/']);
  }




}
