import React from 'react';
import s from './Cart.module.scss';
import {CartItem} from "./cartItem/CartItem";
import {CartForm} from "./cartForm/CartForm";

export const Cart = () => {
    return (
        <div className={s.cart}>

            <div className={s.productsBlock}>
                <CartItem/>
                <CartItem/>
                <CartItem/>
                <CartItem/>
                <CartItem/>

            </div>
            <CartForm/>

        </div>
    )
}


