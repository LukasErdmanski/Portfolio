import { Injectable } from '@angular/core';

type SelectorGroups = {
  basicSelectors: string[];
  complexSelectors: string[];
};

/**
 * Service to handle the removal of hover styles for touch devices.
 */
@Injectable({
  providedIn: 'root',
})
export class HoverStyleService {
  constructor() {
    this.disableHoverOnTouchDevices();
  }

  /**
   * Disables hover styles on touch devices.
   */
  private disableHoverOnTouchDevices(): void {
    if (this.getIfDeviceIsMobileOrTablet()) {
      this.removeHoverStyles();
    }
  }

  /**
   * Checks if the device is mobile or tablet.
   * @returns {boolean} Returns true if the device is mobile or tablet, otherwise false.
   */
  private getIfDeviceIsMobileOrTablet(): boolean {
    const isCoarsePointer = window.matchMedia('(any-pointer: coarse)').matches;
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUserAgent =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|windows phone|tablet/i.test(
        userAgent
      );

    return isCoarsePointer || isTouchDevice || isMobileUserAgent;
  }

  /**
   * Removes all hover styles from all stylesheets.
   */
  private removeHoverStyles(): void {
    const styleSheets: StyleSheetList = document.styleSheets;

    for (let i = 0; i < styleSheets.length; i++) {
      const sheet: CSSStyleSheet = styleSheets[i];
      const rulesToModify = this.getRulesFromSheetToModify(sheet);

      for (const { rule, index } of rulesToModify.reverse()) {
        const selectorGroups = this.getSelectorGroups(rule);

        if (
          selectorGroups.basicSelectors.length === 0 &&
          selectorGroups.complexSelectors.length === 0
        ) {
          sheet.deleteRule(index);
        } else {
          const newRule = this.getNewRule(rule, selectorGroups);
          this.updateSheetWithNewRule(sheet, index, newRule);
        }
      }
    }
  }

  /**
   * Gets the rules that need to be modified.
   * @param sheet - The stylesheet to be processed.
   * @returns Array of rules and their indices to be modified.
   */
  private getRulesFromSheetToModify(
    sheet: CSSStyleSheet
  ): Array<{ rule: CSSStyleRule; index: number }> {
    const rulesToModify: Array<{ rule: CSSStyleRule; index: number }> = [];
    const cssRules: CSSRuleList = sheet.cssRules;

    for (let j = 0; j < cssRules.length; j++) {
      const rule: CSSStyleRule = cssRules[j] as CSSStyleRule;
      if (rule.selectorText && rule.selectorText.includes(':hover')) {
        rulesToModify.push({ rule, index: j });
      }
    }

    return rulesToModify;
  }

  /**
   * Gets the groups of selectors for creating a new rule.
   * @param rule - The CSS rule to be processed.
   * @returns Groups of selectors for the new rule.
   */
  private getSelectorGroups(rule: CSSStyleRule): SelectorGroups {
    const selectors = rule.selectorText.split(',');

    const complexSelectors = selectors.filter((sel) => sel.includes(':hover:'));
    const basicSelectors = selectors.filter((sel) => !sel.includes(':hover'));

    return {
      basicSelectors: basicSelectors,
      complexSelectors: complexSelectors,
    };
  }

  /**
   * Creates a new rule without the hover selectors.
   * @param rule - The CSS rule to be processed.
   * @param selectorGroups - The groups of selectors for the new rule.
   * @returns A new CSS rule string.
   */
  private getNewRule(
    rule: CSSStyleRule,
    selectorGroups: SelectorGroups
  ): string {
    let newRule = '';

    if (selectorGroups.basicSelectors.length > 0) {
      newRule = `${selectorGroups.basicSelectors.join(',')} { ${
        rule.style.cssText
      } }`;
    }

    if (selectorGroups.complexSelectors.length > 0) {
      const preservedSelectors = selectorGroups.complexSelectors.map((sel) =>
        sel.replace(':hover', '')
      );
      newRule += `${preservedSelectors.join(',')} { ${rule.style.cssText} }`;
    }

    return newRule;
  }

  /**
   * Updates the stylesheet with the new rule.
   * @param sheet - The stylesheet to be updated.
   * @param ruleIndex - The index at which to insert the new rule.
   * @param newRule - The new rule string to be inserted.
   */
  private updateSheetWithNewRule(
    sheet: CSSStyleSheet,
    ruleIndex: number,
    newRule: string
  ): void {
    try {
      sheet.insertRule(newRule, ruleIndex);
      sheet.deleteRule(ruleIndex + 1);
    } catch (e) {
      console.error(`Failed to insert rule: ${newRule}`, e);
    }
  }
}
