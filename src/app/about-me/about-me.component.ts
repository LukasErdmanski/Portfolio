import { Component } from '@angular/core';
import { scrollSectionToTop } from '../utils/scrollSectionToTop.function';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  protected scrollSectionToTop: Function = scrollSectionToTop;
}
