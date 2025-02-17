import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {


  collapseNav :boolean = false;
  // Define button systems
  collapseMobileNav(){
    this.collapseNav = !this.collapseNav;
  }

}
