import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {


 themeService =  inject(ThemeService);
  theme = signal(true);

 
  ngOnInit(){
    this.themeService.subject.subscribe((vale)=>{
    })
  }

  toggleTheme(){
    if(this.theme()){
     document.documentElement.setAttribute('data-bs-theme', 'dark');
    }else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  
 
  }

}
