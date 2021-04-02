import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './authguard.guard';
import { CreateprojectComponent } from './createproject/createproject.component';
import { IssuedetailComponent } from './issuedetail/issuedetail.component';
import { IssueformComponent } from './issueform/issueform.component';
import { ProjectComponent } from './project/project.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SigninComponent } from './signin/signin.component';
const routes: Routes = [
  { path: '',redirectTo:'project',pathMatch:'full'},
  {
    path: 'signin',
    component: SigninComponent,
  },

  {
    path: 'project',
    children: [
      {
        path:'',
        component:ProjectComponent
    
      },
      {
        path: 'issueform',
        canActivate: [AuthguardGuard],
        component: IssueformComponent,
      },
      {
        path: 'allissue',
        component: RoadmapComponent,
      },
      {
        path: 'allissue/:id',
        canActivate:[AuthguardGuard],
        component: IssuedetailComponent,
      },
    ],
  },
  {
    path: 'project/:id',
    component: ProjectdetailsComponent,
  },
 
  {
    path: 'createproject',
    canActivate: [AuthguardGuard],
    component: CreateprojectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
