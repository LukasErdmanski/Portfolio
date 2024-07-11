import { Component } from '@angular/core';
import { NavMenuService } from './services/navmenu.service';
import { animateChild, query, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('childAnimation', [
      transition('* => void', [
        query('@*', [animateChild()], { optional: true }),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'portfolio';

  constructor(
    protected navMenuService: NavMenuService,
    private translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
}
