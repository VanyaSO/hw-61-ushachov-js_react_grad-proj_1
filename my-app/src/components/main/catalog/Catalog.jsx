import React from "react";
import Item from "./Product"

class Catalog extends React.Component{
    // static Products = Products;

    render() {
        const { products } = this.props;

        return (
            <div className="container">
                <div className="catalog-content">

                    <div className="catalog-search">
                        <input type="text"/>
                    </div>

                    <div className="catalog-filter">

                    </div>

                    <div className="catalog-products">
                        {products.map((item) => (
                            <Item props={item}/>
                        ))}
                    </div>

                </div>
            </div>
        );
    }


}

export default Catalog;