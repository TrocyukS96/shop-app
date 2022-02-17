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
            >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     width="24" height="24"
                     viewBox="0 0 24 24"
                >
                    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path></svg>
            </button>
        </div>
    )
}
))

