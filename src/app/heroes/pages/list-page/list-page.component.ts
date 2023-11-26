import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes-service.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit {
  constructor(private heroService: HeroesService){}
  
  public heroes:Hero[] = [];

  ngOnInit(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }
}
