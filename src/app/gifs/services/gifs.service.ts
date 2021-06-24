import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs-interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'KbePJ7Ztc3WEiPKcX38YZ7qMhk1v2Iav';
  private _historial: string[] = [];

  resultados: Gif[] = [];

  constructor(
    private http: HttpClient) {

  }
  
  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string){

    query = query.trim().toLowerCase();
  
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=KbePJ7Ztc3WEiPKcX38YZ7qMhk1v2Iav&q=${query}&limit=10`)
      .subscribe( resp => {
        this.resultados = resp.data;
      });
  }

}
