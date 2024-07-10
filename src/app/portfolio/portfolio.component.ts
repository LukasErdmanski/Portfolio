import { Component, HostListener } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';
import { SelectedLanguageService } from '../utils/selected-language.service';

export type Project = {
  name: string;
  techs: string[];
  text: { en: string; de: string };
  github: string;
  link: string;
  img: string;
  state: 'rest' | 'hover';
};

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  animations: [
    trigger('colorUp', [
      state(
        'rest',
        style({
          color: '#2d2d2d12',
        })
      ),
      state(
        'hover',
        style({
          color: '#ff990044',
        })
      ),
      transition('* => *', animate('225ms ease-in')),
    ]),
    trigger('grayscale', [
      state(
        'rest',
        style({
          filter: 'grayscale(1)',
        })
      ),
      state(
        'hover',
        style({
          filter: 'grayscale(0)',
        })
      ),
      transition('* => *', animate('225ms ease-in')),
    ]),
    trigger('frame', [
      state(
        'rest',
        style({
          filter: 'opacity(0)',
        })
      ),
      state(
        'hover',
        style({
          filter: 'opacity(1)',
        })
      ),
      transition('* => *', animate('225ms ease-in-out')),
    ]),
    trigger('circle', [
      state(
        'rest',
        style({
          rotate: '135deg',
          transform: 'scale(0)',
        })
      ),
      state(
        'hover',
        style({
          rotate: '0deg',
          transform: 'scale(1)',
        })
      ),
      /* two transitions to add a small dealy from 'rest' to 'hover' state when circle and text container appers */
      transition('rest => *', animate('225ms 150ms ease-in')),
      transition('hover => *', animate('225ms ease-in')),
    ]),
    trigger('text-left', [
      state(
        'rest',
        style({
          filter: 'opacity(0)',
          transform: 'translateX(-200px)',
        })
      ),
      state(
        'hover',
        style({
          filter: 'opacity(1)',
          transform: 'translateX(0px)',
        })
      ),
      transition('rest => *', animate('225ms 300ms ease-in')),
      transition('hover => *', animate('225ms ease-in')),
    ]),
    trigger('text-right', [
      state(
        'rest',
        style({
          filter: 'opacity(0)',
          transform: 'translateX(200px)',
        })
      ),
      state(
        'hover',
        style({
          filter: 'opacity(1)',
          transform: 'translateX(0px)',
        })
      ),
      transition('rest => *', animate('225ms 300ms ease-in')),
      transition('hover => *', animate('225ms ease-in')),
    ]),
  ],
})
export class PortfolioComponent {
  protected projects: Project[] = [
    // TODO: finally add maybe ring of fire, slack project,
    {
      name: 'Join',
      techs: ['Javascript', 'HTML', 'CSS'],
      text: {
        en: 'A task manager modeled on the Kanban system. Create tasks and organize them using drag-and-drop functionality. Assign them subtasks, users and categories.',
        de: 'Ein Aufgabenmanager nach dem Vorbild des Kanban-Systems. Erstellen Sie Aufgaben und organisieren Sie diese mit Hilfe von Drag-and-Drop-Funktionen. Weisen Sie ihnen Teilaufgaben, Nutzer und Kategorien zu.',
      },
      // TODO: finally change to valid github, link, img
      github: 'https://github.com/LukasErdmanski/Portfolio',
      link: 'https://www.google.com/',
      img: 'portfolio-view.png',
      state: 'rest',
    },
    {
      name: 'El polo loco',
      techs: ['OOP', 'JavaScript', 'HTML', 'CSS'],
      text: {
        en: 'A simple jump-n-run game based on an object-oriented approach. Can you reach the end of the level and defeat the evil end boss, eL polo loco.',
        de: 'Ein einfaches Jump-n-Run-Spiel, das auf einem objektorientierten Ansatz basiert. Schafft du das Ende vom Level zu erreichen und den bösen Endboss, el polo loco zu besiegen?',
      },
      // TODO: finally change to valid github, link, img
      github: 'https://github.com/LukasErdmanski/Portfolio',
      link: 'https://www.google.com/',
      img: 'portfolio-view.png',
      state: 'rest',
    },
    {
      name: 'Portfolio',
      techs: ['Angular', 'TypeScript', 'HTML', 'SCSS'],
      text: {
        en: 'Do you like my portfolio website? Feel free to take a look behind the scenes on Github.',
        de: 'Gefällt Ihnen meine Portfolio-Website? Werfen Sie auf Github gerne einen Blick hinter die Kulissen.',
      },
      // TODO: finally change to valid github, link, img
      github: 'https://github.com/LukasErdmanski/Portfolio',
      link: '#',
      img: 'portfolio-view.png',
      state: 'rest',
    },
    {
      // TODO: finally change to valid github, link, img
      name: 'Pokédex',
      techs: ['JavaScript', 'HTML', 'CSS', 'API'],
      text: {
        en: 'A simple library based on PokéApi that provides and catalogs Pokémon information. Which is your favorite Pokémon?',
        de: 'Eine einfache Bibliothek basierend auf der PokéApi, die Pokémon-Informationen bereitstellt und katalogisiert. Welches ist Ihr Lieblingspokémon?',
      },
      github: 'https://github.com/LukasErdmanski/Portfolio',
      link: 'https://www.google.com/',
      img: 'portfolio-view.png',
      state: 'rest',
    },
  ];

  protected windowInnerWith: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowInnerWith = window.innerWidth;
  }

  constructor(protected selectedLanguageService: SelectedLanguageService) {}

  protected changeMouseState(state: string, i: number): void {
    if (state === 'rest' && this.windowInnerWith > 830)
      this.projects[i].state = state;
    else this.projects[i].state = 'hover';
  }

  protected positionArrow(even: boolean): string {
    if (even) {
      if (this.windowInnerWith > 1100) return 'right: -45px';
      else return 'right: -35px';
    } else {
      if (this.windowInnerWith > 1100) return 'left: -45px';
      else return 'left: -35px';
    }
  }
}
