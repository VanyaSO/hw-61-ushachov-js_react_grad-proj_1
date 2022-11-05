import * as React from 'react';
import PropTypes from "prop-types";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {memo, useCallback} from "react";

const Filters = memo((props) => {

    const { filterProductsLeng, productsLeng } = props;
    const { selectCategory, categories, handleChangeFilterCategory } = props;
    const { isNewFilter, handleChangeIsNewFilter, isInStockFilter, handleChangeIsInStockFilter, isSaleFilter, handleChangeIsSaleFilter } = props;
    const { priceFilterMin, priceFilterMax, handlePriceFilter } = props;
    const { ratingFilterMin, ratingFilterMax, handleRatingFilter } = props;
    const { handleFilterReset } = props;

    const filterCategoriesHandle = useCallback(( {target} ) => {
        handleChangeFilterCategory(target.id);
    },[categories])

    const onChangeIsNew = useCallback(() => {
        handleChangeIsNewFilter(!isNewFilter)
    },[isNewFilter])

    const onChangeIsInStock = useCallback(() => {
        handleChangeIsInStockFilter(!isInStockFilter);
    },[isInStockFilter])

    const onChangeIsSale = useCallback(() => {
        handleChangeIsSaleFilter(!isSaleFilter)
    },[isSaleFilter])

    const onChangePriceMin = useCallback(({ target }) => {
        let value = parseInt(target.value)
        value = Number.isNaN(value) ? 0 : value

        handlePriceFilter(value, priceFilterMax)
    },[priceFilterMax])

    const onChangePriceMax = useCallback(({ target }) => {
        let value = parseInt(target.value)
        value = Number.isNaN(value) ? 0 : value

        handlePriceFilter(priceFilterMin, value)
    },[priceFilterMin])

    const onChangeRatingMin = useCallback(({ target }) => {
        let value = parseInt(target.value)
        value = Number.isNaN(value) ? 0 : value

        handleRatingFilter(value, ratingFilterMax)
    },[ratingFilterMax])

    const onChangeRatingMax = useCallback(({ target }) => {
        let value = parseInt(target.value)
        value = Number.isNaN(value) ? 0 : value

        handleRatingFilter(ratingFilterMin, value)
    },[ratingFilterMin])

    const filterResetHandle = useCallback(() => {
        handleFilterReset();
    },[])


    return(
        <div className="catalog-filters">
            <div>
                <h4 className='filters-title'>{`${filterProductsLeng}/${productsLeng}`}</h4>
                <h3 className='filters-title'>Filters</h3>
                <div className="filter-price">
                        <span>Price from
                            <input
                                onChange={onChangePriceMin}
                                placeholder="from"
                                value={priceFilterMin}
                                min={0}
                                max={priceFilterMax - 1}
                            />
                        </span>
                    <span>to
                            <input
                                onChange={onChangePriceMax}
                                placeholder="to"
                                value={priceFilterMax}
                                min={priceFilterMin + 1}
                            />
                        </span>
                </div>

                <label className="filter-IsNew" htmlFor="isNew">
                    <input type="checkbox"
                           checked={isNewFilter}
                           onChange={onChangeIsNew}
                    />
                    <span>New</span>
                </label>

                <label className="filter-IsSale" htmlFor="isSale">
                    <input type="checkbox"
                           checked={isSaleFilter}
                           onChange={onChangeIsSale}
                    />
                    <span>Sale</span>
                </label>

                <FormControlLabel
                    control={<Switch checked={isInStockFilter} onChange={onChangeIsInStock}/>}
                    className="filter-IsInStock"
                    label="Наличие"
                />

                <div className="filter-rating">
                    <span>Rating from:
                        <input onChange={onChangeRatingMin}
                               placeholder="from"
                               value={ratingFilterMin}
                               min={0}
                               max={ratingFilterMax - 1}
                        />
                    </span>
                    <span>to:
                        <input onChange={onChangeRatingMax}
                               placeholder="to"
                               value={ratingFilterMax}
                               min={ratingFilterMin + 1}
                        />
                    </span>
                </div>

                <h3 className='filters-title'>Categories</h3>
                <div className="filters-category">
                    <div onClick={filterCategoriesHandle} className={'' === selectCategory ? 'category categoryActive' : 'category'} >All</div>

                    {categories.map((category) =>(
                        <div onClick={filterCategoriesHandle} id={category.id} key={category.id} className={category.id === selectCategory ? 'category categoryActive' : 'category '}>{category.name}</div>
                    ))}
                </div>

                <div className="filter-reset" onClick={filterResetHandle}>
                    RESET
                </div>
            </div>

        </div>
    );
})

Filters.prototype = {
    filterProductsLeng: PropTypes.string,
    productsLeng: PropTypes.string,
    selectCategory: PropTypes.string,
    categories: PropTypes.array,
    isNewFilter: PropTypes.bool,
    isInStockFilter: PropTypes.bool,
    isSaleFilter: PropTypes.bool,
    priceFilterMin: PropTypes.number,
    priceFilterMax: PropTypes.number,
    ratingFilterMin: PropTypes.number,
    ratingFilterMax: PropTypes.number,
    handleChangeFilterCategory: PropTypes.func,
    handleChangeIsNewFilter: PropTypes.func,
    handleChangeIsInStockFilter: PropTypes.func,
    handleChangeIsSaleFilter: PropTypes.func,
    handlePriceFilter: PropTypes.func,
    handleRatingFilter: PropTypes.func,
    handleFilterReset: PropTypes.func,
}

export default Filters;