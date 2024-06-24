import { Component } from '@angular/core';
import { scrollToSection } from '../utils/scrollToSection.function';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  protected scrollToSection: Function = scrollToSection;
}
