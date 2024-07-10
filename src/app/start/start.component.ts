import { Component } from '@angular/core';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
// TODO: rename finally maybe to section or outlet wrapper
export class StartComponent {
  protected sectionsIds: string[] = [
    'start-screen',
    'about-me',
    'skills',
    'portfolio',
    'contact',
  ];
}
