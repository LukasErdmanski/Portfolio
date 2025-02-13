import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';
import { VALID_FRAGMENTS } from '../app-routing.module';

/**
 * A service responsible for validating routes and URL fragments in the Angular application.
 * It checks whether the current route exists and validates URL fragments for correct section IDs.
 *
 * The service is provided at the root level, making it globally accessible throughout the app.
 */
@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}
  /**
   * Checks if the current route and fragment (if any) are valid.
   * If the route or fragment is invalid, it returns false.
   *
   * @returns boolean True if the route and fragment are valid, otherwise false.
   */
  public isRouteValid(): boolean {
    /*
     * `this.router.url.split('#')` splits the URL into the base route and the fragment (if present).
     * The base route is extracted by removing the fragment and the leading '/'.
     */
    const [basePath, fragment]: string[] = this.router.url.split('#');
    const strippedBasePath: string = basePath.slice(1); // Remove the leading slash

    /*
     * `this.router.config.find()` searches the router configuration for a matching base path.
     * If a matching path is found, a `Route` object is returned; otherwise, `undefined`.
     */
    const matchingRoute: Route | undefined = this.router.config.find(
      (route) =>
        route.path === strippedBasePath ||
        (route.path === '' && !strippedBasePath)
    );

    /*
     * If no matching route is found, return false and consider the route invalid.
     */
    if (!matchingRoute) {
      return false;
    }

    /*
     * If a fragment exists, validate whether it's one of the known valid sections.
     * If no fragment is present or it's valid, the route is considered valid.
     */
    const isFragmentValid = !fragment || this.isValidFragment(fragment);
    return isFragmentValid; // True if both route and fragment are valid
  }

  /**
   * Validates if the provided fragment matches one of the known valid sections.
   *
   * @param fragment The fragment part of the URL (e.g., 'portfolio', 'contact').
   * @returns boolean True if the fragment is valid, otherwise false.
   */
  private isValidFragment(fragment: string): boolean {
    return VALID_FRAGMENTS.includes(fragment);
  }

  private windowScrollYPosition: number = 0;

  getWindowScrollYPosition(): number {
    return this.windowScrollYPosition;
  }

  setWindowScrollYPosition(): void {
    this.windowScrollYPosition = window.scrollY;
    console.log('setWindowScrollYPosition: ', this.windowScrollYPosition);
  }

  private navigationTriggedFromNavMemu: boolean = false;

  setNavigationTriggedFromNavMemu(inputValue: boolean): void {
    this.navigationTriggedFromNavMemu = inputValue;
  }

  getNavigationTriggedFromNavMemu(): boolean {
    return this.navigationTriggedFromNavMemu;
  }

  // Methode für die Navigation, mit optionalem Fragment
  navigate(url: string, fragment?: string) {
    let fullUrl = url;

    // Wenn ein Fragment angegeben wird, füge es zur URL hinzu
    if (fragment) {
      fullUrl = `${url}#${fragment}`;
    }

    // Nutze Angulars Router, um zur URL zu navigieren
    this.router.navigateByUrl(fullUrl, {
      state: { navigationType: 'programmatic' }, // Programmatic Navigation Marker
    });
  }
}
