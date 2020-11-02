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
        <PokemonList></PokemonList>
        <button>Begin Fight!</button>
      </div>
    );
  }
}

export default App;
