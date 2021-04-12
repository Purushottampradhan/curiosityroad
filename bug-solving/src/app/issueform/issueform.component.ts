import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
//storage for storing image
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { UserserviceService } from '../userservice.service';
// import{Moment} from 'moment'
import * as moment from 'moment';
@Component({
  selector: 'app-issueform',
  templateUrl: './issueform.component.html',
  styleUrls: ['./issueform.component.css'],
})
export class IssueformComponent implements OnInit {
  //variable list
  downloadURL: Observable<string> | undefined;
  fb: any;
  images: Array<string> = [];
  progress: any;
  imagelist: Array<string> = [];
  issue_id: any;
  user_id: any;
  //form template
  formtemplate = new FormGroup({
    issue: new FormControl(''),
    discription: new FormControl(''),
    category: new FormControl(''),
    expectedresult: new FormControl(''),
    replicate: new FormControl(''),
    image: new FormControl('', Validators.required),
  });
  constructor(
    private storage: AngularFireStorage,
    public userservice: UserserviceService
  ) {
    // console.log(moment().format('YYYYMMDDhhmmss'))
    // console.log(moment('20210401104531','YYYYMMDDhhmmss').fromNow())
    // console.log(moment().startOf('').fromNow())
  }

  ngOnInit(): void {}

  onfileselected(event: any) {
    this.imagelist.push(this.formtemplate.value.image);
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `productimage/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`productimage/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(
            (url) => {
              if (url) {
                this.fb = url;
                this.images.push(this.fb);
              }
              console.log(this.fb);
            },
            (err) => {
              console.log(err);
            }
          );
        })
      )
      .subscribe(
        (url) => {
          if (url) {
            console.log(url);
            this.progress = (url.bytesTransferred / url.totalBytes) * 100;
            console.log(this.progress);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  reset() {
    this.progress = 0;
    this.formtemplate.reset();
  }
  
  onsubmit(formvalue: any) {
    // console.log(formvalue);
    if (this.images.length) {
      if (this.formtemplate.valid) {
        this.issue_id = uuidv4();
        const details = {
          title: formvalue.issue,
          discription: formvalue.discription,
          project_id: formvalue.category,
          expectedresult: formvalue.expectedresult,
          replicate: formvalue.replicate,
          attachements: this.images,
          issue_id: this.issue_id,
          user_id: this.userservice.currentuser.uid,
        };
        // console.log(details.user_id)
        this.userservice.onsubmit(details);
        this.images = [];
        this.imagelist = [];
        this.reset();
      } else {
        alert('Fill the form first');
      }
    } else {
      if (this.formtemplate.valid) {
        console.log('wait for image');
      } else {
        alert('fill the form first');
      }
    }
  }
}
