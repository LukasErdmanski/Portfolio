import { Component } from '@angular/core';
import { scrollToSection } from '../utils/scrollToSection.function';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  protected scrollToSection: Function = scrollToSection;
}
