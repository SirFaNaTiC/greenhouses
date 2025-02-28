import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpagesComponent } from './landingpages/landingpages.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnectionComponent } from './connection/connection.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { MainPageComponent } from './main-page/main-page.component';

const redirectLoggedInToItems = () => redirectLoggedInTo(['main-page']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['inscription']);

const routes: Routes = [
  { path: 'connection', component: ConnectionComponent, ...canActivate(redirectLoggedInToItems) },
  { path: 'inscription' , component: InscriptionComponent, ...canActivate(redirectLoggedInToItems)},
  { path: '', component: LandingpagesComponent},
  { path: 'main-page', component: MainPageComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'landingpages', component: LandingpagesComponent, ...canActivate(redirectLoggedInToItems)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
