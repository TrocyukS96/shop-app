import React from 'react';
import s from './Cart.module.scss';
import {CartForm} from "./cartForm/CartForm";
import {useSelector} from "react-redux";
import {RootStateType} from "../../app/store";
import {FilteredCardType} from "../../utils/types";

export const Cart = () => {
    // @ts-ignore
    const purchases = useSelector<RootStateType, FilteredCardType[]>(state=>state.cart.purchases)
    console.log('purchases ', purchases)
    return (
        <div className={s.cart}>
            <div className={s.productsBlock}>
                {/*{purchases.map((p,i)=>{*/}
                {/*    return <CartItem key={i}/>*/}
                {/*})}*/}
            </div>
            <CartForm/>

        </div>
    )
}


