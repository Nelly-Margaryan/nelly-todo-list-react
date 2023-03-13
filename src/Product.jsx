import { Component } from "react";
import {Name} from "./Name";
import {Price} from "./Price";
import {Description} from "./Description";




class Product extends Component {

    render(){
        const {name, price, description} = this.props;
        
        return (
            <div>
                <Name text = {name}/> :  
                <Price text = {price}/> :  
                <Description text = {description}/>
                <hr />
            </div>
        );
        
    }
}

export default Product;


