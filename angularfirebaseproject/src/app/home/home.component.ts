import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private firestore: AngularFirestore,
    public authservice: AuthService,
    private route: Router
  ) {
    this.firestore
      .collection('productdetails')
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
  val: any;
  
  ngOnInit(): void {
  }


  carddetails(data: any) {
    // console.log(data);
    this.route.navigate([`/home/${data.id}`]);
  }
}
