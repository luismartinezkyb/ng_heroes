import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;
  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){}


  ngOnInit(): void {
    this.activatedRoute.params
    .pipe( // el pipe nos permite ejecutar antes de un subscribe
      // delay(3000),
      switchMap(({id})=>this.heroService.getHeroById(id))//Switch map nos permite el poder ejecutar algo antes de suscribirse y pasalo a la siguiente subscripcion
    )
    .subscribe(hero=>{
      // console.log({hero})
      if(!hero)return this.router.navigate([ '/heroes/list'])

      this.hero=hero;
      return 
    })
  }
  goBack():void{
    this.router.navigate(['/heroes/list'])
  }
}
