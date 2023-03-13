import { Component } from "react";

export class Price extends Component{

    render (){
        const {text} = this.props;
        
        return (
            <span>{text}</span>
        );
    }
}