import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { scrollToSection } from '../utils/scrollToSection.function';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent implements OnInit {
  protected currentSection: string = '';
  protected sectionsIds: string[] = [
    'start-screen',
    'about-me',
    'skills',
    'portfolio',
    'contact',
  ];
  protected routeSectionIdSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.subscribeScrollToRouteSectionIdOnInit();
  }

  private subscribeScrollToRouteSectionIdOnInit(): void {
    this.routeSectionIdSubscription = this.route.params.subscribe((params) => {
      this.currentSection = params['sectionId'];
      this.scrollToSection(this.currentSection);
    });
  }

  ngOnDestroy(): void {
    this.routeSectionIdSubscription.unsubscribe();
  }

  protected scrollToSection = scrollToSection;

  protected onSectionChange(sectionId: string): void {
    this.location.go(sectionId);
    this.currentSection = sectionId;
  }
}
