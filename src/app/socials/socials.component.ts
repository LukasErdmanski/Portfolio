import { Component } from '@angular/core';

export type SocialItem = {
  link: string;
  target: string;
  logo: string;
  name: string;
};

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.scss',
})
export class SocialsComponent {
  protected socialsItems: SocialItem[] = [
    {
      link: 'https://github.com/LukasErdmanski',
      target: '_blank',
      logo: 'github.svg',
      name: 'github',
    },
    {
      link: '#contact',
      target: '',
      logo: 'email.svg',
      name: 'email',
    },
    {
      link: 'https://www.linkedin.com/in/lukaserdmanski',
      target: '_blank',
      logo: 'linkedin.svg',
      name: 'linkedin',
    },
  ];
}
