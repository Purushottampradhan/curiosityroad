import { ErrorHandler, Injectable } from '@angular/core';
// import auth from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebaseui from 'firebaseui';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  productdetails: AngularFireList<any> | undefined;
  isloggedin = false;
  ui = new firebaseui.auth.AuthUI(firebase.auth());
  userdata: any;
  opened = false;
  detail: any;
  data = {
    name: '',
    id: '',
    image: '',
    category: '',
    discription: '',
    price: '',
  };
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private firestore: AngularFirestore
  ) {}
  togglesidebar() {
    this.opened = !this.opened;
  }
  //sign in option 
  onlogin() {
    var uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/home',
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };
    this.isloggedin = true;
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }


  //get one product data using id 
  getone(id: any) {
    var docRef = this.firestore.collection('productdetails').doc(id);
    docRef.get().subscribe(
      (doc: any) => {
        if (doc.exists) {
          // this.detail = JSON.stringify(doc.data());
          this.detail = doc.data();
          this.data.name = this.detail.name;
          this.data.id = this.detail.id;
          this.data.category = this.detail.category;
          this.data.image = this.detail.image;
          this.data.discription = this.detail.discription;
          this.data.price = this.detail.price;
          console.log('Document data:', doc.data());
        } else {
          // alert('No document found!');
          this.router.navigate(['']);
        }
      },
      (err) => console.log(err)
    );
  }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new firebase.auth.GoogleAuthProvider()).catch((error)=>{console.log(error)});
  // }

  // Auth logic to run auth providers
  // AuthLogin(provider: any) {
  //   return this.afAuth.signInWithPopup(provider)
  //   .then((result: any) => {
  //     console.log()
  //       console.log('You have been successfully logged in!')
  //       this.router.navigate(['product'])
  //   }).catch((error: any) => {
  //       console.log(error)
  //   })
  // }

  //signin with email and password
  // onsignin(data: any) {
  //   this.afAuth
  //     .signInWithEmailAndPassword(data.email, data.password)
  //     .then((res) => {
  //       this.isloggedin = true;
  //       console.log('sucesfully logged in');
  //       this.isloggedin = true;
  //       this.router.navigate(['product']);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }
  // //sign up  with email and password
  // onsignup(data: any) {
  //   this.afAuth
  //     .createUserWithEmailAndPassword(data.email, data.password)
  //     .then((res) => {
  //       this.isloggedin = true;
  //       console.log('sucesfully created');
  //       this.router.navigate(['/signin']);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }
  //   //sign in with github
  //   githubAuth(){
  //     return this.githublogin(new firebase.auth.GithubAuthProvider());

  //   }
  //   //auth logic to run github provider
  // githublogin(provider:any){
  //     this.afAuth.signInWithPopup(provider)
  //     .then((result: any) => {
  //       // console.log()
  //         console.log('You have been successfully logged in!')
  //         this.router.navigate(['product'])
  //     }).catch((error: any) => {
  //         console.log(error.message)
  //     })
  //   }

  //   //sign in with facebook
  //   facbookAuth(){
  //     return this.facbooklogin(new firebase.auth.FacebookAuthProvider())
  //   }

  //   //auth logic to run facbook provider
  // facbooklogin(provider:any){
  //     this.afAuth.signInWithPopup(provider)
  //     .then((result: any) => {
  //       // console.log()
  //         console.log('You have been successfully logged in!')
  //         this.router.navigate(['product'])
  //     }).catch((error) => {
  //         console.log(error.message)
  //     })
  //   }

  //   //function for logout
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('sucessfully signout');
        this.isloggedin = false;
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
//submiting the product data
  onsubmit(data: any) {
    this.firestore
      .collection('productdetails')
      .doc(data.id)
      .set(data)
      .then(() => {
        // console.log(data.id)
        alert('document sucessfully added');
        // console.log('document sucessfully added');
        // location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
