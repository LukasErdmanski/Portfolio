import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedLanguageService {
  private currentLanguage: 'en' | 'de' = 'en';

  public getCurrentLanguage(): 'en' | 'de' {
    return this.currentLanguage;
  }

  public setCurrentLanguage(selectedLanguage: 'en' | 'de'): void {
    this.currentLanguage = selectedLanguage;
  }
}
