import React, { useState, useEffect, Component } from 'react';
import PokemonList from './component/PokemonList';
import Axios from 'axios';
import Pokemon from './component/Pokemon';
import Greeting from './component/Greeting'

class App extends Component {
  render() {
    return (
      <div className = "App">
        <Greeting></Greeting>
        <button>Generate Pokemons</button>
        {
          //TODO: add name, stats and type to all pokemons
        }
        <Pokemon name = "pokemon 1">
          <p>add subcomponents</p>
        </Pokemon>

        <Pokemon name = "pokemon 2">
          <p>add subcomponents</p>
        </Pokemon>

        <Pokemon name = "pokemon 3">
          <p>add subcomponents</p>
        </Pokemon>

        <Pokemon name = "pokemon 4">
          <p>add subcomponents</p>
        </Pokemon>

        <Pokemon name = "pokemon 5">
          <p>add subcomponents</p>
        </Pokemon>

        <Pokemon name = "pokemon 6">
          <p>add subcomponents</p>
        </Pokemon>

        <Pokemon name = "pokemon 7">
          <p>add subcomponents</p>
        </Pokemon>

        <Pokemon name = "pokemon 8">
          <p>add subcomponents</p>
        </Pokemon>
        <button>Begin Fight!</button>
      </div>
    );
  }
}

export default App;
