import { Component } from "react";

export class Name extends Component{

    render(){
        const {text} = this.props;
        
        return(
            <div> Name: {text} </div>
        );
        
    }
}

