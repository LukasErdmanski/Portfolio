import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavMenuService } from '../../services/navmenu.service';
import { SelectedLanguageService } from '../../services/selected-language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
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
export class HeaderComponent {
  @ViewChild('hamBtn') private habBtn!: ElementRef;

  constructor(
    protected navMenuService: NavMenuService,
    protected selectedLanguuageService: SelectedLanguageService,
    protected translateService: TranslateService
  ) {}

  protected openNavbar(): void {
    this.navMenuService.setMenuOpenState(!this.navMenuService.isMenuOpen());
    setTimeout(() => {
      const selectLangBtnElem: Element = document.querySelector(
        '.' + this.selectedLanguuageService.getCurrentLanguage()
      )!;
      selectLangBtnElem.classList.add('checked');
    }, 100);
  }

  protected changeLanguage(language: string): void {
    const langaugeElements: NodeListOf<Element> =
      document.querySelectorAll('.lang');
    langaugeElements.forEach((languageElement: Element) =>
      languageElement.classList.remove('checked')
    );
    document.querySelector('.' + language)?.classList.add('checked');

    this.translateService.use(language);

    if (language === 'en')
      this.selectedLanguuageService.setCurrentLanguage('en');
    else this.selectedLanguuageService.setCurrentLanguage('de');
  }
}
