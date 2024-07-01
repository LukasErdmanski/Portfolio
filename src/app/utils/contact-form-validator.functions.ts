import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Name ValidatorFn
export function contactFormNameValidatorFn(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    // Check length
    if (value.length < 1 || value.length > 100) {
      return { invalidName: true };
    }

    // Check for script tags
    const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (scriptPattern.test(value)) {
      return { invalidName: true };
    }

    return null;
  };
}
// E-mail address ValidatorFn
export function contactFormEmailAddressValidatorFn(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    // Basic check for presence of "@" symbol
    if (!/@/.test(value)) {
      return { invalidEmail: true };
    }

    // Split the email into local and domain parts
    const [localPart, domain] = value.split('@');

    // If there's no domain part, it's invalid
    if (!domain) {
      return { invalidEmail: true };
    }

    // Convert domain to lowercase
    const normalizedDomain = domain.toLowerCase();

    // Regex for basic email validation with allowed special characters in local part
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Additional criteria
    // 1. Email length should not exceed 254 characters
    if (value.length > 254) {
      return { invalidEmail: true };
    }

    // 2. Local part should not exceed 64 characters
    if (localPart.length > 64) {
      return { invalidEmail: true };
    }

    // 3. Domain should not exceed 253 characters
    if (normalizedDomain.length > 253) {
      return { invalidEmail: true };
    }

    // 4. No special characters at the start or end of local part and domain
    if (
      /^[.\-\+]/.test(localPart) ||
      /[.\-\+]$/.test(localPart) ||
      /^[.\-]/.test(normalizedDomain) ||
      /[.\-]$/.test(normalizedDomain)
    ) {
      return { invalidEmail: true };
    }

    // 5. No consecutive dots in local part and domain
    if (/\.{2,}/.test(localPart) || /\.{2,}/.test(normalizedDomain)) {
      return { invalidEmail: true };
    }

    // 6. Check if the domain has at least one dot and characters after the last dot
    if (!/\.[a-zA-Z]{2,}$/.test(normalizedDomain)) {
      return { invalidEmail: true };
    }

    // 7. No spaces allowed in the email
    if (/\s/.test(value)) {
      return { invalidEmail: true };
    }

    // 8. No segments in the domain part should exceed 63 characters
    const domainSegments = normalizedDomain.split('.');
    if (domainSegments.some((segment: any) => segment.length > 63)) {
      return { invalidEmail: true };
    }

    // 9. Plus sign or hyphen not allowed at the start or end of the local part
    if (/^\+|\+$/.test(localPart) || /^-|-+$/.test(localPart)) {
      return { invalidEmail: true };
    }

    // 10. No excessive special characters in local part
    const excessiveSpecialCharsPattern = /[^a-zA-Z0-9]{3,}/;
    if (excessiveSpecialCharsPattern.test(localPart)) {
      return { invalidEmail: true };
    }

    // 11. Validate if domain part is a valid IP address
    const ipPattern =
      /^\[(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\]$/;
    const ipv6Pattern = /^\[[0-9a-fA-F:]+\]$/;
    if (
      ipPattern.test(normalizedDomain) ||
      ipv6Pattern.test(normalizedDomain)
    ) {
      return null; // If domain part is a valid IP address, it's valid
    }

    // 12. Ensure domain contains only valid characters (letters, numbers, hyphens, and dots)
    const domainCharsPattern = /^[a-zA-Z0-9.-]+$/;
    if (!domainCharsPattern.test(normalizedDomain)) {
      return { invalidEmail: true };
    }

    // Basic email pattern check
    return emailPattern.test(value) ? null : { invalidEmail: true };
  };
}

// Message Validator
export function contactFormMessageValidatorFn(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    // Check length
    if (value.length < 1 || value.length > 1000) {
      return { invalidMessage: true };
    }

    // Check for script tags
    const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (scriptPattern.test(value)) {
      return { invalidMessage: true };
    }

    return null;
  };
}
