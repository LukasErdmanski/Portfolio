import { Component, OnInit } from '@angular/core';
import { NavMenuService } from './services/navmenu.service';
import { animateChild, query, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { HoverStyleService } from './services/hover-style.service';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('childAnimation', [
      transition('* => void', [
        query('@*', [animateChild()], { optional: true }),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  protected title = 'portfolio';

  private routerSubscription!: Subscription;

  protected isRouteFound = false;

  constructor(
    protected navMenuService: NavMenuService,
    private translate: TranslateService,
    private hoverStyleService: HoverStyleService,
    private router: Router
  ) {
    // Set default language if the translation isn't available
    translate.setDefaultLang('en');

    // Use 'en' as the current language for translations
    translate.use('en');
  }

  /**
   * Angular's OnInit lifecycle hook.
   * Starts the necessary subscriptions related to the component.
   */
  ngOnInit() {
    this.subscribeToRouterEvents();
  }

  /**
   * Angular's OnDestroy lifecycle hook.
   * Unsubscribes from router events to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  /**
   * Subscribes to router events.
   * Focuses specifically on the 'NavigationEnd' event and checks if
   * the current route exists.
   */
  private subscribeToRouterEvents(): void {
    /*
     * `this.router.events` emits router navigation events.
     * We filter these events to listen specifically for `NavigationEnd`,
     * which fires when the navigation to a new route is complete.
     */
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.checkIfRouteExists());
  }

  /**
   * Checks if the current route exists.
   * If no matching route is found, it sets the isNotFoundElementVisible
   * flag to true.
   *
   * @returns void
   */
  private checkIfRouteExists(): void {
    /*
     * `this.router.url.slice(1)` removes the leading slash ('/')
     * from the URL to get the actual route path.
     * For example, '/home' becomes 'home'.
     */
    const currentRouteUrl: string = this.router.url.slice(1);
    /*
     * `this.router.config.find()` looks for a matching route configuration
     * in the Angular router config based on the current path.
     * If a matching route is found, it returns a `Route` object;
     * otherwise, it returns `undefined`.
     */
    const wasCurrentRouteUrlFound: Route | undefined = this.router.config.find(
      (router) => router.path === currentRouteUrl
    );
    this.isRouteFound = !!wasCurrentRouteUrlFound;
  }
}
