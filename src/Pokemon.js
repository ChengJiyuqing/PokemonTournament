import React, { useState, useEffect, Component } from 'react';

class Pokemon extends Component {
    constructor() {
        super()
        this.state = {
            isAlive: true
        }
    }

    render() {
        return (
            <div>
                <h3 style = {{fontFamily: "Helvetica", fontSize: 15, color: "#f47373"}}> {this.props.name} </h3>
                {
                //TODO: add base_stats
                //TODO: add type
                }
                <img
                src = {
                    this.props.isAlive?
                    "https://pokeres.bastionbot.org/images/pokemon/" + this.props.id + ".png"
                    :null
                }
                alt = "This pokemon has fainted"
                width = "100"
                height = "100"
                />
                {this.props.children}
                <button onClick = {() => this.props.click()}>{this.props.isSelected}</button>
            </div>
        )
    }
}

export default Pokemon