import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
// import firebase from 'firebase/app';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { IssueformComponent } from './issueform/issueform.component';

// angular material start
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCardModule} from "@angular/material/card"
import {MatSnackBarModule} from "@angular/material/snack-bar"
// import{} from "@angular/material/"
//angular mateial end

//bootstrap

//angular form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenaveComponent } from './sidenave/sidenave.component';
import { ProjectComponent } from './project/project.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { IssuedetailComponent } from './issuedetail/issuedetail.component';
//form end

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NavbarComponent,
    IssueformComponent,
    SidenaveComponent,
    ProjectComponent,
    CreateprojectComponent,
    RoadmapComponent,
    IssuedetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
function firebaseUIAuthConfig(
  firebaseUIAuthConfig: any
):
  | any[]
  | import('@angular/core').Type<any>
  | import('@angular/core').ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}
