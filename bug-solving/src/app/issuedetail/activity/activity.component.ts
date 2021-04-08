import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/userservice.service';
import * as moment from 'moment';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
  visible = true;
  id:any;
  issue:any;
  commentgroup = new FormGroup({
    comment: new FormControl(''),
  });
  commentdata: any;
  moment: any = moment;
  public isCollapsed: boolean[] = [];
  public isCollapsedreply: boolean[] = [];
  allhistory: any;
  constructor(public userservice: UserserviceService,
    private activatedroute:ActivatedRoute) {}

  ngOnInit(): void {
    this.id=this.activatedroute.snapshot.params['id'];
    this.userservice.getone(this.id).then(
      async (value)=>{
        this.issue=value;

        //get the comment of the issue
        try {
         this.commentdata= await this.userservice.getcomment(this.issue?.issue_id)
          // console.log("this is from activity component",this.commentdata)
        } catch (error) {
          console.log(error)
        }

        //get all history
        try {
          this.allhistory = await this.userservice.gethistory(
            this.issue?.issue_id
          );
          //  this.userservice.example(this.issue?.issue_id)
        } catch (error) {
          console.log(error);
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  onfocus() {
    this.visible = false;
  }

  async submitcomment(data: any) {
    this.userservice.commentdetails.issue_id = this.issue?.issue_id;
    this.userservice.commentdetails.data = data.comment;
    await this.userservice.comment();
    this.visible = true;
    this.commentgroup.reset();
  }

  resetcomment() {
    this.visible = true;
  }

  async submitcommentreply(comment_id:any, data:any ){
    this.userservice.commentdetails.comment_id = comment_id;
    this.userservice.commentdetails.data = data.comment;
    await this.userservice.comment();
    this.visible = true;
    this.commentgroup.reset();
  }

  viewreply(id:any){
    console.log(id)
  }
}
