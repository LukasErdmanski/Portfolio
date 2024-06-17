import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, StartComponent, StartScreenComponent],
  imports: [AppRoutingModule, BrowserAnimationsModule, BrowserModule],
  providers: [provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
