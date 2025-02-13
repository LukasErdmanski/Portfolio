import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class NavMenuService {
  public menuOpenState: boolean = false;
  public scrollYPosition: number = 0;
  public mainElement: HTMLElement | null = null;

  constructor(
    private router: Router,
    private routeValidationService: NavigationService
  ) {}

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
      // const rect = this.mainElement.getBoundingClientRect();
      // this.scrollYPosition = rect.top;
      this.setScrollYPosition(this.mainElement);
    }
  }

  public setScrollYPosition(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    this.scrollYPosition = rect?.top;
  }

  public restoreMainElementScrollPosition(): void {
    // debugger;
    this.mainElement = document.querySelector('main');
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

  public setScrollBehavior(value: 'auto' | 'smooth'): void {
    document.documentElement.style.scrollBehavior = value;
    document.body.style.scrollBehavior = value;
  }

  public applyFullHeightScrollStyle(): void {
    // Apply full height and scrolling behavior to html and body elements
    document.documentElement.classList.add('fullHeightScrollStyle');
    document.body.classList.add('fullHeightScrollStyle');
  }

  public resetFullHeightScrollStyle(): void {
    // Reset the height and scrolling behavior to default
    document.documentElement.classList.remove('fullHeightScrollStyle');
    document.body.classList.remove('fullHeightScrollStyle');
  }

  /**
   * Handles navigation to a section on the main page.
   * The `if` checks if the user is on the 'legal-notice' route and uses `router.navigateByUrl()`
   * to ensure correct navigation back to the main page. For all other routes,
   * `document.location` is used to navigate within the same page.
   *
   * @param section The section ID to navigate to (e.g., 'about-me', 'portfolio').
   */
  public moveToSection(section: string): void {
    this.routeValidationService.setNavigationTriggedFromNavMemu(true);
    this.setMenuOpenState(false);

    // if (document.location.pathname === '/legal-notice') {
    //   this.setScrollBehavior('smooth'); // Smooth Scroll für Main Content
    //   setTimeout(() => {
    //     this.router.navigateByUrl(`/#${section}`);
    //   }, 100);
    // } else

    // debugger;
    setTimeout(() => {
      // document.location = '#' + section;
      this.router.navigateByUrl(`/#${section}`);
    }, 100);
  }

  isLegalNotice: boolean = false;

  navigateToFromLegacyNotice(ToFrom: boolean): void {
    this.mainElement = document.querySelector('main');
    if (this.mainElement) {
      if (ToFrom) this.saveMainElementScrollPosition();
      else this.restoreMainElementScrollPosition();
    }
    this.router.navigateByUrl('/legal-notice');
  }
}
