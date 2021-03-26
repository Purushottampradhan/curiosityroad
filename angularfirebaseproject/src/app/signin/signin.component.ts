import { Component, OnInit } from '@angular/core';
// import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import 'firebaseui/dist/firebaseui.css';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  hide = true;
  userobj = {
    email: '',
    password: '',
  };

  constructor(public authservice: AuthService) {}

  ngOnInit(): void {
    this.authservice.onlogin();
  }
}
