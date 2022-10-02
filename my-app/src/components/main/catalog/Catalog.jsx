import React from "react";
import Item from "./Product";
import { queryState } from "./query-state";
import { fetchFilters } from "./Api"
import SearchApp from "./Search";
import Checkbox from '@mui/material/Checkbox';
import Filters from "./Filters"

class Catalog extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            productsQueryStatus: queryState.initial,
            productsQueryError: null,

            titleSearchValue: '',
            priceFilterMin: 0,
            priceFilterMax: 0,
            isNewFilter: false,
            isInStockFilter: false,
        }
    }

    handleChangeSearchFilter = (titleSearchValue) => {
        this.setState({titleSearchValue} )
    }

    handleChangeIsNewFilter = (isNewFilter) => {
        this.setState({isNewFilter} )
    }

    handleChangeIsInStockFilter = (isInStockFilter) => {
        this.setState({isInStockFilter} )
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts(){
        this.setState({
            productsQueryStatus: queryState.loading
        })

        fetchFilters().then((productsList) => {
            this.setState({
                products: productsList,
                productsQueryStatus: queryState.success,
                productsQueryError: null,
            })
        }).catch((error) => {
            this.setState({
                productsQueryStatus: queryState.error,
                productsQueryError: error,
            })
        })

    }

    getFilteredProducts() {
        const {
            products,
            titleSearchValue,
            isNewFilter,
            isInStockFilter
        } = this.state

        return products.filter((product) => {
            let isPass = true;

            if(titleSearchValue.trim() !== ''){
                const isSearch = product.title.toLocaleLowerCase().includes(titleSearchValue.toLocaleLowerCase())
                isPass = isPass && isSearch
            }

            if(isNewFilter) {
                isPass = isPass && product.isNew;
            }

            if(isInStockFilter) {
                isPass = isPass && product.isInStock;
            }

            return isPass;

        })
    }



    render() {

        const {
            titleSearchValue,
            isNewFilter,
            isInStockFilter
        } = this.state

        const filterProducts = this.getFilteredProducts();

        return (
            <div className="catalog">
                <div className="container">
                    <div className="catalog-content">

                        <h3 className="catalog-title">Catalog</h3>

                        <SearchApp
                            titleSearchValue = {titleSearchValue}
                            handleChangeSearchFilter = {this.handleChangeSearchFilter}
                        />

                        <Filters
                            isNewFilter = {isNewFilter}
                            isInStockFilter = {isInStockFilter}
                            handleChangeIsNewFilter = {this.handleChangeIsNewFilter}
                            handleChangeIsInStockFilter = {this.handleChangeIsInStockFilter}
                        />



                        <div className="catalog-products">
                            {filterProducts.map((product) => (
                                <Item key={product.id} props={product} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        );
    }


}

export default Catalog;