import React from "react";
import {ProductCard} from "./productCard/ProductCard";
import s from './Cards.module.scss';
import {AddCardForm} from "./addCardForm/AddCardForm";
import {useSelector} from "react-redux";
import {RootStateType} from "../../app/store";
import { FilteredCardType } from "../../utils/types";

export const Cards = () => {
    // @ts-ignore
    const cards = useSelector<RootStateType, Array<FilteredCardType> | FilteredCardType[]>(state => state.cards.cards)
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
                            />
                        })

                    }
                </div>
                <AddCardForm/>
            </div>
        </div>
    )
}


