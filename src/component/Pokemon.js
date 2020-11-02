import React, { useState, useEffect, Component } from 'react';

class Pokemon extends Component {
    constructor() {
        super()
        this.state = {
            isSelected: "Select",
        }
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
                <h3> {this.props.name} </h3>
                {
                //TODO: add base_stats
                //TODO: add type
                }
                <img
                src = {"https://pokeres.bastionbot.org/images/pokemon/" + this.props.id + ".png"}
                alt = "new"
                width = "200"
                height = "200"
                />
                {this.props.children}
                <button onClick = {() => this.props.click()}>{this.state.isSelected}</button>
            </div>
        )
    }
}

export default Pokemon