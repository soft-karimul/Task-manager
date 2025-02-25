import { Component, inject, signal, viewChild, ViewChild } from '@angular/core';
import { ThemeComponent } from '../../../../shared/theme/theme.component';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-appearance',
  standalone: true,
  imports: [],
  templateUrl: './appearance.component.html',
  styleUrl: './appearance.component.scss'
})
export class AppearanceComponent {


  themeComponent = viewChild(ThemeComponent);
  @ViewChild('mode') mode!: HTMLSelectElement;

  constructor() {
  }

   themeService =  inject(ThemeService);
   themeState:boolean = true;
  
   
    ngOnInit(){
 
    }

  getMode(mode:HTMLSelectElement) {
    this.themeService.subject.next(!this.themeState);
    this.themeService.subject.subscribe((vale)=>{
      this.themeState = vale;
      this.themeService.toggleTheme(vale);
    })
  }

  




}
