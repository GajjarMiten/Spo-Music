import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album: SpotifyApi.SingleAlbumResponse;

  constructor(private snackBar: MatSnackBar, private MusicDataService: MusicDataService, private router: ActivatedRoute) {
    this.album = {} as SpotifyApi.SingleAlbumResponse;
  }

  private ngUnsubscribe: Subscription | undefined;

  addToFavorites(album: string) {
    const res = this.MusicDataService.addToFavourites(album);;
    if (res) {
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    }
  }


  ngOnInit(): void {

    this.router.params.subscribe(params => {
      this.ngUnsubscribe = this.MusicDataService.getAlbumById(params["id"]).subscribe(data => {
        this.album = data;
      }
      );
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe?.unsubscribe();
  }


}
