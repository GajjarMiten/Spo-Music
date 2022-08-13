import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: any[];

  private ngUnsubscribe: Subscription | undefined;


  constructor(private musicDataService: MusicDataService) {
    this.favourites = [];
  }

  removeFromFavourites(track: any) {
   const sub =  this.musicDataService.removeFromFavourites(track).subscribe((res) => {
    this.favourites = res.tracks;
    sub.unsubscribe();
   });
  }

  ngOnInit(): void {
    this.ngUnsubscribe = this.musicDataService.getFavourites().subscribe(favourites => {
      this.favourites = favourites.tracks;
      console.log(favourites.tracks);
      
    })

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe?.unsubscribe();
  }

}
