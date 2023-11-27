import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes-service.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {
  
  public searchInput = new FormControl('')
  public selectedHero?:Hero;
  public heroes: Hero[] =[];

  constructor(
    private heroesService: HeroesService
  ){}

  searchHero():void{
    const value: string = this.searchInput.value || '';
    if(value.length===0) return;
    this.heroesService.getSuggestions(value)
    .subscribe(heroes => this.heroes= heroes)
  }
  onSelectedOption(event: MatAutocompleteSelectedEvent) :void{
    if(!event.option.value) {
      this.selectedHero = undefined;
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }
}
