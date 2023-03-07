import { Component } from "react";
import {Name} from "./Name";
import {Price} from "./Price";
import {Description} from "./Description";


class Product extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <h3><Name name = "bananas"/> <Price price = "1$" /> <Description description = "Fresh bananas from Ecuador" /></h3>
        );
        
    }
}

export default Product;

