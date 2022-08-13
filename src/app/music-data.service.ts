import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  favouritesList: any[] = [];

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getArtistById(id: string): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.SingleArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id: string): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums`, { headers: { "Authorization": `Bearer ${token}` }, params: { include_groups: "album,single", limit: "50" } });
    }
    ));
  }

  getAlbumById(id: string): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(query: string): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.ArtistSearchResponse>("https://api.spotify.com/v1/search", { headers: { "Authorization": `Bearer ${token}` }, params: { q: query, type: "artist", limit: "50" } });
    }));
  }

  addToFavourites(id: string): boolean {
    if (!id || this.favouritesList.length >= 50) {
      return false;
    }
    this.favouritesList.push(id);
    return true;
  }

  removeFromFavourites(id: string): Observable<any> { 

    this.favouritesList = this.favouritesList.filter(item => item !== id);
    return this.getFavourites();
  }

  getFavourites(): Observable<any> {

    if (this.favouritesList.length > 0) {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
        return this.http.get<any>("https://api.spotify.com/v1/tracks",
          {
            headers: { "Authorization": `Bearer ${token}` },
            params: { ids: this.favouritesList.join(",") }
          });
      }
      ));
    }
    return new Observable<any>(o => o.next([]));

  }

}
