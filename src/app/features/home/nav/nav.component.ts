import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeComponent } from "../../../shared/theme/theme.component";
import { ThemeService } from '../../../core/services/theme.service';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, ThemeComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {


  collapseNav :boolean = false;
  collapseMobileNav(){
    this.collapseNav = !this.collapseNav;
  }



    themeService =  inject(ThemeService);
     themeState:boolean = true;
      ngOnInit(){
        this.themeService.subject.subscribe((vale)=>{
          this.themeState = vale;
          this.themeService.toggleTheme(vale);
        })
      }
    toggleTheme() {
      this.themeService.subject.next(!this.themeState);
    }




}
