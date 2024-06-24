import {
  Directive,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[scrollSpy]', // Directive selector to be used in the template
})
export class ScrollSpyDirective {
  // Input property to receive an array of tag names to spy on
  @Input() public spiedTags: string[] = [];

  // Output property to emit the current section's ID when it changes
  @Output() public readonly sectionChange: EventEmitter<string> =
    new EventEmitter<string>();

  // Variable to keep track of the current section
  private currentSection: string = '';

  // Injecting ElementRef to get a reference to the host element
  constructor(private elementRef: ElementRef) {}

  // Listen for scroll events on the window
  @HostListener('window:scroll', ['$event'])
  public onScroll(event: any): void {
    // Variable to keep track of the currently visible section
    let currentSection: string = '';
    // Variable to keep track of the maximum visible height
    let maxVisibleHeight: number = 0;

    // Get the children elements of the host element
    const children: HTMLCollection = this.elementRef.nativeElement.children;

    // Iterate over the children elements
    for (let i = 0; i < children.length; i++) {
      const element: HTMLElement = children[i] as HTMLElement;

      // Check if the element's tag name is in the spiedTags array
      if (this.spiedTags.some((spiedTag) => spiedTag === element.tagName)) {
        // Get the bounding rectangle of the element
        const rect: DOMRect = element.getBoundingClientRect();
        // Calculate the visible height of the element
        const visibleHeight: number =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

        // Check if this element has more visible height than the previous maximum
        if (visibleHeight > maxVisibleHeight) {
          // Set the maximal visible height  to the visible height of the iterated element.
          maxVisibleHeight = visibleHeight;
          // Set the current section to the element's ID
          currentSection = element.id;
        }
      }
    }

    // If the current section has changed, set and emit the new section ID
    if (currentSection !== this.currentSection) {
      this.currentSection = currentSection;
      this.sectionChange.emit(this.currentSection);
      // TODO: delete later
      // Log the current section for debugging
      console.log('currentSection:', currentSection);
    }
  }
}
