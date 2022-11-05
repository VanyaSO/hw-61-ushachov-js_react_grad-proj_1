import React, {useState, useEffect, useCallback, useMemo, memo} from "react";
import Item from "./ProductCard";
import { queryState } from "./query-state";
import { fetchProducts, fetchCategories } from "./api"
import SearchApp from "./Filters/Search";
import Filters from "./Filters/Filters"
import CircularIndeterminate from "./Loading";

const Catalog = memo(() => {
    const [products, setProducts] = useState([])
    const [productsQueryStatus, setProductsQueryStatus] = useState([])
    const [productsQueryError, setProductsQueryError] = useState(queryState.initial)

    const [titleSearchValue, setTitleSearchValue] = useState('');
    const [selectCategory, setSelectCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [priceFilterMin, setPriceFilterMin] = useState('');
    const [priceFilterMax, setPriceFilterMax] = useState(99999);
    const [ratingFilterMin, setRatingFilterMin] = useState('');
    const [ratingFilterMax, setRatingFilterMax] = useState(100);
    const [isNewFilter, setIsNewFilter] = useState(false);
    const [isInStockFilter, setIsInStockFilter] = useState(false);
    const [isSaleFilter, setIsSaleFilter] = useState(false);

    useEffect(() => {
        setProductsQueryStatus(queryState.loading);

        fetchProducts()
            .then((productsList) => {
                setProducts(productsList)
                setProductsQueryStatus(queryState.success);
                setProductsQueryError(null);
            }).catch((error) => {
            setProductsQueryStatus(queryState.error);
            setProductsQueryError(error);
        })

        fetchCategories()
            .then((categoriesList) => {
                setCategories(categoriesList)
            })
    }, []);

    const handleChangeSearchFilter = useCallback((titleSearchValue) => {
        setTitleSearchValue(titleSearchValue)
    },[])

    const handleChangeFilterCategories = useCallback((selectCategory) => {
        setSelectCategory(selectCategory);
    },[])

    const handlePriceFilter = useCallback((priceFilterMin, priceFilterMax) => {
        setPriceFilterMin(priceFilterMin);
        setPriceFilterMax(priceFilterMax);
    },[])

    const handleRatingFilter = useCallback((ratingFilterMin, ratingFilterMax) => {
        setRatingFilterMin(ratingFilterMin);
        setRatingFilterMax(ratingFilterMax);
    },[])

    const handleChangeIsNewFilter = useCallback((isNewFilter) => {
        setIsNewFilter(isNewFilter)
    },[])

    const handleChangeIsInStockFilter = useCallback((isInStockFilter) => {
        setIsInStockFilter(isInStockFilter)
    },[])

    const handleChangeIsSaleFilter = useCallback((isSaleFilter) => {
        setIsSaleFilter(isSaleFilter);
    },[])

    const handleFilterReset = useCallback(() => {
        setTitleSearchValue('');
        setSelectCategory('');
        setPriceFilterMin('')
        setPriceFilterMax(99999);
        setRatingFilterMin('');
        setRatingFilterMax(100);
        setIsNewFilter(false);
        setIsInStockFilter(false);
        setIsSaleFilter(false);
    }, [])

    const filterProducts = useMemo(() => {
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
    },[productsQueryStatus, isNewFilter, isInStockFilter, isSaleFilter, titleSearchValue, selectCategory, ratingFilterMin, ratingFilterMax, priceFilterMin, priceFilterMax])

    const isLoading = useMemo(() => productsQueryStatus === queryState.loading || productsQueryStatus === queryState.initial, [productsQueryStatus])
    const isSuccess = useMemo(() => productsQueryStatus === queryState.success, [productsQueryStatus])
    const isError = useMemo(() => productsQueryStatus === queryState.error, [productsQueryError])


    return (
        <div className="catalog">
            <div className="container">
                <div className="catalog-content">

                    <h3 className="catalog-title">Catalog</h3>

                    <SearchApp
                        titleSearchValue = {titleSearchValue}
                        handleChangeSearchFilter = {handleChangeSearchFilter}
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

                            handleChangeFilterCategory = {handleChangeFilterCategories}
                            handleChangeIsNewFilter = {handleChangeIsNewFilter}
                            handleChangeIsInStockFilter = {handleChangeIsInStockFilter}
                            handleChangeIsSaleFilter = {handleChangeIsSaleFilter}
                            handlePriceFilter = {handlePriceFilter}
                            handleRatingFilter = {handleRatingFilter}
                            handleFilterReset = {handleFilterReset}
                        />

                        {isLoading && (
                            <CircularIndeterminate/>
                        )}

                        {!isLoading && isSuccess && (
                            <div className="catalog-products">
                                {filterProducts.map((product) => (
                                    <Item key={product.id} product={product} />
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
    )
})


export default Catalog;