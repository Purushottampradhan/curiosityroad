import { TemplateRef } from '@angular/core';
import { Component, OnInit ,PipeTransform} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import {MatSnackBar} from "@angular/material/snack-bar"
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//bootstrap searching
import {DecimalPipe} from "@angular/common"
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css'],
})
export class RoadmapComponent implements OnInit {
  // iframeURL: any;
  searchText = '';
  constructor(
    public userservice: UserserviceService,
    private firestore: AngularFirestore,
    private snakbar:MatSnackBar,
    private router:Router,
    private senetizer:DomSanitizer,
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

}
