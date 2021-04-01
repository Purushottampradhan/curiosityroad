import { Component, ErrorHandler, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../userservice.service';
@Component({
  selector: 'app-issuedetail',
  templateUrl: './issuedetail.component.html',
  styleUrls: ['./issuedetail.component.css'],
})
export class IssuedetailComponent implements OnInit {
  id: any;
  issue: any;
  projectdetail: any;
  userdetails: any;
  // title:any;
  allhistory: any;
  constructor(
    private activatedroute: ActivatedRoute,
    private firestore: AngularFirestore,
    public userservice: UserserviceService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.params['id'];
    this.userservice.getone(this.id).then(
      async (value) => {
        // console.log(value);
        this.issue = value;
        //get project details of selected issue
        await this.userservice.getproject(this.issue?.project_id).then(
          (value) => {
            this.projectdetail = value;
          },
          (error) => {
            console.log(error);
          }
        );
        //get  user details that create this issue
        await this.userservice.getuser(this.issue?.user_id).then(
          (value) => {
            this.userdetails = value;
          },
          (error) => {
            console.log(error);
          }
        );
        // console.log(this.projectdetail);
        // console.log(this.issue.title);
      },
      (error) => {
        console.log(error);
      }
    );
    this.userservice.gethistory().then(
      (value) => {
        this.allhistory = value;
        console.log(this.allhistory);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
