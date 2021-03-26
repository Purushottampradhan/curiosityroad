import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  id: any;
  
  constructor(public authservice:AuthService) { 
  }
  
  ngOnInit(): void {
  }
  // images=this.authservice.data.image;
  
  // images=["https://firebasestorage.googleapis.com/v0/b/shoping-card-bc6da.appspot.com/o/productimage%2F1616142998047?alt=media&token=4caa4ce1-dd0b-4bf7-b481-ee86acc6c8dc","https://firebasestorage.googleapis.com/v0/b/shoping-card-bc6da.appspot.com/o/productimage%2F1616143005969?alt=media&token=f40c5a63-4584-4a13-b73a-f0e90d466f09","https://firebasestorage.googleapis.com/v0/b/shoping-card-bc6da.appspot.com/o/productimage%2F1616143015754?alt=media&token=632b37c4-2750-4ccd-bf0b-5e3c09fe6e88"]
onSlide(slideEvent: NgbSlideEvent) {
  if (this.unpauseOnArrow && slideEvent.paused &&
    (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
  }
  if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {

  }
}
}
