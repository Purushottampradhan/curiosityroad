import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  formtemplate = new FormGroup({
    name: new FormControl(''),
    discription: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
    image1: new FormControl('', Validators.required),
  });

  issubmited: boolean = false;
  fb: any;
  selectedfile: File | undefined;
  downloadURL: Observable<string> | undefined;
  images: Array<string> = [];
  imagelist: Array<string> = [];
  opened = false;
  uuid: any;
  progress:any;
  constructor(
    private storage: AngularFireStorage,
    public afauth: AngularFireAuth,
    public authservice: AuthService,
    public appcomponent: AppComponent
  ) {}

  ngOnInit(): void {}

  togglesidebar() {
    this.opened = !this.opened;
  }
  onfileselected(event: any) {    
    this.imagelist.push(this.formtemplate.value.image1);
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
          this.progress=(url.bytesTransferred/url.totalBytes)*100;
            
          }
        },
        (err) => {
          console.log(err);
        }
      );
    
  }

  onsubmit(formvalue: any) {
    if (this.images.length) {
      if (this.formtemplate.valid) {
        this.uuid = uuidv4();
        const details = {
          name: formvalue.name,
          discription: formvalue.discription,
          category: formvalue.category,
          price: formvalue.price,
          image: this.images,
          id: this.uuid,
        };
        // console.log(details);
        // console.log(JSON.stringify(details));
        this.issubmited = true;
        // console.log(this.images);
        this.authservice.onsubmit(details);
        this.resetform();
        this.images = [];
        this.imagelist = [];
        this.progress="";
      } else {
        alert('Fill the form first');
      }
    }
    else{
      if(this.formtemplate.valid){
       console.log("wait for image") 
      }
      else{
        alert("fill the form first")
      }
    }
  }

  resetform() {
    this.formtemplate.reset({
      name: '',
      category: '',
      price: '',
      image1: '',
      discription: '',
    });
  }
  cancle() {
    this.images = [];
    this.imagelist = [];
    this.progress="";
  }
}
