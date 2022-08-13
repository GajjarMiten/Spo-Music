import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results: SpotifyApi.ArtistObjectFull[];
  searchQuery: any;

  private ngUnsubscribeParams: Subscription | undefined;
  private ngUnsubscribe: Subscription | undefined;

  constructor(private router: ActivatedRoute, private musicDataService: MusicDataService) {
    this.results = [];
    this.searchQuery = '';
  }

  ngOnInit(): void {
    this.ngUnsubscribeParams = this.router.queryParams.subscribe(params => {
      this.searchQuery = params['q'];

      this.ngUnsubscribe = this.musicDataService.searchArtists(this.searchQuery).subscribe(results => {
        this.results = results.artists.items.filter(artist => artist.images.length > 0);
      })
    });

  }

  ngOnDestroy() {
    this.ngUnsubscribeParams?.unsubscribe()
    this.ngUnsubscribe?.unsubscribe()
  }

}
