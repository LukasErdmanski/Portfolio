import { Component } from '@angular/core';
import { NavMenuService } from './utils/navmenu.service';
import { animateChild, query, transition, trigger } from '@angular/animations';

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

  protected sectionsIds: string[] = ['about-me', 'skills', 'portfolio'];

  constructor(protected navMenuService: NavMenuService) {}
}
