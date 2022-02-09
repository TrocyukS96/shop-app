import React, {useEffect} from 'react';
import s from './Cart.module.scss';
import {CartForm} from "./cartForm/CartForm";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../app/store";
import {getPurchases, removePurchase} from "./cartReducer";
import {CartItem} from "./cartItem/CartItem";
import {RequestStatusType} from "../application/application-reducer";
import {CircularProgress} from "@material-ui/core";
import {CardType} from "../../utils/types";

export const Cart = () => {
    const dispatch = useDispatch()
    const purchases = useSelector<RootStateType, CardType[]>(state => state.cart.purchases)
    const status = useSelector<RootStateType, RequestStatusType>(st => st.app.status)
    const deleteCartItem = (cartItemId: string) => {
        dispatch(removePurchase(cartItemId))
    }
    useEffect(() => {
        dispatch(getPurchases())
    }, [dispatch])

    const mappedPurchases =  purchases.map((p, index) => {
        return <CartItem key={index}
                         name={p.name}
                         price={p.price}
                         type={p.type}
                         image={p.image}
                         itemId={p.cardId}
                         deleteCartItem={deleteCartItem}
        />
    })
    return (
        <div className={s.cart}>
            <div className={s.productsBlock}>
                {status==='loading' ? <CircularProgress style={{width: '100px', height: '100px', marginTop:'20%'}}/> : mappedPurchases}
            </div>
            <CartForm/>

        </div>
    )
}


