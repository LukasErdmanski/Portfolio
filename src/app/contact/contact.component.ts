import { Component } from '@angular/core';
import { scrollSectionToTop } from '../utils/scrollSectionToTop.function';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  protected scrollSectionToTop: Function = scrollSectionToTop;
}
