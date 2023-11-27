import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id:                 new FormControl<string>(''),
    superhero:          new FormControl<string>('', {nonNullable: true}),
    publisher:          new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:          new FormControl(''),
    first_appearance:   new FormControl(''),
    characters:         new FormControl(''),
    alt_img:            new FormControl(''),
  })

  public publishers =[
    {
      id: 'DC Comics', desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics', desc: 'Marvel - Comics'
    }
  ]
  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {
    if(!this.router.url.includes('edit'))return;

    this.activatedRoute.params.
    pipe(
      switchMap(({id})=>this.heroService.getHeroById(id))
    ).subscribe(hero=>{
      if(!hero){
        return this.router.navigateByUrl('/')
      }
      this.heroForm.reset(hero)
      return;
    })
    
  }


  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }
  onSubmit():void {
    // console.log({
    //   form:this.heroForm.valid,
    //   value:this.heroForm.value
    // })

    if(!this.heroForm.valid)return;
    
    if(this.currentHero.id){
      this.heroService.updateHero(this.currentHero)
      .subscribe(hero=>{
        this.showSnackbar(hero.superhero+' updated!')
      })
      return;
    }

    this.heroService.addHero(this.currentHero)
    .subscribe(hero=>{
      this.showSnackbar(hero.superhero+' created!')
      this.router.navigate(['/heroes/edit/', hero.id])
      //TODO: mostrat snackbar and navigate a heros/edit/hero.id 
    })
  }

  onDeleteHero(){
    if(!this.currentHero.id) throw new Error('Hero not found')
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:this.heroForm.value})

    //FIRST OPTION BUT NOT VERY CLEAR
    // dialogRef.afterClosed()
    // .subscribe(result=>{
    //   if(!result) return;
    //   this.heroService.deleteHeroById(this.currentHero.id)
    //   .subscribe(wasDeleted=>{
    //     if(!wasDeleted) return;
    //     return this.router.navigate(['/heroes'])
    //   })
    // })

    // I DID THIS BUT IT DOESN?T MATCH WITH THE TEACHES ANSWER
    // dialogRef.afterClosed()
    // .pipe(
    //   switchMap((result)=> result? this.heroService.deleteHeroById(this.currentHero.id):'')
    // )
    // .subscribe(wasDeleted=>{
    //   if(!wasDeleted) return;
    //   return this.router.navigate(['/heroes'])
    // })

    dialogRef.afterClosed()
    .pipe(
      filter((res:boolean) =>res),
      switchMap(()=>this.heroService.deleteHeroById(this.currentHero.id)),
      filter((wasDeleted:boolean)=>wasDeleted)
    )
    .subscribe(result=>{
      return this.router.navigate(['/heroes']);
    })

  }

  showSnackbar(message:string):void{
    this.snackbar.open(message, 'done', {
      duration:2500,
    })
  }
}
