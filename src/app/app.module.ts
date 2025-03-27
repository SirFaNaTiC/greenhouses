import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ConnectionComponent } from './connection/connection.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RouterOutlet } from '@angular/router';
import { LandingpagesComponent } from './landingpages/landingpages.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { TopicsComponent } from './topics/topics.component';
import { TopicService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite/favorite.component';
import { PlantsComponent } from './plants/plants.component';
import { InfosPlantesComponent } from './infos-plantes/infos-plantes.component';
import { GreenhousesComponent } from './greenhouses/greenhouses.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TopicComponent } from './topic/topic.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent, 
    InscriptionComponent, 
    LandingpagesComponent, 
    MainPageComponent, 
    HeaderComponent, 
    FavoriteComponent, 
    GreenhousesComponent, 
    PlantsComponent, 
    TopicComponent, 
    CommentaireComponent, 
    InfosPlantesComponent, 
    GreenhousesComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterOutlet,
    MatCardModule,
    MatProgressSpinnerModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'greenhouses-22f8b',
        appId: '1:208068475780:web:4a07690eb13b678788fbd1',
        storageBucket: 'greenhouses-22f8b.firebasestorage.app',
        apiKey: 'AIzaSyC-Df9l8wPkAuXnu7uJ5mQrCZ186OU64Mg',
        authDomain: 'greenhouses-22f8b.firebaseapp.com',
        messagingSenderId: '208068475780',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [TopicService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
