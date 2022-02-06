import React, {useState} from 'react';
import {Link} from "@material-ui/core";
import s from './Cart.module.scss';
import {CartItem} from "./cartItem/CartItem";
import {CartForm} from "./cartForm/CartForm";

export const Cart = () => {
    const [total, setTotal] = useState(null)
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


