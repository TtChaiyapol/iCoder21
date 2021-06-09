import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonData, PokemonResponse, Sprites } from '../pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonDataList: PokemonData[] = [];
  pokemonUrl: string = '';


  constructor(public http: HttpClient) {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon/charizard')
    .subscribe(response=>{
      this.pokemonUrl = response.sprites.front_default
    })

    this.http.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200')
    .subscribe(response=>{
      this.pokemonDataList = response.results
    })

   }

  ngOnInit(): void {
  }

  
  movement(el: HTMLImageElement){
    el.animate({transform:'translateY(-100px)'}, {duration:500})
  }
  
  // getImage(url: string){
  //   let arr:string[] = url.split('/');
  //   return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${arr[arr.length-2]}.png`;
  // }

  showPokemon(pokemon: PokemonData){
    this.http.get<Pokemon>(pokemon.url)
    .subscribe(response=>{
      this.pokemonUrl = response.sprites.front_default;

    })
  }
}

