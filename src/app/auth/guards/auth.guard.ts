import { Injectable } from '@angular/core';
import { CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard{
  constructor(
    private authService: AuthService,
    private router:Router
  ) { }
  
  private checkStatus():boolean | Observable<boolean>{
    return this.authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated=>console.log({isAuthenticated})),
      tap((isAuthenticated)=>{
        if(!isAuthenticated) {
          this.router.navigate(['./auth/login'])
        }
      }),
    )
  }

  canMatch(route:Route,segments: UrlSegment[]):boolean | Observable<boolean>{
    // console.log(route, segments)
    return this.checkStatus()
  }
  canActivate(route:Route, state: RouterStateSnapshot):boolean | Observable<boolean>{
    return this.checkStatus()
  }
}