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
import { provideRouter, RouterOutlet } from '@angular/router';
import { LandingpagesComponent } from './landingpages/landingpages.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [AppComponent, ConnectionComponent, InscriptionComponent, LandingpagesComponent, MainPageComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterOutlet,
    MatCardModule,
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
    provideFirestore(() => getFirestore())
   ],
  providers: [
  
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
