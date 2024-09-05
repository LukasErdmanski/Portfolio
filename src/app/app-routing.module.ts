import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  /**
   * When the path is completely empty (base URL), redirect to the 'start' route.
   * The 'pathMatch: full' ensures that the entire URL path needs to be empty to match this route.
   */
  {
    path: '',
    pathMatch: 'full',
    title: 'Lukas Erdmanski - Frontend Developer',
    component: MainContentComponent,
  },
  {
    path: 'legal-notice',
    title: 'Legal notice',
    component: LegalNoticeComponent,
  },
  { path: '**', title: 'Page Not Found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
