import { Component } from "react";

export class Name extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <p> name = "{this.props.name}"</p>
        );
        
    }
}

