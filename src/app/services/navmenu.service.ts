import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavMenuService {
  public menuOpenState: boolean = false;
  public scrollYPosition: number = 0;
  public mainElement: HTMLElement | null = null;

  public isMenuOpen(): boolean {
    return this.menuOpenState;
  }

  public setMenuOpenState(openState: boolean): void {
    this.mainElement = document.querySelector('main');
    if (this.mainElement) {
      if (openState) this.saveMainElementScrollPosition();
      else this.restoreMainElementScrollPosition();
      this.menuOpenState = openState;
    }
  }

  public saveMainElementScrollPosition(): void {
    if (this.mainElement) {
      const rect = this.mainElement.getBoundingClientRect();
      this.scrollYPosition = rect.top;
    }
  }

  public restoreMainElementScrollPosition(): void {
    if (this.mainElement) {
      const rect = this.mainElement.getBoundingClientRect();
      const currentScrollYPosition = rect.top;

      if (currentScrollYPosition !== this.scrollYPosition) {
        // Temporarily disable scroll snapping
        this.setScrollBehavior('auto');

        const scrollAmount = this.scrollYPosition * -1;
        window.scrollTo(0, scrollAmount);

        this.setScrollBehavior('smooth');
      }
    }
  }

  private setScrollBehavior(value: 'auto' | 'smooth'): void {
    document.documentElement.style.scrollBehavior = value;
    document.body.style.scrollBehavior = value;
  }

  public moveToSection(section: string): void {
    this.setMenuOpenState(false);
    setTimeout(() => {
      document.location = '#' + section;
    }, 100);
  }
}
