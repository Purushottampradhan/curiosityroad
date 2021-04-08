import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserserviceService } from 'src/app/userservice.service';

@Component({
  selector: 'app-issuedata',
  templateUrl: './issuedata.component.html',
  styleUrls: ['./issuedata.component.css']
})
export class IssuedataComponent implements OnInit {
  id: any;
  issue: any;
  userdetails: any;
  dropdownSettings: IDropdownSettings | any;
  dropdownList = [] as any;
  selectedItems = [] as any;
  selected: string | undefined;
  constructor(public userservice:UserserviceService,
    private firestore: AngularFirestore,
    private activatedroute: ActivatedRoute,) { }

  async ngOnInit(): Promise<void> {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'user_id',
      textField: 'username',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };
    this.id=this.activatedroute.snapshot.params['id'];
    this.userservice.getone(this.id).then(
      (value)=>{
        this.issue=value;
      },
      (error)=>{
        console.log(error)
      }
    )

   try {
     this.userservice.getuser();
    } catch (error) {
      console.log(error);
    }
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

  onItemSelect(item: any) {
    console.log(item);
  }
  
  onSelectAll(items: any) {
    console.log(items);
  }

}
