import { Component } from '@angular/core';
import { NavMenuService } from '../utils/navmenu.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrl: './navmenu.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'void',
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        })
      ),
      transition(':enter', [animate('400ms 100ms ease-in-out')]),
      transition(':leave', [animate('225ms ease-in')]),
    ]),
    trigger('openCloseFooter', [
      state(
        'void',
        style({
          transform: 'translateY(100%)',
        })
      ),
      transition(':enter', [animate('500ms ease-in-out')]),
      transition(':leave', [animate('300ms ease-in')]),
    ]),
  ],
})
export class NavmenuComponent {
  constructor(protected navMenuService: NavMenuService) {}
}
