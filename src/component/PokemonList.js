import React, { Component } from 'react'
import axios from 'axios'
import Pokemon from './Pokemon'


class PokemonList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            pokemons: [],
            pokemonNames: [],
            pokemonIds: [],
            pokemonStats: [],
            pokemonTypes: [],
            isSelected: "Select"
        }
    }
    
    generatePokemons() {
        let ids = this.state.pokemonIds
        let names = this.state.pokemonNames
        let stats = this.state.pokemonStats
        let types = this.state.pokemonTypes
        for (let i = 0; i < 8; i++) {
            let n = Math.floor(Math.random() * 151) + 1
            while (ids.includes(n)) {
                n = Math.floor(Math.random() * 151) + 1
            }

            axios.get("https://pokeapi.co/api/v2/pokemon/" + n).then(
            response => {
                const data = response.data
                const name = data.name
                const base_stats = data.stats[0].base_stat
                const type = data.types.map(t => t.type.name)
                names[i] = name
                ids[i] = data.id
                stats[i] = base_stats
                types[i] = type
                this.setState({
                    pokemonIds: ids,
                    pokemonNames: names,
                    pokemonStats: stats,
                    pokemonTypes: types,
                })
            }).catch()
            
        }
    }

    componentDidMount() {
        this.generatePokemons()
    }

    clickSelectButton() {
        if (this.state.isSelected == "Select") {
            this.select()
        } else {
            this.unSelect()
        }
    }

    select() {
        this.setState({
            isSelected: "Selected"
            //TODO: change the total number selected
        })
    }

    unSelect() {
        this.setState({
            isSelected: "Select"
            //TODO: change the total number selected
        })
    }

    render() {
        return (
            <div>
             
        <button onClick = {() => this.generatePokemons()}>Generate Pokemons</button>
        
        <Pokemon 
          name = {"Fighter 1: " + this.state.pokemonNames[0]} id = {this.state.pokemonIds[0]}
          click = {this.clickSelectButton}
        >
          <p>{"base_stat: " + this.state.pokemonStats[0]}</p>
          <p>{"type: " + this.state.pokemonTypes[0]}</p>
        </Pokemon>

        <Pokemon name = {"Fighter 2: " + this.state.pokemonNames[1]} id = {this.state.pokemonIds[1]}>
          <p>{"base_stat: " + this.state.pokemonStats[1]}</p>
          <p>{"type: " + this.state.pokemonTypes[1]}</p>
        </Pokemon>

        <Pokemon name = {"Fighter 3: " + this.state.pokemonNames[2]} id = {this.state.pokemonIds[2]}>
          <p>{"base_stat: " + this.state.pokemonStats[2]}</p>
          <p>{"type: " + this.state.pokemonTypes[2]}</p>
        </Pokemon>

        <Pokemon name = {"Fighter 4: " + this.state.pokemonNames[3]} id = {this.state.pokemonIds[3]}>
          <p>{"base_stat: " + this.state.pokemonStats[3]}</p>
          <p>{"type: " + this.state.pokemonTypes[3]}</p>
        </Pokemon>

        <Pokemon name = {"Fighter 5: " + this.state.pokemonNames[4]} id = {this.state.pokemonIds[4]}>
          <p>{"base_stat: " + this.state.pokemonStats[4]}</p>
          <p>{"type: " + this.state.pokemonTypes[4]}</p>
        </Pokemon>

        <Pokemon name = {"Fighter 6: " + this.state.pokemonNames[5]} id = {this.state.pokemonIds[5]}>
          <p>{"base_stat: " + this.state.pokemonStats[5]}</p>
          <p>{"type: " + this.state.pokemonTypes[5]}</p>
        </Pokemon>

        <Pokemon name = {"Fighter 7: " + this.state.pokemonNames[6]} id = {this.state.pokemonIds[6]}>
          <p>{"base_stat: " + this.state.pokemonStats[6]}</p>
          <p>{"type: " + this.state.pokemonTypes[6]}</p>
        </Pokemon>

        <Pokemon name = {"Fighter 8: " + this.state.pokemonNames[7]} id = {this.state.pokemonIds[7]}>
          <p>{"base_stat: " + this.state.pokemonStats[7]}</p>
          <p>{"type: " + this.state.pokemonTypes[7]}</p>
        </Pokemon>

            </div>
        )
    }
}

export default PokemonList

