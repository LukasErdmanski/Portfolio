import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavMenuService {
  private menuOpenState: boolean = false;

  public isMenuOpen(): boolean {
    return this.menuOpenState ? true : false;
  }

  public setMenuOpenState(openState: boolean): void {
    this.setDocumentBodyOverflowValue(openState ? 'hidden' : 'auto');
    this.menuOpenState = openState;
  }

  private setDocumentBodyOverflowValue(openflowValue: 'auto' | 'hidden'): void {
    document.body.style.overflow = openflowValue;
  }

  public moveToSection(section: string): void {
    this.setMenuOpenState(false);
    setTimeout(() => {
      document.location = '#' + section;
    }, 100);
  }
}
