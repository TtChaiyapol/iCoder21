import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pokemon, PokemonData, PokemonResponse } from '../pokemon';

@Component({
  selector: 'app-pokemon-go',
  templateUrl: './pokemon-go.component.html',
  styleUrls: ['./pokemon-go.component.css']
})
export class PokemonGoComponent implements OnInit {
  // cities:any[] = [];
  // cityFormControl = new FormControl();
  pokemonUrl: string = '';
  pokemonDataList: PokemonData[]= [];
  pokemonFormControl = new FormControl();
  image_sprites: string[] = [];
  abilities:string[] = [];
 
  constructor(private http: HttpClient) { 
  //   this.cities = [
  //     {name: 'New York', code: 'NY'},
  //     {name: 'Rome', code: 'RM'},
  //     {name: 'London', code: 'LDN'},
  //     {name: 'Istanbul', code: 'IST'},
  //     {name: 'Paris', code: 'PRS'}
  // ];

  this.http.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200')
  .subscribe(response=>{
    this.pokemonDataList = response.results
  })

  }

  ngOnInit(): void {
  }

  selectedPokemon(event:{originalEvent:any, value:PokemonData}){
    const pokemon = event.value

    this.http.get<Pokemon>(pokemon.url)
    .subscribe((response) => {
      
      this.abilities = response.abilities.map(abi => abi.ability.name);

      this.image_sprites = Object.keys(response.sprites)
      .filter(sprite => sprite.startsWith('back') || sprite.startsWith('front'))
      .filter(sprite => (response.sprites as any)[sprite]!== null)
      .map(sprite =>(response.sprites as any)[sprite])

    })
    
  }
}
