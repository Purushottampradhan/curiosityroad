import { Component, getDebugNode, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})

export class ProductdetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public authservice: AuthService
  ) {
  
  }
  id: any;

  // slides=[`${this.data.image[0]},${this.data.image[1]}`]
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
   this.authservice.getone(this.id)
// console.log(this.authservice.data.image)
  }

  
}
