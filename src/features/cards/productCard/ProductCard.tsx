import CardContent from "@material-ui/core/CardContent"
import {Button, Card, CardActions, CardMedia} from "@material-ui/core";
import productWaffles from '../../../assets/images/products/products_img.jpg'
import s from './ProductCard.module.scss';

export const ProductCard = () => {
    return (
        <Card >
            <CardContent className={s.contnent}>
                <CardMedia
                    component="img"
                    alt="waffles"
                    height="140"
                    image={productWaffles}
                />
                123
            </CardContent>
            <CardActions style={{justifyContent:"center"}}>
                <Button size="small" className={s.cardBtn}>Learn More</Button>
            </CardActions>
        </Card>
    )
}


