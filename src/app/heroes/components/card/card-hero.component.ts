import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: 'card-hero.component.html'
})

export class CardHeroComponent implements OnInit {
  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if(!this.hero) throw new Error('Hero property is required')
    
  }
}