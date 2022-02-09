import React from "react";
import {ProductCard} from "./productCard/ProductCard";
import s from './Cards.module.scss';
import {AddCardForm} from "./addCardForm/AddCardForm";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../app/store";
import { FilteredCardType } from "../../utils/types";
import {addPurchase} from "../../bll/cartReducer";
import { removeCard } from "../../bll/cards-reducer";

export const Cards = () => {
    //hooks
    const dispatch = useDispatch()
    // @ts-ignore
    const cards = useSelector<RootStateType, Array<FilteredCardType> | FilteredCardType[]>(state => state.cards.cards)

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
                    {
                        cards.map((c: FilteredCardType, i: number) => {
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
}


