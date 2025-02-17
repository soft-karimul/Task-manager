import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyBiELEXIFcGij_Y7JxUXD4uSpA5A2v3BEU",
  authDomain: "wapcrm-618ce.firebaseapp.com",
  projectId: "wapcrm-618ce",
  storageBucket: "wapcrm-618ce.appspot.com",
  messagingSenderId: "354883501529",
  appId: "1:354883501529:web:010918ae6966e704412dc8",
  measurementId: "G-CWS8Q7GPWT"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,withComponentInputBinding()),
     provideFirebaseApp(() => initializeApp(firebaseConfig)),
     provideAuth(() => getAuth()),
     provideFirestore(() => getFirestore()),
     provideAnimations(), // required animations providers
     provideToastr({
      timeOut:10000,
      positionClass:'toast-bottom-right',
      preventDuplicates:true
     }), // Toastr providers
    
    ],
    
    
  
     
};
