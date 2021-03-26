import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebaseui from 'firebaseui';
// import * as firebase from 'firebase';
import firebase from 'firebase/app';
// import 'firebase/<PACKAGE>';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide=true;
  userobj={
    email:'',
    password:''
  }
  constructor(public authService: AuthService ) { 
  }

  ngOnInit(): void {}

}
