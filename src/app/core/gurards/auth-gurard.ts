import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { filter, flatMap, from, map } from 'rxjs';



export const authGuard: CanActivateFn = (route, state) => {
const router  = inject(Router);
  if(!localStorage.getItem("User")){
    router.navigate(['/']);
    return false;
  }else {
    return true;
  }
};
