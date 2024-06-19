import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  // TODO: maybe outsource the method as a common one to the central shared file
  protected moveToSection(section: string): void {
    document.location = '#' + section;
  }
}
