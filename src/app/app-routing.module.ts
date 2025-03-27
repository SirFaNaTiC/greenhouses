import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpagesComponent } from './landingpages/landingpages.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnectionComponent } from './connection/connection.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { MainPageComponent } from './main-page/main-page.component';
import { TopicsComponent } from './topics/topics.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { PersonalGreenhousesComponent } from './personal-greenhouses/personal-greenhouses.component';
import { PlantsComponent } from './plants/plants.component';
import { InfosPlantesComponent } from './infos-plantes/infos-plantes.component';
import { TopicComponent } from './topic/topic.component';

const redirectLoggedInToItems = () => redirectLoggedInTo(['main-page']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['inscription']);

const routes: Routes = [
  { path: 'connection', component: ConnectionComponent, ...canActivate(redirectLoggedInToItems) },
  { path: 'inscription' , component: InscriptionComponent, ...canActivate(redirectLoggedInToItems)},
  { path: '', component: ConnectionComponent, ...canActivate(redirectLoggedInToItems)},
  { path: 'main-page', component: MainPageComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'topics', component: TopicsComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'favorite', component: FavoriteComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'greenhouses', component: PersonalGreenhousesComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'plants', component: PlantsComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'infosPlantes/:id', component: InfosPlantesComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'topic/:id', component: TopicComponent, ...canActivate(redirectUnauthorizedToLogin) }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
