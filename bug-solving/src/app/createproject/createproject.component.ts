import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { UserserviceService } from '../userservice.service';
@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css'],
})
export class CreateprojectComponent implements OnInit {
  createproject = new FormGroup({
    project_name: new FormControl('', Validators.required),
    discription: new FormControl(''),
  });
  project_id: any;
  constructor(private userservice: UserserviceService) { }

  ngOnInit(): void { }

  onsubmit(data: any) {
    if (this.createproject.valid) {
      this.project_id = uuidv4();
      const details = {
        project_name: data.project_name,
        discription: data.discription,
        project_id: this.project_id,
      };
      console.log(data);
      this.userservice.createproject(details);
      this.reset();
    }
  }

  reset() {
    this.createproject.reset();
  }
}
