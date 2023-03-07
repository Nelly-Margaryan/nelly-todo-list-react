import { Component } from "react";

export class Price extends Component{
    constructor(props){
        super(props);
    }

    render (){
        return (
            <p> price = "{this.props.price}"</p>
        );
    }
}