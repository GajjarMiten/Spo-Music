import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit {
  releases: SpotifyApi.AlbumObjectSimplified[];
  private ngUnsubscribe: Subscription | undefined;

  constructor(private MusicDataService: MusicDataService) {
    this.releases = [];
  }

  ngOnInit(): void {

    this.ngUnsubscribe = this.MusicDataService.getNewReleases().subscribe(data => {
      this.releases = data.albums.items;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe?.unsubscribe();
  }

}
