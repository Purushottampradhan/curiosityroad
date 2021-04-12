import { Component, ErrorHandler, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
@Component({
  selector: 'app-issuedetail',
  templateUrl: './issuedetail.component.html',
  styleUrls: ['./issuedetail.component.css'],
})
export class IssuedetailComponent implements OnInit {
  constructor(public userservice: UserserviceService) {}
  ngOnInit(): void {
    //get user all details
    // try {
    //   this.userservice.getuser();
    // } catch (error) {
    //   console.log(error);
    // }
  }

  // resetcomment() {
  //   this.visible = true;
  //   this.visiblereply = true;
  //   this.commentform.reset();
  // }

  //get the comment reply of the comment
  // async viewreply(comment_id: any) {
  //   await this.userservice.getreply(comment_id).then(
  //     (value) => {
  //       this.replydetails = value;
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
