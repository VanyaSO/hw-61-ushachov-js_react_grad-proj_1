import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const MediaCard = ({product}) => {
    const { isInStock, isNew, isSale, photo, id, title, description, price, rating} = product;

    return(
        <Card className={isInStock ? 'card-product' : 'card-product no-Stock'}>
            <CardMedia
                component="img"
                height="240"
                image={`${photo}?v=${id}`}
                alt="green iguana"
            />
            <CardContent>
                <div className="product-flag">
                    {isNew && (
                        <p className="product-new">New</p>
                    )}
                    {isSale && (
                        <p className="product-sale">Sale</p>
                    )}
                </div>

                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>

                <p className="product-price">${price}</p>

                <p className="product-rating">{`Рейтинг : ${rating}`}</p>


                {!isInStock && (
                    <p className="product-noStock">Не в наличии</p>
                )}

            </CardContent>
        </Card>
    )
}

export default MediaCard;