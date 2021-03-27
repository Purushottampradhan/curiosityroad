import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css']
})
export class ProjectdetailsComponent implements OnInit {
id:any;
  constructor(public userservice:UserserviceService,
    private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
this.id=this.activatedroute.snapshot.params['id']
this.userservice.getproject(this.id)
  }

}
