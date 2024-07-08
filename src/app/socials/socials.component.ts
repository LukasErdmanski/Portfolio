import { Component } from '@angular/core';
import { NavMenuService } from '../utils/navmenu.service';

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
  constructor(protected navMenuService: NavMenuService) {}

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

  protected shoudlHaveATagAttribute(socialItem: SocialItem): boolean {
    const navMenuOpenState = this.navMenuService.isMenuOpen();
    return !navMenuOpenState || socialItem.name !== 'email';
  }

  protected shoudlHaveClickAttribute(socialItem: SocialItem): boolean {
    const navMenuOpenState = this.navMenuService.isMenuOpen();
    return navMenuOpenState && socialItem.name == 'email';
  }
}
