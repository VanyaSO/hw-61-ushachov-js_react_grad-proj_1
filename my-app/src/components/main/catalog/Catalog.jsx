import React from "react";
import Item from "./ProductCard";
import { queryState } from "./query-state";
import { fetchFilters, fetchCategories } from "./api"
import SearchApp from "./Filters/Search";
import Filters from "./Filters/Filters"

class Catalog extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            productsQueryStatus: queryState.initial,
            productsQueryError: null,

            selectCategory:'',
            categories: [],
            titleSearchValue: '',
            priceFilterMin: '',
            priceFilterMax: 99999,
            ratingFilterMin: '',
            ratingFilterMax: 100,
            isNewFilter: false,
            isInStockFilter: false,
            isSaleFilter: false,
        }
    }

    handleChangeFilterCategories = (selectCategory) => {
        this.setState({selectCategory})
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

    handleChangeIsSaleFilter = (isSaleFilter) => {
        this.setState({isSaleFilter} )
    }

    handlePriceFilter = (priceFilterMin, priceFilterMax) => {
        this.setState({priceFilterMin, priceFilterMax})
    }

    handleRatingFilter = (ratingFilterMin, ratingFilterMax) => {
        this.setState({ratingFilterMin, ratingFilterMax})
    }

    componentDidMount(){
        this.loadProducts();
        this.loadCategories();
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

    loadCategories(){
        fetchCategories().then((categoriesList) => {
            this.setState({
                categories: categoriesList
            })
        })
    }


    handleFilterReset = () => {
        this.setState({
            selectCategory:'',
            titleSearchValue: '',
            priceFilterMin: '',
            priceFilterMax: 99999,
            ratingFilterMin: '',
            ratingFilterMax: 100,
            isNewFilter: false,
            isInStockFilter: false,
            isSaleFilter: false,
        })
    }

    getFilteredProducts() {
        const {
            products,
            selectCategory,
            titleSearchValue,
            isNewFilter,
            isInStockFilter,
            isSaleFilter,
            priceFilterMin,
            priceFilterMax,
            ratingFilterMin,
            ratingFilterMax
        } = this.state

        return products.filter((product) => {
            let isPass = true;

            if(titleSearchValue.trim() !== ''){
                const isSearch = product.title.toLocaleLowerCase().includes(titleSearchValue.toLocaleLowerCase())
                isPass = isPass && isSearch
            }

            if(selectCategory){
                isPass = isPass && product.categories.includes(selectCategory);
            }

            if(isNewFilter) {
                isPass = isPass && product.isNew;
            }

            if(isInStockFilter) {
                isPass = isPass && product.isInStock;
            }

            if(isSaleFilter) {
                isPass = isPass && product.isSale;
            }

            const price = parseFloat(product.price)
            isPass = isPass && (
                price >= priceFilterMin && price <= priceFilterMax
            )

            const rating = parseFloat(product.rating)
            isPass = isPass && (
                rating >= ratingFilterMin && rating <= ratingFilterMax
            )

            return isPass;

        })
    }



    render() {

        const {
            products, productsQueryStatus, productsQueryError,
            selectCategory, categories,
            titleSearchValue,
            isNewFilter, isInStockFilter, isSaleFilter,
            priceFilterMin, priceFilterMax,
            ratingFilterMin, ratingFilterMax,
        } = this.state

        const isLoading = productsQueryStatus === queryState.loading || productsQueryStatus === queryState.initial
        const isSuccess = productsQueryStatus === queryState.success
        const isError = productsQueryStatus === queryState.error

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

                        <div className="catalog-filters-product">
                            <Filters
                                filterProductsLeng={filterProducts.length}
                                productsLeng={products.length}
                                selectCategory = {selectCategory}
                                categories = {categories}
                                isNewFilter = {isNewFilter}
                                isInStockFilter = {isInStockFilter}
                                isSaleFilter = {isSaleFilter}
                                priceFilterMin = {priceFilterMin}
                                priceFilterMax = {priceFilterMax}
                                ratingFilterMin = {ratingFilterMin}
                                ratingFilterMax = {ratingFilterMax}
                                handleChangeFilterCategory = {this.handleChangeFilterCategories}
                                handleChangeIsNewFilter = {this.handleChangeIsNewFilter}
                                handleChangeIsInStockFilter = {this.handleChangeIsInStockFilter}
                                handleChangeIsSaleFilter = {this.handleChangeIsSaleFilter}
                                handlePriceFilter = {this.handlePriceFilter}
                                handleRatingFilter = {this.handleRatingFilter}
                                handleFilterReset = {this.handleFilterReset}
                            />

                            {isLoading && (
                                <div>Loading....</div>
                            )}

                            {!isLoading && isSuccess && (
                                <div className="catalog-products">
                                    {filterProducts.map((product) => (
                                        <Item key={product.id} props={product} />
                                    ))}
                                </div>
                            )}

                            {!isLoading && isError && (
                                <div style={{ color: 'red' }}>
                                    {productsQueryError?.message || 'Something went wrong'}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        );
    }


}

export default Catalog;