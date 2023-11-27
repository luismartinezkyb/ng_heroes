import { Injectable } from '@angular/core';
import {  Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class IsLoggedGuard{
  constructor(
    private authService: AuthService,
    private router:Router
  ) { }
  
  private checkStatus():boolean | Observable<boolean>{
    return this.authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated=>console.log({isAuthenticated})),
      tap((isAuthenticated)=>{
        if(isAuthenticated){
          this.router.navigate(['./'])
        }
      }),
      map(isAuthenticated =>!isAuthenticated)
    )
  }

  canMatch(route:Route,segments: UrlSegment[]):boolean | Observable<boolean>{
    //this.checkStatus()
    return this.checkStatus()
  }
  canActivate(route:Route, state: RouterStateSnapshot):boolean | Observable<boolean>{
    // this.checkStatus()
    return this.checkStatus()
  }
}