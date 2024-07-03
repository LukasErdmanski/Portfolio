import { Component } from '@angular/core';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  protected sectionsIds: string[] = [
    'start-screen',
    'about-me',
    'skills',
    'portfolio',
    'contact',
  ];
}
