import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IssueformComponent } from '../issueform/issueform.component';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  constructor(
    private firestore: AngularFirestore,
    private snakbar: MatSnackBar,
    public userservice: UserserviceService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  openSnackBar(message: string, action: string) {
    this.snakbar.open(message, action, {
      duration: 2000,
    });
  }
  
  projectdetails(data: any) {
    // console.log(data)
    this.route.navigate([`/project/${data.project_id}`]);
  }
}
