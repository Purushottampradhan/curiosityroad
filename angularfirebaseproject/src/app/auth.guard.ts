import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}
  canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  // return true;
  return this.afAuth.user.pipe(
    take(1),
    map(res=>{
      // return res?true:false;
      if(res){
        // console.log(res);
        return true;
      }
      else{
        this.router.navigate(["/signin"]);
        return false;
      }
    },(err: any)=>{console.log(err)})  
  )
  
  
  // if(){
  //   return true
  // }
  // else{
  //   this.router.navigate(['/signin'])
  //   return false;
  // }

}
}