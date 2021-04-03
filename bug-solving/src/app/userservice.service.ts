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

// import 'firebaseui/dist/firebaseui.css'
@Injectable({
  providedIn: 'root',
})
export class UserserviceService implements OnInit {
  emailid: any;
  user = {
    user_id: '',
    username: '',
    image: '',
    email: '',
  };
  // projectdetails = {
  //   id: '',
  //   name: '',
  //   discription: '',
  // };
  // issuedetails = {
  //   discription: '',
  //   expectedresult: '',
  //   replicate: '',
  //   status: '',
  //   title: '',
  //   project_id: '',
  //   user_id: '',
  // };
  // userdetails = {
  //   name: '',
  //   image: '',
  // };
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
  };
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
  //add comment
  async comment() {
    this.commentdetails.id = uuidv4();
    this.commentdetails.user_id = this.user.user_id;
    this.commentdetails.date = moment().format('YYYY/MM/DD/HH/mm/ss');
    await this.firestore
      .collection('comment')
      .doc(this.commentdetails.issue_id)
      .collection('comment')
      .doc(uuidv4())
      .set(this.commentdetails)
      .then(() => {
        console.log('comment added');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //get comment
  getcomment(id:any) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('comment')
        .doc(id)
        .collection('comment')
        .valueChanges()
        .subscribe((data) => {
          if (data) {
            resolve(data);
            // console.log(data);
          } else {
            reject('no comment found');
          }
        });
    });
  }

  //history of issue
  async history(issue_id: any) {
    this.historydetails.id = uuidv4();
    this.historydetails.user_id = this.user.user_id;
    this.historydetails.date = moment().format('YYYY/MM/DD/HH/mm/ss');
    await this.firestore
      .collection('history')
      .doc(issue_id)
      .collection('historydetails')
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

  //get history of issue
  gethistory(issue_id: any) {
    // console.log(issue_id)
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('history')
        .doc(issue_id)
        .collection('historydetails')
        .valueChanges()
        .subscribe((data) => {
          if (data) {
            resolve(data);
          } else {
            reject('error geting history');
          }
        });
    });
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

    // this.firestore
    //   .collection('issues')
    //   .doc(id)
    //   .valueChanges()
    //   .subscribe(
    //     (data) => {
    //       if (data) {
    //         this.oneissue = data;
    //         this.issuedetails.discription = this.oneissue.discription;
    //         this.issuedetails.status = this.oneissue.status;
    //         this.issuedetails.expectedresult = this.oneissue.expectedresult;
    //         this.issuedetails.replicate = this.oneissue.replicate;
    //         this.issuedetails.title = this.oneissue.title;
    //         this.getproject(this.oneissue.project_id);
    //         this.getuser(this.oneissue.user_id);
    //       } else {
    //         console.log('data not found');
    //         this.router.navigate(['/project']);
    //       }
    //     },
    //     (err) => console.log(err)
    //   );
  }
  //get one user details
  getuser() {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('users')
        .valueChanges()
        .subscribe((data) => {
          if (data) {
            resolve(data);
          } else {
            reject('no user data found');
          }
        });
    });
    // this.firestore
    //   .collection('users')
    //   .doc(id)
    //   .valueChanges()
    //   .subscribe(
    //     (data) => {
    //       if (data) {
    //         this.selecteduser = data;
    //         // console.log(this.selecteduser);
    //         this.userdetails.name = this.selecteduser.username;
    //         this.userdetails.image = this.selecteduser.image;
    //       }
    //     },
    //     (err) => console.log(err)
    //   );
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
    // this.firestore
    //   .collection('project')
    //   .doc(id)
    //   .valueChanges()
    //   .subscribe(
    //     (data) => {
    //       // console.log(data);
    //       this.yourproject = data;
    //       // this.yourprojectname=this.yourproject.project_name;
    //       // this.yourprojectid=this.yourproject.project_id;
    //       this.projectdetails.id = this.yourproject.project_id;
    //       this.projectdetails.name = this.yourproject.project_name;
    //       this.projectdetails.discription = this.yourproject.discription;
    //       // console.log(this.projectdetails);
    //     },
    //     (err) => console.log(err)
    //   );
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
