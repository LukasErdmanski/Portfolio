import { Component } from '@angular/core';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  protected sectionsIds: string[] = [
    'landing-page',
    'about-me',
    'skills',
    'portfolio',
    'contact',
  ];
}
