/**
 * Scrolls to the section specified by the given id so that the section's top aligns with the top of the window.
 * @param section The id of the section to scroll to.
 */
export function scrollSectionToTop(section: string): void {
  const sectionElement = document.querySelector('#' + section);
  if (sectionElement) {
    const sectionElementTopPosition =
      sectionElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: sectionElementTopPosition, behavior: 'smooth' });
  }
  console.log('Clicked scrollSectionToTop for #', section);
}
