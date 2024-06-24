import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: 'start-screen', pathMatch: 'full' },
  { path: ':sectionId', component: StartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
