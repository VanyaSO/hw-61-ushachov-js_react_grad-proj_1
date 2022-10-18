import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

class Filters extends React.Component{


    render() {
        const {
            filterProductsLeng,productsLeng,
            selectCategory, categories,
            handleChangeFilterCategory,
            isNewFilter, handleChangeIsNewFilter,
            isInStockFilter, handleChangeIsInStockFilter,
            isSaleFilter, handleChangeIsSaleFilter,
            priceFilterMin, priceFilterMax, handlePriceFilter,
            ratingFilterMin, ratingFilterMax, handleRatingFilter,
            handleFilterReset
        } = this.props

        const filterCategoriesHandle = ( {target} ) => {
            handleChangeFilterCategory(target.id);
        }

        const onChangeIsNew = () =>{
            handleChangeIsNewFilter(!isNewFilter)
        }

        const onChangeIsInStock = () => {
            handleChangeIsInStockFilter(!isInStockFilter);
        }

        const onChangeIsSale = () =>{
            handleChangeIsSaleFilter(!isSaleFilter)
        }

        const onChangePriceMin = ({ target }) => {
            let value = parseInt(target.value)
            value = Number.isNaN(value) ? 0 : value

            handlePriceFilter(value, priceFilterMax)
        }

        const onChangePriceMax = ({ target }) => {
            let value = parseInt(target.value)
            value = Number.isNaN(value) ? 0 : value

            handlePriceFilter(priceFilterMin, value)
        }

        const onChangeRatingMin = ({ target }) => {
            let value = parseInt(target.value)
            value = Number.isNaN(value) ? 0 : value
            handleRatingFilter(value, ratingFilterMax)
        }

        const onChangeRatingMax = ({ target }) => {
            let value = parseInt(target.value)
            value = Number.isNaN(value) ? 0 : value
            handleRatingFilter(ratingFilterMin, value)
        }

        const filterResetHandle = () =>{
            handleFilterReset();
        }

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
    }
}

export default Filters