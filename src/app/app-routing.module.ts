import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnectionComponent } from './connection/connection.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { TopicsComponent } from './topics/topics.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { PersonalGreenhousesComponent } from './personal-greenhouses/personal-greenhouses.component';
import { PlantsComponent } from './plants/plants.component';
import { InfosPlantesComponent } from './infos-plantes/infos-plantes.component';
import { TopicComponent } from './topic/topic.component';
import { GreenhousesComponent } from './greenhouses/greenhouses.component';
import { TopicUpdateComponent } from './topic-update/topic-update.component';

const redirectLoggedInToItems = () => redirectLoggedInTo(['main-page']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['inscription']);

const routes: Routes = [
  { path: 'connection', component: ConnectionComponent, ...canActivate(redirectLoggedInToItems) },
  { path: 'inscription' , component: InscriptionComponent, ...canActivate(redirectLoggedInToItems)},
  { path: '', component: ConnectionComponent, ...canActivate(redirectLoggedInToItems)},
  { path: 'topics', component: TopicsComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'favorite', component: FavoriteComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'greenhouses', component: GreenhousesComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'plants', component: PlantsComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'infosPlantes/:id', component: InfosPlantesComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'topic/:id', component: TopicComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'personal-greenhouses/:name', component: PersonalGreenhousesComponent, ...canActivate(redirectUnauthorizedToLogin)},
  { path: 'topic-update/:id', component: TopicUpdateComponent, ...canActivate(redirectUnauthorizedToLogin)},
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}
