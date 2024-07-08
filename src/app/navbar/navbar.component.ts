import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavMenuService } from '../utils/navmenu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'void',
        style({
          transform: 'translateY(-100%)',
          opacity: 0,
        })
      ),
      transition(':enter', [animate('400ms 100ms ease-in-out')]),
      transition(':leave', [animate('225ms ease-in')]),
    ]),
  ],
})
export class NavbarComponent {
  @ViewChild('hamBtn') private habBtn!: ElementRef;

  constructor(protected navMenuService: NavMenuService) {}

  protected openNavbar(): void {
    this.navMenuService.setMenuOpenState(!this.navMenuService.isMenuOpen());

    this.habBtn.nativeElement.setAttribute.ariaExpanded =
      this.navMenuService.isMenuOpen();
    setTimeout(() => {
      // TODO: add 'checked' class to the last choosen language
    }, 100);
  }

  protected changeLanguage(language: string): void {
    const langaugeElements: NodeListOf<Element> =
      document.querySelectorAll('.lang');
    langaugeElements.forEach((languageElement: Element) =>
      languageElement.classList.remove('checked')
    );

    document.querySelector('.' + language)?.classList.add('checked');

    // TODO: use the choosen language to translate to it
    // TODO: set globally current language in the service
    if (language === 'en') console.log('Current language is EN');
    else console.log('Current language is DE');
  }
}
