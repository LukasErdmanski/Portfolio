import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  // TODO: add later Storybook, Jira, Azure DevOps, C#, Python, Django LOGO
  protected skillLabels: string[] = [
    'Angular',
    'Typescript',
    'Javascript',
    'HTML',
    'CSS',
    'Firebase',
    'Git',
    'Scrum',
    'Rest-API',
    'Material Design',
  ];

  protected skillsImages: string[] = [
    'angular.svg',
    'typescript.svg',
    'javascript.svg',
    'html.svg',
    'css.svg',
    'firebase.svg',
    'git.svg',
    'scrum.svg',
    'rest-api.svg',
    'material-design.svg',
  ];
}
