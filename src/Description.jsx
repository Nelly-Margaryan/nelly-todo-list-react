import { Component } from "react";

export class Description extends Component{

    render (){
        const {text} = this.props;

        return (
            <div> Description: {text}</div>
        );
    }
}

