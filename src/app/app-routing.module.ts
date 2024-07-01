import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

// The order of routes is important. Static routes should be defined before dynamic routes.
// If the order was reversed, 'legal-notice' would be interpreted as a 'sectionId' parameter,
// causing the wrong component to be displayed.
export const routes: Routes = [
  { path: '', redirectTo: 'start-screen', pathMatch: 'full' },
  // !Important: static route should be placed before dynamic routes
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: ':sectionId', component: StartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
