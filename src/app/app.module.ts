import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp({"projectId":"greenhouses-22f8b","appId":"1:208068475780:web:4a07690eb13b678788fbd1","storageBucket":"greenhouses-22f8b.firebasestorage.app","apiKey":"AIzaSyC-Df9l8wPkAuXnu7uJ5mQrCZ186OU64Mg","authDomain":"greenhouses-22f8b.firebaseapp.com","messagingSenderId":"208068475780"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"greenhouses-efa9b","appId":"1:228364984373:web:186b4265c8814a82c4517c","storageBucket":"greenhouses-efa9b.firebasestorage.app","apiKey":"AIzaSyDFQiwuILS9BpR4gR3b8K7Rlb0aMyNNYWI","authDomain":"greenhouses-efa9b.firebaseapp.com","messagingSenderId":"228364984373"}))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
