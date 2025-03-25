import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpagesComponent } from './landingpages/landingpages.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnectionComponent } from './connection/connection.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { MainPageComponent } from './main-page/main-page.component';
import { TopicComponent } from './topic/topic.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { GreenhousesComponent } from './greenhouses/greenhouses.component';
import { PlantsComponent } from './plants/plants.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { InfosPlantesComponent } from './infos-plantes/infos-plantes.component';

const redirectLoggedInToItems = () => redirectLoggedInTo(['main-page']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['inscription']);

const routes: Routes = [
  { path: 'connection', component: ConnectionComponent, ...canActivate(redirectLoggedInToItems) },
  { path: 'inscription' , component: InscriptionComponent, ...canActivate(redirectLoggedInToItems)},
  { path: '', component: ConnectionComponent, ...canActivate(redirectLoggedInToItems)},
  { path: 'main-page', component: MainPageComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'landingpages', component: LandingpagesComponent, ...canActivate(redirectLoggedInToItems)},
  { path: 'topics', component: TopicComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'favorite', component: FavoriteComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'greenhouses', component: GreenhousesComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'plants', component: PlantsComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'comments', component: CommentaireComponent, ...canActivate(redirectUnauthorizedToLogin)},
    { path: 'infosPlantes', component: InfosPlantesComponent, ...canActivate(redirectUnauthorizedToLogin)}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
