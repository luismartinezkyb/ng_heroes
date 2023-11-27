import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, pipe } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl:string = environments.baseUrl;

  getHeroes():Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  getHeroById(id:string):Observable<Hero|undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError(error => of(undefined))
    )
  }

  getSuggestions(query:string):Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&limit=6`)
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes/`,
      hero
    )
  }
  updateHero(hero:Hero):Observable<Hero>{

    if(!hero.id) throw new Error('Hero id is required')
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,
      hero
    )
  }
  deleteHeroById(id:string):Observable<boolean>{
    return this.httpClient.delete<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      
      map(res=> true),
      catchError(err => of(false)),
    )
  }
}
