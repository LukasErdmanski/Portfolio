import { Component } from '@angular/core';

export type Project = {
  name: string;
  techs: string[];
  text: { en: string; de: string };
  github: string;
  link: string;
  img: string;
};

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  protected projects: Project[] = [
    {
      name: 'Join',
      techs: ['Javascript', 'HTML', 'CSS'],
      text: {
        en: 'A task manager modeled on the Kanban system. Create tasks and organize them using drag-and-drop functionality. Assign them subtasks, users and categories.',
        de: 'Ein Aufgabenmanager nach dem Vorbild des Kanban-Systems. Erstellen Sie Aufgaben und organisieren Sie diese mit Hilfe von Drag-and-Drop-Funktionen. Weisen Sie ihnen Teilaufgaben, Nutzer und Kategorien zu.',
      },
      github: 'https://github.com/LukasErdmanski/Portfolio',
      link: 'https://www.google.com/',
      img: 'portfolio-view.png',
    },
    {
      name: 'El polo loco',
      techs: ['OOP', 'JavaScript', 'HTML', 'CSS'],
      text: {
        en: 'A simple jump-n-run game based on an object-oriented approach. Can you reach the end of the level and defeat the evil end boss, eL polo loco.',
        de: 'Ein einfaches Jump-n-Run-Spiel, das auf einem objektorientierten Ansatz basiert. Schafft du das Ende vom Level zu erreichen und den bösen Endboss, el polo loco zu besiegen?',
      },
      github: 'https://github.com/LukasErdmanski/Portfolio',
      link: 'https://www.google.com/',
      img: 'portfolio-view.png',
    },
    {
      name: 'Portfolio',
      techs: ['Angular', 'TypeScript', 'HTML', 'SCSS'],
      text: {
        en: 'Do you like my portfolio website? Feel free to take a look behind the scenes on Github.',
        de: 'Gefällt Ihnen meine Portfolio-Website? Werfen Sie auf Github gerne einen Blick hinter die Kulissen.',
      },
      github: 'https://github.com/LukasErdmanski/Portfolio',
      link: '#',
      img: 'portfolio-view.png',
    },
    {
      name: 'Pokédex',
      techs: ['JavaScript', 'HTML', 'CSS', 'API'],
      text: {
        en: 'A simple library based on PokéApi that provides and catalogs Pokémon information. Which is your favorite Pokémon?',
        de: 'Eine einfache Bibliothek basierend auf der PokéApi, die Pokémon-Informationen bereitstellt und katalogisiert. Welches ist Ihr Lieblingspokémon?',
      },
      github: 'https://github.com/LukasErdmanski/Portfolio',
      link: 'https://www.google.com/',
      img: 'portfolio-view.png',
    },
  ];
}
