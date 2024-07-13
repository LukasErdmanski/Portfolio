import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavMenuService {
  private menuOpenState: boolean = false;
  private scrollPosition = { top: 0, left: 0 };

  public isMenuOpen(): boolean {
    return this.menuOpenState;
  }

  public setMenuOpenState(openState: boolean): void {
    if (openState) {
      this.saveWindowscrollPosition();
      this.setClassForBodyInAccordingToOpenState(openState);
    } else {
      this.setClassForBodyInAccordingToOpenState(openState);
      this.setWindowscrollPosition();
    }

    this.menuOpenState = openState;
  }

  private saveWindowscrollPosition(): void {
    this.scrollPosition = {
      top: window.scrollY,
      left: window.scrollX,
    };
  }

  private setWindowscrollPosition(): void {
    window.scrollTo(this.scrollPosition.left, this.scrollPosition.top);
  }

  private setClassForBodyInAccordingToOpenState(trueOrFalse: boolean): void {
    if (trueOrFalse) {
      document.body.classList.add('body-namvmenu-open');
    } else {
      document.body.classList.remove('body-namvmenu-open');
    }
  }

  public moveToSection(section: string): void {
    this.setMenuOpenState(false);
    setTimeout(() => {
      document.location = '#' + section;
    }, 100);
  }
}
