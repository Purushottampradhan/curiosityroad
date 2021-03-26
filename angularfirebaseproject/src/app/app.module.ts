import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field"
// import{MatInputModule} from "@angular/material/input";
import { MatInputModule } from '@angular/material/input';
import{ MatIconModule} from "@angular/material/icon"
import {MatButtonModule} from "@angular/material/button";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component'
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';

import { ProductComponent } from './product/product.component';
import{MatSelectModule} from "@angular/material/select"
import{AngularFireStorageModule} from "@angular/fire/storage"
import{AngularFireDatabaseModule} from "@angular/fire/database"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatSidenavModule} from "@angular/material/sidenav";
import { HomeComponent } from './home/home.component';
import {MatCardModule} from "@angular/material/card";
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NavbarComponent } from './navbar/navbar.component'
import {MatCarouselModule} from "@ngmodule/material-carousel";
import { CarouselComponent } from './carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    SignupComponent,
    ProductComponent,
    HomeComponent,
    ProductdetailsComponent,
    NavbarComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatCarouselModule.forRoot(),
    NgbModule,
 
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
function firebaseUIAuthConfig(firebaseUIAuthConfig: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

