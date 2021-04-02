import { TemplateRef } from '@angular/core';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//bootstrap searching
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css'],
  providers: [DecimalPipe],
})
export class RoadmapComponent implements OnInit {
  // iframeURL: any;
  // issuelist: Observable<any[]>;
  // filter = new FormControl(' ');
  searchText = '';
  constructor(
    public userservice: UserserviceService,
    private firestore: AngularFirestore,
    private snakbar: MatSnackBar,
    private router: Router,
    private senetizer: DomSanitizer,
    pipe: DecimalPipe,
  ) {
    // this.issuelist = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => this.search(text, pipe))
    // );
  }
  openSnackBar(message: string, action: string) {
    this.snakbar.open(message, action, {
      duration: 2000,
    });
  }
  //get issue details
  issuedetails(data: any) {
    this.router.navigate([`/project/allissue/${data.issue_id}`]);
  }
  ngOnInit(): void {}
  // search(text: string, pipe: PipeTransform): any[] {
  //   return this.userservice.issue.filter(
  //     (data:any) => {
  //       const term = text.toLowerCase();
  //       return (
  //         data.title.toLowerCase().includes(term) ||
  //         pipe.transform(data.status).includes(term)
  //       );
  //     }
  //   );
  // }
}
