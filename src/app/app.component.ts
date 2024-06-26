import { Component } from '@angular/core';
import { scrollSectionToTop } from './utils/scrollSectionToTop.function';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';

  protected sectionsIds: string[] = ['about-me', 'skills', 'portfolio'];

  protected scrollSectionToTop = scrollSectionToTop;
}
