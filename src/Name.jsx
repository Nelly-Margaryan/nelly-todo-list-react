import { Component } from "react";

export class Name extends Component{

    render(){
        const {text} = this.props;
        
        return(
            <span> {text} </span>
        );
        
    }
}

