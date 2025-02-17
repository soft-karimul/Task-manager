import { Component, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import { SidenavService } from '../../../core/services/sidenav.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent implements OnInit {

  width:number = 0;
  constructor(){
  }


  ngOnInit(): void {
  }

  @Output() collapse = new EventEmitter<boolean>(false);
  screenWidth = input<number>();



  sideNavService = inject(SidenavService);
  authService = inject(AuthService);
  router = inject(Router);

  collapseMenu() {
    this.sideNavService.toggle();
  }

  items = [
    {
      routerLink: 'dashboard',
      label: 'dashboard',
      icon: 'bx bxs-dashboard',
      isActive:true
    },
    {
      routerLink: 'todo',
      icon: 'bx bxs-purchase-tag-alt',
      label: 'Create todo',
      isActive:false
    },
    {
      routerLink: 'tasks',
      icon: 'bx bx-compass',
      label: 'tasks',
      isActive:false
    },
    {
      routerLink: 'settings',
      icon: 'bx bxs-cog',
      label: 'settings',
      isActive:false
    },
    {
      routerLink:'',
      icon: 'bx bx-log-in-circle',
      label:'logout',
      isActive:false
    }
  ];

  checkIsActive(id:number){
    if(id ===this.items.length - 1 ){
      console.log(this.authService.logout());
      return;
    }
    this.items.forEach((element,index,array)=>{
      if(id===index) {
        array[index].isActive = true;
      }else {
        array[index].isActive = false;
      }
    })
  }
}
