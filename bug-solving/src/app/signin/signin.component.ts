import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import 'firebaseui/dist/firebaseui.css';
import {AngularFirestore} from "@angular/fire/firestore"
// import {FirebaseAuth} from ""
import firebase from 'firebase/app';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private userservice:UserserviceService,
    public firestore:AngularFirestore) {

   }

  ngOnInit(): void {
    this.userservice.onlogin();
    console.log("login page")
  }


}
