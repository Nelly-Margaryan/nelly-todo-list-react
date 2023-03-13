import { Component } from "react";

export class Description extends Component{

    render (){
        const {text} = this.props;

        return (
            <span>{text}</span>
        );
    }
}

