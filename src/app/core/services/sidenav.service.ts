import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  constructor() {

  }

  collapse: WritableSignal<boolean> = signal(false);
  position: WritableSignal<string> = signal('default');
  toggle() {
    this.collapse.set(!this.collapse());
    if (window.innerWidth < 768) {
      this.position.set('overlay');
    } else {
      this.position.set('default');
    }
  }
  getWindowWidth() {

  }

  get sideNavWidth() {
    return this.collapse() ? '50px' : '200px';
  }
}
