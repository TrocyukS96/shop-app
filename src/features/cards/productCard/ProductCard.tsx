import CardContent from "@material-ui/core/CardContent"
import {Button, CardActions, CardMedia} from "@material-ui/core";
import s from './ProductCard.module.scss';
import {FC} from "react";
import {FreeShippingCard} from "../../../components/freeShippingCard/FreeShippingCard";

type ProductCardType = {
    img: any
    type: string
    name: string
    price: number
    freeShipping: boolean
    cardId: string
    addItemToCart:(itemId:string)=>void
    deleteCard:(itemId:string)=>void
}
export const ProductCard: FC<ProductCardType> = ({img, type, name, freeShipping, price, cardId,addItemToCart, deleteCard}) => {
    //hooks

    //handlers
    const addItemHandler =()=>{
        addItemToCart(cardId)
    }
    const removeItemHandler =()=>{
        deleteCard(cardId)
    }
    return (
        <div className={s.wrapper}>
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
            <CardActions style={{justifyContent: "center"}}>
                <Button size="small" variant='contained' color='primary' className={s.cardBtn} onClick={addItemHandler}>add
                    to cart</Button>
            </CardActions>
            <button className={s.deleteCardBtn} onClick={removeItemHandler}>x</button>
        </div>
    )
}


