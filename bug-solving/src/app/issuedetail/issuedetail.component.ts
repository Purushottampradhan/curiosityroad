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
  selected: string | undefined;
  id: any;
  issue: any;
  projectdetail: any;
  userdetails: any;
  historydetails: any;
  user: string | undefined;
  allhistory: any;
  time: any;
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
  filter = new FormControl('');
  dropdownList = [] as any;
  selectedItems = [] as any;
  dropdownSettings: IDropdownSettings | any;
  public isCollapsed: boolean[] = [];
  public isCollapsedreply: boolean[] = [];
  constructor(
    private activatedroute: ActivatedRoute,
    private firestore: AngularFirestore,
    public userservice: UserserviceService
  ) {}

  ngOnInit(): void {
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'name1' },
    //   { item_id: 2, item_text: 'name2' },
    //   { item_id: 3, item_text: 'name3' },
    //   { item_id: 4, item_text: 'name4' },
    //   { item_id: 5, item_text: 'name5' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'user_id',
      textField: 'username',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };

    this.id = this.activatedroute.snapshot.params['id'];
    this.userservice.getone(this.id).then(
      async (value) => {
        // console.log(value);
        this.issue = value;
        //get project details of selected issue
        await this.userservice.getproject(this.issue.project_id).then(
          (value) => {
            this.projectdetail = value;
          },
          (error) => {
            console.log(error);
          }
        );
        //get  all user details
        await this.userservice.getuser().then(
          (value) => {
            this.userdetails = value;
            // console.log(this.userdetails);
          },
          (error) => {
            console.log(error);
          }
        );
        await this.userservice.gethistory(this.issue?.issue_id).then(
          (value) => {
            this.allhistory = value;
            // console.log(this.allhistory);
          },
          (error) => {
            console.log(error);
          }
        );
        this.userservice.getcomment(this.issue?.issue_id).then(
          (value) => {
            this.comment = value;
            // console.log(value);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async update(newstatus: any) {
    await this.firestore
      .collection('issues')
      .doc(this.issue?.issue_id)
      .update({
        status: newstatus,
      })
      .then(async () => {
        this.userservice.historydetails.data = `status changed to ${newstatus}`;
        this.userservice.historydetails.issue_id = this.issue.issue_id;
        await this.userservice.history(this.issue.issue_id);
        console.log('document updated sucesfully');
      });
  }
  onfocus() {
    this.visible = false;
  }
  submitcomment(data: any) {
    this.userservice.commentdetails.issue_id = this.issue?.issue_id;
    this.userservice.commentdetails.data = data.comment;
    this.userservice.comment();
    this.visible = true;
    this.commentform.reset();
  }
  resetcomment() {
    this.visible = true;
    this.visiblereply = true;
    this.commentform.reset();
  }
  async submitcommentreply(id:any,data: any) {
    // console.log(id, data);
    this.userservice.replydetails.comment_id = id;
    this.userservice.replydetails.data = data.comment;
    this.userservice.replydetails.issue_id = this.issue.issue_id;
    await this.userservice.reply();
    this.visiblereply = true;
    this.commentreply.reset();
  }
  viewreply(comment_id: any) {
    // console.log(id)
    // console.log(comment_id)
    this.userservice.getreply(comment_id).then(
      (value) => {
        console.log(value);
        this.replydetails = value;
      },
      (error) => {
        console.log(error);
      }
    );
    // console.log('this is reply');
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
