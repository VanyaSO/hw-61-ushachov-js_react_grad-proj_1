import * as React from 'react';
import {memo} from "react";
import PropTypes from "prop-types";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {styled} from "@mui/material/styles";

const MediaCard = memo(({product}) => {
    const { isInStock, isNew, isSale, photo, id, title, description, price, rating} = product;
    return(
        <Card className={isInStock ? 'card-product' : 'card-product no-Stock'}>
            <CardMedia
                className="product-img"
                component="img"
                height="240"
                image={`${photo}?v=${id}`}
                alt="green iguana"
            />
            <CardContent className='product-text-content'>
                <div className="product-flag">
                    {isNew && (
                        <div className="product-flag-bg">
                            <p className="product-new">New</p>
                        </div>

                    )}
                    {isSale && (
                        <div className="product-flag-bg">
                            <p className="product-sale">Sale</p>
                        </div>

                    )}
                </div>

                <Typography className="product-title" gutterBottom variant="h5" component="div">
                    {title}
                </Typography>

                {/*<Typography variant="body2" color="text.secondary">*/}
                {/*    {description}*/}
                {/*</Typography>*/}

                <div className="product-info">
                    <div>
                        <h3>Prise</h3>
                        {isInStock ? <p className="product-price">{price} $</p> : <p className="product-price">Not for sale</p>}

                    </div>
                    <div>
                        <h3>Rating</h3>
                        <p className="product-rating">{`${rating}`}</p>
                    </div>
                </div>


            </CardContent>
        </Card>
    )
})

MediaCard.propTypes = {
    product: PropTypes.shape({
        isInStock: PropTypes.bool,
        isNew: PropTypes.bool,
        isSale: PropTypes.bool,
        photo: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.string,
        rating: PropTypes.number,
    })

}

export default MediaCard;