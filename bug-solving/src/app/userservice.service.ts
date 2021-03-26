import { Injectable } from '@angular/core';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { v4 as uuidv4 } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
// import 'firebaseui/dist/firebaseui.css'
@Injectable({
  providedIn: 'root',
})
export class UserserviceService implements OnInit {
  emailid: any;
  user = {
    user_id: '',
    username: '',
    image:"",
    email:'',
  };
  uuid: any;
  val: any;
  issue: any;
  currentuser: any;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public router: Router
  ) {
    this.project();
    this.issuelist();
    this.afAuth.authState.subscribe(
      (user) => {
        if (user) {
          this.currentuser = user;
          this.userlogin();
          // console.log('AUTHSTATE USER', user.uid);
        } else {
          // console.log('AUTHSTATE USER EMPTY', user);
        }
      },
      (err) => {
        console.log('Please try again');
      }
    );
  }
  ngOnInit(): void {
    
  }

  //user login
  onlogin() {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/project',
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  //user login details store
  userlogin() {
    this.user.user_id=this.currentuser.uid;
    this.user.username=this.currentuser.displayName;
    this.user.image=this.currentuser.photoURL;
    this.user.email=this.currentuser.email;

        this.firestore
          .collection('users')
          .doc(this.currentuser.uid)
          .set(this.user)
          .then(() => {
            // console.log('user sucessfully added');
          })
          .catch((error: any) => {
            console.log(error);
          });
  }
  //get issue list
  issuelist() {
    this.firestore
      .collection('issues')
      .valueChanges()
      .subscribe(
        (issue) => {
          this.issue = issue;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  //get project details
  project() {
    this.firestore
      .collection('project')
      .valueChanges()
      .subscribe(
        (val) => {
          this.val = val;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  //submit the issue form
  onsubmit(data: any) {
    this.firestore
      .collection('issues')
      .doc(data.issue_id)
      .set(data)
      .then(() => {
        // this.userlogin(data.user_id);
        alert('document sucessfully added');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //function for logout
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('sucessfully signout');
        this.router.navigate(['project']);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  //create new project
  createproject(data: any) {
    console.log(data);
    this.firestore
      .collection('project')
      .doc(data.project_id)
      .set(data)
      .then(() => {
        alert('project added sucessfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
