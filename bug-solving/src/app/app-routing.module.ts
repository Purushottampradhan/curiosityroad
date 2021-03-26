import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './authguard.guard';
import { CreateprojectComponent } from './createproject/createproject.component';
import { IssuedetailComponent } from './issuedetail/issuedetail.component';
import { IssueformComponent } from './issueform/issueform.component';
import { ProjectComponent } from './project/project.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SigninComponent } from './signin/signin.component';
const routes: Routes = [
  {path:"",
  component:ProjectComponent

  },
{
  path:"signin",
  component:SigninComponent
},
{
  path:"issueform",
  canActivate:[AuthguardGuard],
  component:IssueformComponent
},
{
  path:"project",
  component:ProjectComponent
},
{
  path:"project/:id",
  component:ProjectComponent
},
{
  path:'createproject',
  canActivate:[AuthguardGuard],
  component:CreateprojectComponent
},
{
  path:'allissue',
  component:RoadmapComponent
},
{
  path:'issuedetails',
  component:IssuedetailComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
