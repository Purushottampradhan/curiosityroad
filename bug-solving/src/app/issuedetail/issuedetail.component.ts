import { Component, ErrorHandler, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { identity, Observable } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-issuedetail',
  templateUrl: './issuedetail.component.html',
  styleUrls: ['./issuedetail.component.css'],
})
export class IssuedetailComponent implements OnInit {
  // selected: string | undefined;
  id: any;
  issue: any;
  projectdetail: any;
  userdetails: any;
  historydetails: any;
  user: string | undefined;
  allhistory: any;

  moment: any = moment;
  visible = true;
  visiblereply = true;
  commentform = new FormGroup({
    comment: new FormControl(''),
  });
  commentreply = new FormGroup({
    comment: new FormControl(''),
  });
  comment: any;
  replydetails: any;

  // dropdownList = [] as any;
  // selectedItems = [] as any;
  // dropdownSettings: IDropdownSettings | any;
  public isCollapsed: boolean[] = [];
  public isCollapsedreply: boolean[] = [];
  constructor(
    private activatedroute: ActivatedRoute,
    private firestore: AngularFirestore,
    public userservice: UserserviceService
  ) { }

  ngOnInit(): void {
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'name1' },
    //   { item_id: 2, item_text: 'name2' },
    //   { item_id: 3, item_text: 'name3' },
    //   { item_id: 4, item_text: 'name4' },
    //   { item_id: 5, item_text: 'name5' },
    // ];
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'user_id',
    //   textField: 'username',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 2,
    //   allowSearchFilter: true,
    // };
    //get  all user details
    //  var data=this.userservice.getuser()
    //  data.then(
    //   (value) => {
    //      this.userdetails = value;
    //      // console.log(this.userdetails);
    //      console.log("this is user details", this.userdetails)
    //      // console.log("this is user details", this.userdetails)

    //    },
    //    (error) => {
    //      console.log(error);
    //    }
    //  );

    this.id = this.activatedroute.snapshot.params['id'];
    this.userservice.getone(this.id).then(
      async (value) => {
        this.issue = value;

        //get project details
        this.userservice.getproject(this.issue.project_id).then(
          (value) => {
            this.projectdetail = value;
            // console.log("this is project details", this.projectdetail)
          },
          (error) => {
            console.log(error);
          }
        );

        //get history details of the issue
        // try {
        //   this.allhistory = await this.userservice.gethistory(
        //     this.issue?.issue_id
        //   );
        //   //  this.userservice.example(this.issue?.issue_id)
        // } catch (error) {
        //   console.log(error);
        // }

        //get user all details 
        try {
          this.userdetails = await this.userservice.getuser();
          // console.log(this.userdetails);
        } catch (error) {
          console.log(error);
        }

        //get all comment of the issue
      //   try {
      //     this.userservice.getcomment(this.issue?.issue_id)
      //   } catch (error) {
      //     console.log(error)
      //   }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //update the status

  // onfocus() {
  //   this.visible = false;
  // }
  //submit the comment
  async submitcomment(data: any) {
    this.userservice.commentdetails.issue_id = this.issue?.issue_id;
    this.userservice.commentdetails.data = data.comment;
    await this.userservice.comment();
    this.visible = true;
    this.commentform.reset();
  }
  resetcomment() {
    this.visible = true;
    this.visiblereply = true;
    this.commentform.reset();
  }
  //submit the comment reply
  async submitcommentreply(id: any, data: any) {
    this.userservice.replydetails.comment_id = id;
    this.userservice.replydetails.data = data.comment;
    this.userservice.replydetails.issue_id = this.issue.issue_id;
    await this.userservice.reply();
    this.visiblereply = true;
    this.commentreply.reset();
  }
  //get the comment reply of the comment
  async viewreply(comment_id: any) {
    await this.userservice.getreply(comment_id).then(
      (value) => {
        this.replydetails = value;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // onItemSelect(item: any) {
  //   console.log(item);
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }
}
