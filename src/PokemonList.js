import React, { Component } from 'react'
import axios from 'axios'
import Pokemon from './Pokemon'
import TypeTable from './TypeTable'


class PokemonList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            alivePokemons: [true, true, true, true, true, true, true, true],
            pokemonNames: [],
            pokemonIds: [],
            pokemonStats: [],
            pokemonTypes: [],
            totalNumSelected: 0,
            selected: ["Select", "Select", "Select", "Select", "Select", "Select", "Select", "Select"],
            message: "Please select two pokemons to begin their fight"

        }
    }
    
    generatePokemons() {
        this.setState({
            alivePokemons: [true, true, true, true, true, true, true, true],
            pokemonNames: [],
            pokemonIds: [],
            pokemonStats: [],
            pokemonTypes: [],
            totalNumSelected: 0,
            selected: ["Select", "Select", "Select", "Select", "Select", "Select", "Select", "Select"],
            message: "Please select two pokemons to begin their fight"
        })

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
        console.log(ids)
    }

    componentDidMount() {
        this.generatePokemons()
    }

    clickSelectButton(index) {
        //TODO: assert that total number selected <= 2
        if (this.state.selected[index] == "Select") {
            if (this.state.totalNumSelected >= 2) {
                this.setState({message: "You can only choose two pokemons"})
            } else {
                if (this.state.totalNumSelected == 1) {
                    this.setState({message: "Let's begin fight!"})
                }
                this.select(index)
            }
        } else if (this.state.selected[index] == "Selected") {
            this.unSelect(index)
            this.setState({message: "Please select two pokemons to begin their fight"})
        } else {
            this.setState({message: "This pokemon has fainted, please select another one to fight"})

        }
    }

    select(index) {
        let arr = this.state.selected
        arr[index] = "Selected"
        this.setState({
            totalNumSelected: this.state.totalNumSelected + 1,
            selected: arr
        })
    }

    unSelect(index) {
        let arr = this.state.selected
        arr[index] = "Select"
        this.setState({
            totalNumSelected: this.state.totalNumSelected - 1,
            selected: arr
        })
    }

    pokemonFight(a, b) {

        let table = new TypeTable()
        let alivePokemons = this.state.alivePokemons;
        let selectedPokemons = this.state.selected;
        const typeA = this.state.pokemonTypes[a];
        const typeB = this.state.pokemonTypes[b];
        let strengthA = this.state.pokemonStats[a];
        let strengthB = this.state.pokemonStats[b];

        for (let i = 0; i < typeA.length; i++) {
                const A = typeA[i]
                for (let j = 0; j < typeB.length; j++) {
                    const B = typeB[j]
                    const isAweakened = table.isWeakened(A, B);
                    const isBweakened = table.isWeakened(B, A);
                    const isAstrenghened = table.isStrengthened(A, B);
                    const isBstrenghened = table.isStrengthened(B, A);

                if (isAweakened) {
                    strengthA = Math.floor(strengthA * 0.5)
                } 
        
                if (isAstrenghened) {
                    strengthA = strengthA * 2
                }

                if (isBweakened) {
                    strengthB = Math.floor(strengthB * 0.5)
                } 
        
                if (isBstrenghened) {
                    strengthB = strengthB * 2
                }
                }
                
            
        }

        

        if (strengthA > strengthB) {
            alivePokemons[b] = false;
            selectedPokemons[b] = "Fainted"
            this.setState({alivePokemons: alivePokemons, selected: selectedPokemons,
            totalNumSelected: this.state.totalNumSelected - 1,
            message: "" + this.state.pokemonNames[a] + " won, let's have another round"
            })
        } else if (strengthA < strengthB) {
            alivePokemons[a] = false;
            selectedPokemons[a] = "Fainted"
            this.setState({alivePokemons: alivePokemons, selected: selectedPokemons,
                totalNumSelected: this.state.totalNumSelected - 1, 
                message: "" + this.state.pokemonNames[b] + " won, let's have another round"
            })
        } else {
            this.setState({message: "We have a draw! Let's choose two different pokemons to fight"})
        }

        let aliveNum = 0;

        for (let i = 0; i < 8; i++) {
            if (this.state.alivePokemons[i] == true) {
                aliveNum++
            }
        }

        if (aliveNum == 1) {
            this.setState({message: "Now we have a winner!"})
        }

    }

    getPokemonsToFight() {
        let result = []

        for (let i = 0; i < 8; i++) {
            if (this.state.selected[i] == "Selected") {
                result.push(i)
            }
        }
        return result;
    }

    clickFightButton() {
        let aliveNum = 0;

        for (let i = 0; i < 8; i++) {
            if (this.state.alivePokemons[i] == true) {
                aliveNum++
            }
        }

        if (aliveNum == 1) {
            this.setState({message: "Now we have a winner!"})
            return
        }

        const arr = this.getPokemonsToFight()
        if (arr.length < 2) {
            this.setState({message: "Please select 2 pokemons"})
        } else {
            this.pokemonFight(arr[0], arr[1])
        }
    }

    render() {
        return (
            <div>
             
        <button onClick = {() => this.generatePokemons()}>(Re)Generate Pokemons</button>
        <h3 style={{ fontSize: 25, color: '#0693E3', fontFamily: "Helvetica"}}>{this.state.message}</h3>
        <button onClick = {() => this.clickFightButton()}>Begin Fight!</button>

        <Pokemon 
          name = {"Fighter 1: " + this.state.pokemonNames[0]} id = {this.state.pokemonIds[0]}
          click = {() => this.clickSelectButton(0)} isSelected = {this.state.selected[0]}
          isAlive = {this.state.alivePokemons[0]}
        >
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"base_stat: " + this.state.pokemonStats[0]}</p>
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"type: " + this.state.pokemonTypes[0]}</p>
        </Pokemon>


        <Pokemon name = {"Fighter 2: " + this.state.pokemonNames[1]} id = {this.state.pokemonIds[1]}
          click = {() => this.clickSelectButton(1)} isSelected = {this.state.selected[1]}
          isAlive = {this.state.alivePokemons[1]}
        >
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"base_stat: " + this.state.pokemonStats[1]}</p>
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"type: " + this.state.pokemonTypes[1]}</p>
        </Pokemon>


        <Pokemon name = {"Fighter 3: " + this.state.pokemonNames[2]} id = {this.state.pokemonIds[2]}
          click = {() => this.clickSelectButton(2)} isSelected = {this.state.selected[2]}
          isAlive = {this.state.alivePokemons[2]}
        >
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"base_stat: " + this.state.pokemonStats[2]}</p>
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"type: " + this.state.pokemonTypes[2]}</p>
        </Pokemon>


        <Pokemon name = {"Fighter 4: " + this.state.pokemonNames[3]} id = {this.state.pokemonIds[3]}
          click = {() => this.clickSelectButton(3)} isSelected = {this.state.selected[3]}
          isAlive = {this.state.alivePokemons[3]}
        >
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"base_stat: " + this.state.pokemonStats[3]}</p>
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"type: " + this.state.pokemonTypes[3]}</p>
        </Pokemon>


        <Pokemon name = {"Fighter 5: " + this.state.pokemonNames[4]} id = {this.state.pokemonIds[4]}
          click = {() => this.clickSelectButton(4)} isSelected = {this.state.selected[4]}
          isAlive = {this.state.alivePokemons[4]}
        >
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"base_stat: " + this.state.pokemonStats[4]}</p>
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"type: " + this.state.pokemonTypes[4]}</p>
        </Pokemon>


        <Pokemon name = {"Fighter 6: " + this.state.pokemonNames[5]} id = {this.state.pokemonIds[5]}
          click = {() => this.clickSelectButton(5)} isSelected = {this.state.selected[5]}
          isAlive = {this.state.alivePokemons[5]}
        >
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"base_stat: " + this.state.pokemonStats[5]}</p>
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"type: " + this.state.pokemonTypes[5]}</p>
        </Pokemon>

        <Pokemon name = {"Fighter 7: " + this.state.pokemonNames[6]} id = {this.state.pokemonIds[6]}
          click = {() => this.clickSelectButton(6)} isSelected = {this.state.selected[6]}
          isAlive = {this.state.alivePokemons[6]}
        >
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"base_stat: " + this.state.pokemonStats[6]}</p>
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"type: " + this.state.pokemonTypes[6]}</p>
        </Pokemon>

        <Pokemon name = {"Fighter 8: " + this.state.pokemonNames[7]} id = {this.state.pokemonIds[7]}
          click = {() => this.clickSelectButton(7)} isSelected = {this.state.selected[7]}
          isAlive = {this.state.alivePokemons[7]}
        >
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"base_stat: " + this.state.pokemonStats[7]}</p>
          <p style={{ fontSize: 12, fontFamily: "Helvetica"}}>{"type: " + this.state.pokemonTypes[7]}</p>
        </Pokemon>
            </div>
        )
    }
}

export default PokemonList

