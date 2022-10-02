import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

class Filters extends React.Component{


    render() {
        const {
            handleChangeIsNewFilter,
            isNewFilter,
            handleChangeIsInStockFilter,
            isInStockFilter
        } = this.props

        const onChangeIsNew = () =>{
            handleChangeIsNewFilter(!isNewFilter)
        }

        const onChangeIsInStock = () => {
            handleChangeIsInStockFilter(!isInStockFilter);
        }

        return(
            <div className="catalog-filters">
                <label className="filter-IsNew" htmlFor="isNew">
                    <input type="checkbox" checked={isNewFilter} onChange={onChangeIsNew}/>
                    <span>Show new only</span>
                </label>

                <FormControlLabel control={<Switch checked={isInStockFilter} onChange={onChangeIsInStock}/>} className="filter-IsInStock" label="Наличие" />

            </div>
        );
    }
}

export default Filters