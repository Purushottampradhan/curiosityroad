import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {AngularFireAuthModule} from 'firebase/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFireAuthModule} from "@angular/fire/auth"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUuPlnGCCgMtnLNyBi3pu7fDKf0F_Uj0g",
  authDomain: "shoping-card-bc6da.firebaseapp.com",
  projectId: "shoping-card-bc6da",
  storageBucket: "shoping-card-bc6da.appspot.com",
  messagingSenderId: "240967953814",
  appId: "1:240967953814:web:1ec47b72e01d3e2ba201b7",
  measurementId: "G-L8BDW01K73"
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
