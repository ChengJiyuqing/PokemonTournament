import React, { useState, useEffect, Component } from 'react';

class Pokemon extends Component {
    constructor() {
        super()
        this.state = {
            isSelected: "Select"
        }
    }

    clickSelectButton() {
        if (this.isSelected == "Select") {
            this.select()
        } else {
            this.unSelect()
        }
    }

    select() {
        this.setState({
            isSelected: "Selected"
            //TODO: change display of button
        })
    }

    unSelect() {
        this.setState({
            isSelected: "Select"
            //TODO: change display of button
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
                {this.props.children}
                <button onClick = {() => this.select}>{this.state.isSelected}</button>
            </div>
        )
    }
}

export default Pokemon