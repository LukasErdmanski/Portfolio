import { Component } from '@angular/core';
import { scrollSectionToTop } from '../utils/scrollSectionToTop.function';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected scrollSectionToTop: Function = scrollSectionToTop;
}
