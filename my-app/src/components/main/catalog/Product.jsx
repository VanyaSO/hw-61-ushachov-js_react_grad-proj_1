import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

class MediaCard extends React.Component{

    render() {
        const { props } = this.props

        return(
            <Card className={props.isInStock ? 'card-product' : 'card-product no-Stock'} sx={{ maxWidth: 360 }}>
                <CardMedia
                    component="img"
                    height="240"
                    image={props.photo}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                    <p className="product-price">
                        ${props.price}
                    </p>
                    {props.isNew && (
                        <p className="product-new">New</p>
                    )}

                    {!props.isInStock && (
                        <p className="product-noStock">Не в наличии</p>
                    )}
                </CardContent>
            </Card>
        )
    }

}

export default MediaCard