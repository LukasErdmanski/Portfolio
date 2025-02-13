import { Component } from '@angular/core';
import { NavMenuService } from '../../services/navmenu.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(
    private navMenuService: NavMenuService,
    private routeValidationService: NavigationService,
    private router: Router
  ) {}

  protected scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  protected moreMethodsTogether(): void {
    // // this.navMenuService.saveMainElementScrollPosition();
    // // debugger;
    // // this.routeValidationService.setWindowScrollYPosition();
    // console.log(
    //   'vor navi dies scroll Y: ',
    //   this.navMenuService.scrollYPosition
    // );
    // this.navMenuService.saveMainElementScrollPosition();

    // this.navMenuService.setScrollBehavior('auto');
    // this.router.navigateByUrl('legal-notice');
    // // this.scrollToTop();

    // this.navMenuService.setScrollBehavior('auto'); // Auto Scroll für Legal Notice
    // this.navMenuService.saveMainElementScrollPosition();

    // const top = window.scrollY;
    // // if (mainElement) {
    // //   this.navMenuService.setScrollYPosition(mainElement);
    // // }

    // this.navMenuService.scrollYPosition = top;

    // console.log('SCROLL Y BEFORE LN', this.navMenuService.scrollYPosition);

    // this.navMenuService.applyFullHeightScrollStyle();
    // window.scrollTo(0, 0);
    this.router.navigateByUrl('legal-notice');
    // this.router.url = '7dkdsjakls';

    // window.history.pushState('object or string', 'Title', '/legacy-notice');
  }
}
