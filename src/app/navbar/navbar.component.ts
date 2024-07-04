import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ViewChild } from '@angular/core';

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
  @ViewChild('habBtn') habBtn!: HTMLElement;

  protected changeLang(language: string): void {
    const langaugeElements: NodeListOf<Element> =
      document.querySelectorAll('.lang');
    langaugeElements.forEach((languageElement: Element) =>
      languageElement.classList.remove('checked')
    );

    document.querySelector('.' + language)?.classList.add('checked');

    if (language === 'en') console.log('Current language is EN');
    else console.log('Current language is DE');
  }
}
