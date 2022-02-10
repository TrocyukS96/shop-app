import CardContent from "@material-ui/core/CardContent"
import {Button, CardActions, CardMedia} from "@material-ui/core";
import s from './ProductCard.module.scss';
import {FC} from "react";
import {FreeShippingCard} from "../../../components/freeShippingCard/FreeShippingCard";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../store";
import {RequestStatusType} from "../../application/application-reducer";
import React from "react";

type ProductCardType = {
    img: any
    type: string
    name: string
    price: number
    freeShipping: boolean
    cardId?: string
    addItemToCart: (itemId: string) => void
    deleteCard: (itemId: string) => void
}
export const ProductCard: FC<ProductCardType> = React.memo((({
                                                     img,
                                                     type,
                                                     name,
                                                     freeShipping,
                                                     price,
                                                     cardId,
                                                     addItemToCart,
                                                     deleteCard
                                                 }) => {
    //hooks
    const status=useSelector<RootStateType, RequestStatusType>(st=>st.app.status)

    //handlers
    const addItemHandler = () => {
        cardId &&
        addItemToCart(cardId)
    }
    const removeItemHandler = () => {
        cardId &&
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
                <Button
                    size="small"
                    variant='contained'
                    color='primary'
                    className={s.cardBtn}
                    onClick={addItemHandler}
                    disabled={status==='loading'}
                >add
                    to cart</Button>
            </CardActions>
            <button
                className={s.deleteCardBtn}
                onClick={removeItemHandler}
                disabled={status==='loading'}
            >x</button>
        </div>
    )
}
))

