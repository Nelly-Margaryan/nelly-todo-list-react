import { Component } from "react";

export class Description extends Component{
    constructor(props){
        super(props);
    }

    render (){
        return (
            <p> price = "{this.props.description}"</p>
        );
    }
}

