import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppComponent } from '../app.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  photo: any;
  name: any;
  constructor(
    public appcomponent: AppComponent,
    public authservice: AuthService,
    private afauth: AngularFireAuth
  ) {
    this.afauth.authState.subscribe(
      (d) => {
        this.photo = d?.photoURL;
        this.name = d?.displayName;
        // console.log(this.photo)
      },
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {}

}
