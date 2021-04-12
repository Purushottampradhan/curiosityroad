import { Injectable } from '@angular/core';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { v4 as uuidv4 } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { identity, observable, Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import * as moment from 'moment'; //for date function
import db from 'firebase';
import { snapshotChanges } from '@angular/fire/database';

// import 'firebaseui/dist/firebaseui.css'
@Injectable({
  providedIn: 'root',
})
export class UserserviceService implements OnInit {
  //variables
  user = {
    user_id: '',
    username: '',
    image: '',
    email: '',
  };
  
  uuid: any; //this is unique id for issue id
  val: any; //details of the project
  issue: any; //store all isssue list
  currentuser: any; //store the current user logged in

  historydetails = {
    id: '',
    data: '',
    date: '',
    issue_id: '',
    user_id: '',
  }; //store the data of history

  commentdetails = {
    id: '',
    data: '',
    date: '',
    issue_id: '',
    user_id: '',
    comment_id: '',
  };

  commentdata: any;
  allhistory: any;
  userdetails: any;

  //end variables
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public router: Router
  ) {
    this.project();
    this.issuelist();
    this.afAuth.authState.subscribe(
      async (user) => {
        if (user) {
          this.currentuser = user;
          await this.userlogin();
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
  ngOnInit(): void {}

  //get comment reply
  getreply(comment_id: any) {
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('comment').where('comment_id', "==", `${comment_id}`).get().then((querySnapshot)=>{
        var reply: any = [];
        querySnapshot.forEach((doc)=>{
          reply.push(doc.data())
        })
        if(reply.length){
         // console.log(reply)
          resolve(reply)
        }
        else{
          reject("data not found")
        }
      })
    });
  }

  //add comment
  async comment() {
    this.commentdetails.id = uuidv4();
    this.commentdetails.user_id = this.user.user_id;
    this.commentdetails.date = moment().format('YYYY/MM/DD/HH/mm/ss');
    console.log(this.commentdetails);
    await this.firestore
      .collection('comment')
      .doc(this.commentdetails.id)
      .set(this.commentdetails)
      .then(() => {
        // console.log(this.commentdetails)
        this.commentdetails.comment_id = '';
        this.commentdetails.issue_id = '';
        console.log('comment added');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //get comment
  getcomment(issue_id: any) {
    return new Promise((resolve, reject) => {
      // console.log(issue_id)
     db.firestore()
        .collection('comment')
        .where('issue_id', '==', `${issue_id}`)
        .onSnapshot((querySnapshot) => {
          var comment: any = [];
          querySnapshot.forEach((doc) => {
            comment.push(doc.data());
          });
          if (comment.length) {
            // console.log("this is from comment service",comment)
            this.commentdata = comment;
            // return comment
            resolve(comment);
          } else {
            reject('no comment found ');
          }
        });
    });
  }

  //put history of issue
  async history(issue_id: any) {
    this.historydetails.id = uuidv4();
    this.historydetails.user_id = this.user.user_id;
    this.historydetails.date = moment().format('YYYY/MM/DD/HH/mm/ss');
    await this.firestore
      .collection('history')
      .doc(this.historydetails.id)
      .set(this.historydetails)
      .then(() => {
        // this.userlogin(data.user_id);
        // alert('history sucessfully added');
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log('after added history');
  }

  //get all history of selected issue
  gethistory(issue_id: any) {
    // console.log(issue_id)
    return new Promise((resolve, reject) => {
      firebase.firestore().collection('history').where('issue_id', "==", `${issue_id}`).get().then((querySnapshot)=>{
        var history: any = [];
        querySnapshot.forEach((doc)=>{
          history.push(doc.data())
        })
        if(history.length){
         // console.log(reply)
          resolve(history)
        }
        else{
          reject("data history  not found")
        }
      })
    });
  }
  

  // example(data:any){
  //   console.log( "this is from example function",data)
  // }

  // example(issue_id:any){
  //  return new Promise((resolve,reject)=>{
  //    this.firestore.collection('history').doc(issue_id).collection('historydetails').snapshotChanges().subscribe((details)=>{
  //     //  console.log(details)
  //      var arr:any=[];
  //     details.forEach((snap)=>{
  //       // console.log(snap.type=='added')
  //       arr.push(snap.payload.doc.data())
  //       // console.log(snap.payload.doc.data())

  //     })
  //     // console.log(arr)
  //     if(arr){
  //       this.allhistory=arr
  //       resolve(arr)
  //     }
  //     else{
  //       reject("no history found")
  //     }

  //    })

  //  })
  // }

  //user login ui
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
  async userlogin() {
    this.user.user_id = this.currentuser.uid;
    this.user.username = this.currentuser.displayName;
    this.user.image = this.currentuser.photoURL;
    this.user.email = this.currentuser.email;
    await this.firestore
      .collection('users')
      .doc(this.currentuser.uid)
      .set(this.user)
      .then(() => {
        // console.log('user sucessfully added');
      })
      .catch((error: any) => {
        console.log(error);
      });
    // console.log('user created');
  }

  //get one issue from selected list
  getone(id: any) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('issues')
        .doc(id)
        .valueChanges()
        .subscribe((data) => {
          if (data) {
            resolve(data);
          } else {
            reject('no issue found');
          }
        });
    });
  }

  //get  user details
  getuser() {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('users')
        .valueChanges()
        .subscribe(async (data: any) => {
          if (data) {
            this.userdetails = await data;
            // console.log(this.userdetails);
            resolve(data);
            // return this.userdetails
          } else {
            reject('no data found');
          }
        });
    });
  }

  //get one project details
  getproject(id: any) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('project')
        .doc(id)
        .valueChanges()
        .subscribe((data) => {
          if (data) {
            resolve(data);
          } else {
            reject('no project data found');
          }
        });
    });
  }

  //get all issue list
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

  //get all project details
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
  async onsubmit(data: any) {
    await this.firestore
      .collection('issues')
      .doc(data.issue_id)
      .set(data)
      .then(async () => {
        // this.userlogin(data.user_id);
        this.historydetails.issue_id = data.issue_id;
        this.historydetails.data = 'issue created';
        // console.log(moment().format('YYYYMMDDHHmmss'))
        await this.history(data.issue_id);
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
  async createproject(data: any) {
    console.log(data);
    await this.firestore
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

  //delete the issue
  async deleteissue(id: any) {
    let r = confirm('do you want to delete');
    if (r) {
      await this.firestore
        .collection('issues')
        .doc(id)
        .delete()
        .then(() => {
          console.log('issue deleted sucesfully ');
        })
        .catch((error) => {
          console.log('error removing issue', error);
        });
    } else {
      console.log('you select cancle');
    }
  }
}
