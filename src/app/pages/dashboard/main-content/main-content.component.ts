import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { SidenavService } from '../../../core/services/sidenav.service';
import { RouterOutlet } from '@angular/router';
import { NgStyle } from '@angular/common';
import { single } from 'rxjs';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [RouterOutlet,NgStyle],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {


  sideNavService = inject(SidenavService);
  

  collapseProfile = signal<boolean>(false);
  constructor(){
    console.log();
  }


  ngOnInit(){
 
  }

  

 

  ngAfterViewInit(){

  }

  showProfile(){
    this.collapseProfile.set(!this.collapseProfile());
  }
  
}
