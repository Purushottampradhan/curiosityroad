import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import {MatSnackBar} from "@angular/material/snack-bar"
import { Router } from '@angular/router';
@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css'],
})
export class RoadmapComponent implements OnInit {
  constructor(
    public userservice: UserserviceService,
    private firestore: AngularFirestore,
    private snakbar:MatSnackBar,
    private router:Router
  ) {}
  openSnackBar(message: string, action: string) {
  
    this.snakbar.open(message, action, {
      duration: 2000,
    });
  }
  //get issue details
  issuedetails(data:any){
    // console.log(data)
    this.router.navigate([`/project/allissue/${data.issue_id}`])
  }
  ngOnInit(): void {}
  update(data: any) {
    this.firestore
      .collection('issues')
      .doc(data)
      .update({
        status: 'open',
      })
      .then(() => {
        console.log('document updated sucesfully');
      });
  }
}
