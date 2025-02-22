import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftSidebarComponent } from "../left-sidebar/left-sidebar.component";
import { MainContentComponent } from "../main-content/main-content.component";
import { SidenavService } from '../../../core/services/sidenav.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LeftSidebarComponent, MainContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  collapseMenu(eventData:boolean){
  }

  sideNavService = inject(SidenavService);
  screenWidth = signal<number>(window.innerWidth);

  @HostListener('window:resize')
  onResize(){
  this.screenWidth.set(window.innerWidth);
  if(this.screenWidth() < 768){
    this.sideNavService.position.set('overlay');
    this.sideNavService.collapse.set(true);
  }
  }


  ngOnInit(){
    if(this.screenWidth() < 768){
    this.sideNavService.position.set('overlay');
    this.sideNavService.collapse.set(true);
  }
}


}
