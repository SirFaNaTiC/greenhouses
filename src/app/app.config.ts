import { Routes } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { LandingpagesComponent } from './landingpages/landingpages.component';
import { InscriptionComponent } from './inscription/inscription.component';

export const routes: Routes = [
  { path: 'connection', component: ConnectionComponent },
  {path: 'inscription' , component: InscriptionComponent},
  { path:'', component: LandingpagesComponent}
];