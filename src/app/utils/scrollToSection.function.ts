/**
 * Scrolls to the section specified by the given id.
 * @param section The id of the section to scroll to.
 */
export function scrollToSection(section: string): void {
  const element = document.querySelector('#' + section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  console.log('CLICKED SCROLL TO #', section);
}
