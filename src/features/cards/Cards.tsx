import React from "react";
import {ProductCard} from "./productCard/ProductCard";
import s from './Cards.module.scss';

export const Cards = () => {
    return (
        <div className={s.cardsBlock}>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
        </div>
    )
}


