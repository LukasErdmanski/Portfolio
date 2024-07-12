import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { SocialsComponent } from './components/socials/socials.component';
import { HeaderComponent } from './components/header/header.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';

// Required for ngx-translate
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DOCUMENT } from '@angular/common';

/**
 * Factory function for the TranslateLoader.
 * This function creates a new instance of TranslateHttpLoader.
 * The loader will try to load translations using HttpClient.
 *
 * Here, we are dynamically determining the path to load translations based on the base href in the document.
 * This ensures that the translations path works both in local development and when deployed.
 *
 * @param http HttpClient instance to make network requests.
 * @param document An abstraction over the DOM document provided by Angular.
 * @returns An instance of TranslateHttpLoader.
 */
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient, document: any) {
  // Getting the base URL from the document or defaulting to the current directory.
  const baseHref = document.baseURI || './';
  // Using the base URL to create the full path for loading translations.
  return new TranslateHttpLoader(http, `${baseHref}assets/i18n/`, '.json');
}

@NgModule({
  declarations: [
    AboutMeComponent,
    AppComponent,
    ContactComponent,
    ContactFormComponent,
    FooterComponent,
    LegalNoticeComponent,
    HeaderComponent,
    NavmenuComponent,
    PortfolioComponent,
    SkillsComponent,
    SocialsComponent,
    MainContentComponent,
    LandingPageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // Required for ngx-translate.
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        // Specifying the factory function for the loader.
        useFactory: HttpLoaderFactory,
        // Specifying the dependencies required for the HttpLoaderFactory.
        // We need both HttpClient for network requests and DOCUMENT to get the base href.
        deps: [HttpClient, DOCUMENT],
      },
    }),
  ],
  providers: [provideAnimations(), provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
