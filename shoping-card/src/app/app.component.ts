import { Component, OnInit, HostBinding  } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'shoping-card';
  provider: any;
  constructor(public afAuth: AngularFireAuth) {}
  ngOnInit(): void {
    // var provider = new firebase.default.auth.GoogleAuthProvider();
    // this.provider = provider;
  }

  signin() {
    // console.log("sign with google");
    firebase
      .auth()
      .signInWithPopup(this.provider)
      .then((result:any) => {
        var user = result.user;
        console.log(user);
      })
      .catch((error:any) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  // this.afAuth.si(new firebase.auth.GoogleAuthProvider());
}
