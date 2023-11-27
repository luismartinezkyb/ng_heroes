import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environments.baseUrl;
  private user?: User;

  constructor(
    private httpClient: HttpClient,
    private router:Router,
  ) { }

  get currentUser():User| undefined{
    if(!this.user) return undefined;
    // return {...this.user};
    return structuredClone(this.user);
  }

  login(email:string, password:string):Observable<User>{
    
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap((user)=>this.user = user),
      tap(user=>localStorage.setItem('token', 'xsasd.asxas.asxasx'))
    )
    
  }

  logout():void{
    this.user = undefined;
    localStorage.clear();
    this.router.navigate(['/auth/login'])
  }
  
  checkAuthentication():Observable<boolean>{
    const token = localStorage.getItem('token')
    if(!token) return of(false)

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user=> this.user = user),
      map(user=> !!user),
      catchError(err=> of(false))
    )
    //return of(true) // SE OCUPA EL OF  porque estamos regresando un valor observable booleando
    //DE lo contrario estaria regresando solo un valor boleano
  }
}
