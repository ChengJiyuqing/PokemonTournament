import React, { useState, useEffect, Component } from 'react';
import PokemonList from './PokemonList';
import Axios from 'axios';
import Pokemon from './Pokemon';
import Greeting from './Greeting'

class App extends Component {
  render() {
    return (
      <div className = "App">
        <Greeting></Greeting>
        <PokemonList></PokemonList>
      </div>
    );
  }
}

export default App;
