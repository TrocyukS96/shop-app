import CardContent from "@material-ui/core/CardContent"
import {Button, Card, CardActions, CardMedia} from "@material-ui/core";
import productWaffles from '../../../assets/images/products/products_img.jpg'
import s from './ProductCard.module.scss';
import {FC} from "react";
import {FreeShippingCard} from "../../../components/freeShippingCard/FreeShippingCard";

type ProductCardType = {
    img:any
    type:string
    name:string
    price:number
    freeShipping:boolean
}
export const ProductCard:FC<ProductCardType> = ({img, type, name,freeShipping,price}) => {
    return (
        <Card className={s.wrapper}>
            <CardContent className={s.content}>
                <CardMedia
                    component="img"
                    alt={name}
                    height="250"
                    image={img}
                    className={s.cardImg}
                />
                <h5 className={s.name}>{name}</h5>
                <h6 className={s.skatesType}>{type}</h6>
                <p className={s.price}>{price} BYN</p>
            </CardContent>
            {freeShipping && <FreeShippingCard className={s.freeCard}/>}
            <CardActions style={{justifyContent:"center"}}>
                <Button size="small" variant='contained' color='primary'  className={s.cardBtn} >add to cart</Button>
            </CardActions>
        </Card>
    )
}


