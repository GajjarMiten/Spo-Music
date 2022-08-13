import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  albums: SpotifyApi.AlbumObjectSimplified[];
  artist: SpotifyApi.SingleArtistResponse;

  private ngUnsubscribeArtist: Subscription | undefined;
  private ngUnsubscribeAlbums: Subscription | undefined;

  constructor(private MusicDataService: MusicDataService, private router: ActivatedRoute) {
    this.albums = [];
    this.artist = {} as SpotifyApi.SingleArtistResponse;
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.ngUnsubscribeArtist = this.MusicDataService.getArtistById(params["id"]).subscribe(data => {
        this.artist = data;
      });
      this.ngUnsubscribeAlbums = this.MusicDataService.getAlbumsByArtistId(params["id"]).subscribe(data => {
        
        this.albums = data.items.filter((item, index, array) => {
          return array.findIndex(i => i.id === item.id) === index;
        }
        );
      }
      );
    });
  }


  ngOnDestroy() {
    this.ngUnsubscribeArtist?.unsubscribe();
    this.ngUnsubscribeAlbums?.unsubscribe();
  }

}
