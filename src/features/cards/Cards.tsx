import React from "react";
import {ProductCard} from "./productCard/ProductCard";
import s from './Cards.module.scss';
import {AddCardForm} from "./addCardForm/AddCardForm";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../store";
import {addPurchase} from "../cart/cartReducer";
import { removeCard } from "./cards-reducer";
import {CardType} from "../../utils/types";
import {RequestStatusType} from "../application/application-reducer";
import {CircularProgress} from "@material-ui/core";

export const Cards = React.memo(() => {
    //hooks
    const dispatch = useDispatch()
    const cards = useSelector<RootStateType, Array<CardType>>(state => state.cards.cards)
    const status = useSelector<RootStateType, RequestStatusType>(st => st.app.status)

    //functions
    const addItemToCart = (itemId:string)=>{
        dispatch(addPurchase(itemId))
    }
    const deleteCard =(itemId:string)=>{
        dispatch(removeCard(itemId))
    }
    return (
        <div className={s.wrapper}>
            <h2>Skates</h2>
            <div className={s.columns}>
                <div className={s.cardsBlock}>
                    {status === 'loading' && <CircularProgress style={{width:'100px', height:'100px'}}/>}
                    {
                        cards.map((c: CardType, i: number) => {
                            return <ProductCard
                                img={c.image}
                                type={c.type}
                                name={c.name}
                                price={c.price}
                                freeShipping={c.freeShipping}
                                cardId={c.cardId}
                                key={i}
                                addItemToCart={addItemToCart}
                                deleteCard={deleteCard}
                            />
                        })
                    }
                </div>
                <AddCardForm/>
            </div>
        </div>
    )
})


