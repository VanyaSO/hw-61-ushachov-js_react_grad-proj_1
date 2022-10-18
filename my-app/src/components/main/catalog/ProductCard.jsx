import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

class MediaCard extends React.Component{

    render() {
        const { props } = this.props

        return(
            <Card className={props.isInStock ? 'card-product' : 'card-product no-Stock'}>
                <CardMedia
                    component="img"
                    height="240"
                    image={`${props.photo}?v=${props.id}`}
                    alt="green iguana"
                />
                <CardContent>
                    <div className="product-flag">
                        {props.isNew && (
                            <p className="product-new">New</p>
                        )}
                        {props.isSale && (
                            <p className="product-sale">Sale</p>
                        )}
                    </div>

                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>

                    <p className="product-price">${props.price}</p>

                    <p className="product-rating">{`Рейтинг : ${props.rating}`}</p>


                    {!props.isInStock && (
                        <p className="product-noStock">Не в наличии</p>
                    )}

                </CardContent>
            </Card>
        )
    }

}

export default MediaCard