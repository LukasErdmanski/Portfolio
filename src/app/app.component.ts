import {
  afterNextRender,
  afterRender,
  AfterRenderRef,
  AfterViewChecked,
  ApplicationRef,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';
import { NavMenuService } from './services/navmenu.service';
import { animateChild, query, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { HoverStyleService } from './services/hover-style.service';
import { BehaviorSubject, filter, Observable, Subscription } from 'rxjs';
import {
  NavigationEnd,
  NavigationSkipped,
  NavigationStart,
  Route,
  Router,
  RouterEvent,
  Scroll,
} from '@angular/router';
import { NavigationService } from './services/navigation.service';
import { ViewportScroller, Location } from '@angular/common';

// Erweitere die native ScrollEvent Klasse um die Eigenschaften customScrollEventID und firedFromMe
export class CustomScrollEventWithId extends Event {
  id: number | string; // Eindeutige ID
  fired: boolean; // Ob es von meinem Code ausgelöst wurde

  constructor(id: number | string, fired: boolean = true) {
    super('scroll'); // Wir erben von ScrollEvent
    this.id = id;
    this.fired = fired;
  }
}

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

  protected isRouteValid = false;
  previousUrl: string = '';

  lastIntervall: any | string | number | undefined;

  private custromScrollWithIdFired: boolean = false;

  public isLegalNotice: boolean = false; // Variable, um zu überprüfen, ob die Route "legal-notice" aktiv ist

  public lastPosition: number = 0;

  private isNavigationTriggedFromNavMemu: boolean = false;

  lastUrl = '';

  private scrollId: string | null = null; // Speichert die Scroll-ID

  scrollIntoViewAtNavigationEnd: boolean = false;

  private isMyCustomScrollEvent(event: Event): boolean {
    // Überprüfe, ob das Event vom Typ CustomScrollEventWithId ist, die ID übereinstimmt und es gefeuert wurde
    return (
      event instanceof CustomScrollEventWithId &&
      event.id === this.scrollId &&
      event.fired === true
    );
  }

  // Funktion, die überprüft, ob das Fragment am oberen Rand ist (mit 1px Toleranz)
  private isFragmentAtTop(
    element: HTMLElement,
    tolerance: number = 1
  ): boolean {
    const rect = element.getBoundingClientRect();

    let result = Math.abs(rect.top) <= tolerance;

    if (!result) {
      this.navMenuService.setScrollBehavior('auto');
      element.scrollIntoView();
      setTimeout(() => {
        this.isFragmentAtTop(element, 1);
      }, 100);
    } else {
      // this.checkBrowserNavigationResult = false;
      this.navMenuService.setScrollBehavior('smooth');
    }

    return result;
  }

  lastElement!: HTMLElement | null; // Speichere das Fragment

  // Scroll positions
  private scrollPositions = new Map();

  lastSetTimeOut: any;

  constructor(
    protected navMenuService: NavMenuService,
    protected routeValidationService: NavigationService,
    private translate: TranslateService,
    private hoverStyleService: HoverStyleService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private ngZone: NgZone,
    private location: Location,
    private appRef: ApplicationRef
  ) {
    // Router-Events abonnieren
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        const navigationInfo = {
          id: event.id,
          url: event.url,
          navigationType: this.getNavigationType(event),
          hasFragment: this.hasFragment(event),
          // scrollPositionRestoration: this.shouldRestoreScrollPosition(event),
        };

        // Speichere das Navigation-Event im Array
        this.navigationEvents.push(navigationInfo);
      });

    // NavigationEnd-Event überwachen, um die gespeicherten Informationen zu verwenden
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const storedEvent = this.navigationEvents.find(
          (nav) => nav.id === event.id
        );
        if (storedEvent) {
          console.log('Navigation abgeschlossen:', storedEvent);
          // Hier kannst du die Information nutzen, z.B. Fragment oder Scrollposition verarbeiten
          if (storedEvent.scrollPositionRestoration) {
            console.log('Scrollposition sollte wiederhergestellt werden');
          }
        }
      });

    this.router.events
      .pipe(filter((event): event is Scroll => event instanceof Scroll))
      .subscribe((event: Scroll) => {
        console.log('AAAAAAAAAAAAAAAAAAAA', event.routerEvent);

        if (event.routerEvent instanceof NavigationEnd) {
          console.log('BBBBBBBBBBBBBBBBBBBBBBB', event.routerEvent);

          // if (
          //   event.routerEvent. ||
          //   (event.routerEvent.url === '/' &&
          //     event.routerEvent.urlAfterRedirects === '/')
          // ) {

          // Überprüfen, ob das NavigationEnd-Event zu einem der gespeicherten NavigationStart-Events gehört
          const matchingStartEvent = this.navigationEvents.find(
            (startEvent) => startEvent.id === event.routerEvent.id
          );

          if (matchingStartEvent) {
            console.log(
              `NavigationEnd für eine Browser-Navigation (Back/Forward/Direct) erkannt. Trigger: ${matchingStartEvent.trigger}`
            );
            // Optional: Entferne das Event aus der Liste, wenn es verarbeitet wurde
            this.navigationEvents = this.navigationEvents.filter(
              (e) => e.id !== event.routerEvent.id
            );

            console.log('CCCCCCCCCCCCCCCCCCCCCCC', event.routerEvent);

            if (event.routerEvent.url === event.routerEvent.urlAfterRedirects) {
              this.lastSetTimeOut = setTimeout(() => {
                clearTimeout(this.lastSetTimeOut);

                let scrollYPosition = 0;

                if (!event.anchor) {
                  if (event.position === null) window.scrollTo(0, 0);
                  else window.scrollTo(0, 0);
                } else {
                  if (
                    event.position === null ||
                    event.position === undefined ||
                    event.position[1] === 0
                  ) {
                    scrollYPosition = 0;
                  } else {
                    console.log(
                      'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYyyy'
                    );

                    const element = document.getElementById(event.anchor);

                    console.log('ELEMENT IS: ', element);

                    let elementTop = element?.getBoundingClientRect().top;

                    console.log('ELEMENT TOOOOOOP IS: ', elementTop);

                    if (elementTop === undefined) elementTop = 0;

                    // console.log('SCROLL Y AMOUNTTTTTT IS: ', scrollYAmount);

                    element?.scrollIntoView();
                    setTimeout(() => {
                      if (element)
                        if (!this.isFragmentAtTop(element, 1)) {
                          // element?.scrollIntoView();
                        }
                    }, 50);
                  }
                }
              }, 50);
            }
          }
        }
      });

    this.router.events
      .pipe(
        filter((event): event is Scroll => event instanceof Scroll) // Filtert nur Scroll-Events
        // filter((event: Scroll) => {
        //   // Prüfen, ob das routerEvent ein NavigationEnd ist und kein NavigationSkipped
        //   return (
        //     event.routerEvent instanceof NavigationEnd &&
        //     !(event.routerEvent instanceof NavigationSkipped)
        //   );
        // })
      )
      .subscribe((event: Scroll) => {
        if (this.checkBrowserNavigationResult && !event.position) {
          console.log(
            'ZZZZZZZZZZZZZZZZZZZZZZZZScroll event with NavigationEnd: ',
            event.routerEvent
          );

          if (event.routerEvent instanceof NavigationEnd) {
            // if (event.routerEvent.url === event.routerEvent.urlAfterRedirects) {
            //   this.lastSetTimeOut = setTimeout(() => {
            //     clearTimeout(this.lastSetTimeOut);
            //     let scrollYPosition = 0;
            //     if (!event.anchor) {
            //       if (event.position === null) window.scrollTo(0, 0);
            //       else event.position[1] = 0;
            //     } else {
            //       if (
            //         event.position === null ||
            //         event.position === undefined ||
            //         event.position[1] === 0
            //       ) {
            //         scrollYPosition = 0;
            //       } else {
            //         console.log(
            //           'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYyyy'
            //         );
            //       }
            //     }
            //   }, 50);
            // }
          }
          // if(event.routerEvent.ur)

          if (this.checkBrowserNavigationResult) {
          }
          // Deine Logik hier
        }
      });

    // this.router.events
    //   .pipe(filter((event): event is Scroll => event instanceof Scroll))
    //   .subscribe((event: Scroll) => {
    //     if (this.checkBrowserNavigationResult && !event.position) {
    //       //   if (!event.anchor) {
    //       //     console.log('XXXX !event.anchor');
    //       //     window.scrollTo(0, 0);
    //       //     return;
    //       //   } else {
    //       //     console.log('XXXX !event.anchor');
    //       //     // let abc = event as unknown as Event;
    //       //     abc.preventDefault();
    //       //   }
    //       // }

    //       // if (this.lastScroll) {
    //       //   debugger;

    //       //   // this.lastElement = document.getElementById(this.lastFragment);

    //       //   if (this.lastFragment) {
    //       //     if (this.lastElement) {
    //       //       if (!this.isFragmentAtTop(this.lastElement)) {
    //       //         if (this.lastElement) {
    //       //           this.scrollToFragment(this.lastElement);
    //       //           this.lastScroll = false;
    //       //         }
    //       //       }
    //       //     }
    //       //   } else {
    //       //     if (event.position) {
    //       //       if (event.position[1] !== null && event.position[1] > 0) {
    //       //         // if(this.lastFragment) {

    //       //         //   if (this.lastElement !== null) {
    //       //         //    const scrolly = this.lastElement.getBoundingClientRect();

    //       //         //   }}

    //       //         event.position[1] = 0;
    //       //         // if(this.lastElement)
    //       //         // else event.position[1]
    //       //         // window.scrollTo(0, 0);
    //       //       }
    //       //     }
    //       //   }

    //       console.log('TUTAJ');

    //       console.log('position ', event.position);
    //       console.log('routerEvent ', event.routerEvent);
    //       console.log('type ', event.type);
    //       console.log('toString ', event.toString());
    //     }
    //   });
    // window.addEventListener('scroll', (event) => {
    //   // if (this.adjusted) event.preventDefault();

    //   console.log(']]]]]]]]]] SCROLL EVENT EMPFANGEN');
    //   // debugger;
    //   // Prüfe, ob es sich um das benutzerdefinierte Scroll-Event handelt
    //   // if (this.isMyCustomScrollEvent(event)) {
    //   //   console.log('Custom Scroll-Event erkannt und zugelassen');
    //   // } else {
    //   //   event.preventDefault(); // Verhindere andere Scroll-Events
    //   //   console.log('Externes/natives Scrollen blockiert');
    //   // }

    //   // const fragment: string = this.router.url.split('#')[1] || '';
    //   // const element: HTMLElement | null = document.getElementById(fragment);
    //   // if (element) this.lastFragment = element;
    //   // // Am Ende des Scroll-Events überprüfen, ob das Fragment korrekt positioniert ist
    //   // if (this.lastFragment && !this.isFragmentAtTop(this.lastFragment)) {
    //   //   console.log(
    //   //     'Fragment ist nicht am oberen Rand. Erneutes Scrollen erforderlich.'
    //   //   );
    //   //   this.scrollToFragment(this.lastFragment); // Erneutes Scrollen
    //   // }
    // });

    window.onload = () => {
      console.log('Window fully loaded, including images.');
    };

    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        console.log('Document readyState is complete.');
      }
    };

    translate.setDefaultLang('en');
    translate.use('en');
  }

  // Methode zur Überprüfung, ob es eine Browser-Navigation war
  private getNavigationType(event: NavigationStart): string {
    if (event.navigationTrigger === 'imperative') {
      return 'Code-Navigation';
    } else if (event.navigationTrigger === 'popstate') {
      return 'Browser-Navigation (Vor-/Zurück-Taste oder direkte Eingabe)';
    } else if (event.navigationTrigger === 'hashchange') {
      return 'Navigation durch Änderung des URL-Hashs';
    }
    return 'Unbekannt';
  }

  // Methode zur Überprüfung, ob die URL ein Fragment (#) enthält
  private hasFragment(event: NavigationStart): boolean {
    return event.url.includes('#');
  }

  // // Methode zur Überprüfung, ob die Scrollposition wiederhergestellt werden soll
  // private shouldRestoreScrollPosition(event: NavigationStart): boolean {
  //   // Hier kannst du deine eigene Logik einbauen. Standardmäßig wird dies in Angular durch die Router-Einstellung `scrollPositionRestoration: 'enabled'` gesteuert.
  //   // Hier nehmen wir an, dass wir manuell entscheiden wollen, ob die Scrollposition basierend auf dem Event wiederhergestellt werden soll.
  //   return (
  //     this.router.getCurrentNavigation()?.extras?. ===
  //     'enabled'
  //   );
  // }

  private scrollToFragment(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    const currentY = rect.top; // Position relativ zum Viewport

    // Füge eine eindeutige Scroll-ID hinzu (z.B. Timestamp)
    // this.scrollId = Date.now().toString();
    // Erzeuge und löse das Custom Scroll-Event aus
    // debugger;

    // Führe das Scrollen aus und löse das Custom-Event aus
    // window.scrollBy(0, scrollYAmount);
    this.navMenuService.setScrollBehavior('auto');
    element.scrollIntoView();
    // window.dispatchEvent(new CustomScrollEventWithId(this.scrollId, true)); // Löst das benutzerdefinierte Scroll-Event aus
    // this.custromScrollWithIdFired = true;

    this.lastCheckInterval = setTimeout(() => {
      clearTimeout(this.lastCheckInterval);

      if (this.lastElement) {
        if (!this.isFragmentAtTop(this.lastElement))
          this.scrollToFragment(this.lastElement);
        else {
          this.subScroll.unsubscribe();
        }
      }

      this.adjusted = false;
    }, 100);
  }

  private stableCounter = 0;

  lastCheckInterval: any;

  // Diese Funktion überprüft regelmäßig, ob noch Tasks anstehen
  checkIfZoneTrulyStable() {
    this.lastCheckInterval = setInterval(() => {
      console.log('Checking zone stability...');
      if (
        !this.ngZone.hasPendingMacrotasks &&
        !this.ngZone.hasPendingMicrotasks &&
        this.ngZone.isStable
      ) {
        console.log('NgZone is fully stable. No more tasks.');

        this.performFinalActions(); // Dein endgültiger Code
      } else {
        console.log('Tasks still pending, waiting...');
      }
    }, 50); // Alle 50ms überprüfen
  }

  // Hier kannst du deine abschließende Logik einfügen
  performFinalActions() {
    console.log('Performing final actions now that the app is stable.');
    // Hier z.B. das endgültige Setzen der Scroll-Position
  }
  counter_afterRender = 0;
  counter_afterNextRender = 0;
  counter_onMicrotaskEmpty = 0;
  counter_onStable = 0;
  counter_Scroll = 0;
  counter_Activated = 0;

  navEnde: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private checkBrowserNavigationResult: Boolean = false;

  targetUrl = '';
  // Array zum Speichern von Navigation-Informationen
  navigationEvents: any[] = [];

  // Überprüft, ob das NavigationStart-Event durch Back/Forward/Direct ausgelöst wurde
  private isBrowserNavigation(event: NavigationStart): boolean {
    return (
      event.navigationTrigger === 'popstate' || // Back/Forward im Browser
      (event.navigationTrigger === 'imperative' && !event.restoredState) // Direkte URL-Eingabe oder erstes Laden
    );
  }

  ngOnInit(): void {
    this.ngZone.onStable.subscribe(() => {
      console.log('}}} ___ onStable ', this.counter_onStable++);
      if (this.checkBrowserNavigationResult) {
      }
    });

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationStart => event instanceof NavigationStart
        )
      )
      .subscribe((event: NavigationStart) => {
        if (this.isBrowserNavigation(event)) {
          // Speichere relevante NavigationStart-Events, nachdem überprüft wurde, dass ID und navigationTrigger definiert sind
          if (event.id && event.navigationTrigger !== undefined) {
            this.navigationEvents.push({
              id: event.id,
              trigger: event.navigationTrigger,
            });
          }
        }
        // lastUrlNavStart: this.router.url;

        this.lastUrl = this.router.url;
        this.targetUrl = event.url;

        if (!this.firstNavStart) this.firstNavStart = true;
        // this.navMenuService.applyFullHeightScrollStyle();
        // this.navMenuService.setScrollBehavior('auto');
        this.isRouteValid = this.routeValidationService.isRouteValid();

        this.checkBrowserNavigationResult = this.checkBrowserNavigation(event);

        if (this.lastUrl !== '/legal-notice') {
          this.navMenuService.setScrollBehavior('smooth');
          console.log('fall 1');

          if (event.url === '/legal-notice') {
            // this.navMenuService.saveMainElementScrollPosition();

            this.navMenuService.setScrollBehavior('auto');

            console.log('fall 3');
          }
        }
        if (this.lastUrl == '/legal-notice') {
          if (!this.routeValidationService.getNavigationTriggedFromNavMemu())
            this.navMenuService.setScrollBehavior('auto');
          else this.navMenuService.setScrollBehavior('smooth');
          console.log('fall 2');
        }

        // Überwache isStable Property von ApplicationRef
        // debugger;
        console.log(
          '!!! checkBrowserNavigationResult !!!',
          this.checkBrowserNavigationResult
        );

        if (this.checkBrowserNavigationResult) {
          this.checkBrowserNavigationResult == false;

          // debugger;
          this.lastFragment = this.router.url.split('#')[1];

          // if (this.lastFragment) {
          //   this.lastElement = document.getElementById(this.lastFragment);
          // }
          // if (element) this.lastFragment = element;
          // Am Ende des Scroll-Events überprüfen, ob das Fragment korrekt positioniert ist

          if (this.lastElement && !this.isFragmentAtTop(this.lastElement)) {
            this.adjusted = true;

            this.subScroll = this.appRef.isStable.subscribe((isStable) => {
              this.stableCounter++;
              // if (isStable && this.stableCounter !== 0) {
              console.log(
                'OOOOOOOOOOOOOOOOOOO _______________ Application is completely stable.'
              );
              this.stableCounter += 1; // Zähler, um sicherzustellen, dass nur einmal reagiert wird
              // Starte die regelmäßige Abfrage
              // debugger;

              if (this.lastElement !== null)
                this.scrollToFragment(this.lastElement); // Erneutes Scrollen
            });
          }
        }

        // }
      });

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        if (
          this.checkBrowserNavigationResult &&
          event.url === event.urlAfterRedirects
        ) {
          this.lastScroll = true;
          console.log('HIERRRRRRRRRRRR');
        }
      });
  }

  lastFragment!: string;

  lastScroll = false;

  lastUrlNavStart: string = '';
  adjusted: boolean = false;

  navigationEndAfterUrlChanged: false = false;

  private subScroll!: Subscription;
  log(test?: string) {
    console.log('}}} ___ onStable ', this.counter_Activated++);
  }

  firstNavStart: boolean = false;

  private checkBrowserNavigation(event: NavigationStart): boolean {
    // debugger;
    let result = false;

    if (this.routeValidationService.getNavigationTriggedFromNavMemu())
      result = false;
    else if (
      (event.navigationTrigger === 'imperative' && event.id === 1) ||
      (event.navigationTrigger === 'imperative' &&
        event.restoredState === null) ||
      (event.navigationTrigger === 'imperative' &&
        event.restoredState === undefined) ||
      (event.navigationTrigger === 'popstate' &&
        event.restoredState?.navigationId) ||
      (event.navigationTrigger === 'imperative' && event.id === 1)
    ) {
      console.log('[][][] Direkte URL-Eingabe erkannt.');
      result = true;
    } else if (
      (event.navigationTrigger === 'popstate' &&
        event.restoredState === null) ||
      (event.navigationTrigger === 'popstate' &&
        event.restoredState === undefined)
    ) {
      console.log('[][][ Vorwärts-/Zurück-Navigation erkannt.');
      result = false;
    }

    console.log(
      '[][][][][][][][][][][][][][][][] checkBrowserNavigation RESULT: ',
      result,
      event
    );

    return result;
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}
