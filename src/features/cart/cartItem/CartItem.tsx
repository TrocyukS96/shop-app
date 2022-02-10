import React, {FC, useState} from 'react';
import s from './CartItem.module.scss';
import {useSelector} from "react-redux";
import {RootStateType} from "../../../store";
import {RequestStatusType} from "../../application/application-reducer";

//types
type CartItemType = {
    name: string
    price: number
    type: string
    image: string
    itemId?: string
    deleteCartItem: (cartItemId: string) => void
    updateCartItem: (cartItemId: string, count: number) => void
    itemCount?: number
}
export const CartItem: FC<CartItemType> = ({
                                               itemId,
                                               type,
                                               price,
                                               image,
                                               name,
                                               deleteCartItem,
                                               updateCartItem,
                                               itemCount
                                           }) => {
    //hooks
    const status=useSelector<RootStateType, RequestStatusType>(st=>st.app.status)

        //handlers
    const toIncrCartItemHandler = () => {
        itemId && itemCount &&
        updateCartItem(itemId, itemCount+1)
    }
    const toDecrCartItemHandler = () => {
        itemId && itemCount &&
        updateCartItem(itemId, itemCount-1)
    }
    const deleteCartItemHandler = () => {
        itemId &&
        deleteCartItem(itemId)
    }
    if(itemCount===0){
        deleteCartItemHandler()
    }
    return (
        <div className={s.cartItem}>
            <img src={image} alt="purchase-item"/>
            <p className={s.cartText}>
                <p className={s.name}>{name}</p>
                <p className={s.price}>{price} BYN</p>
                <p className={s.type}>{type}</p>
            </p>

            <div className={s.btnBlock}>
                <button onClick={toDecrCartItemHandler} >-</button>
                <span>{itemCount}</span>
                <button onClick={toIncrCartItemHandler} >+</button>
            </div>
            <button className={s.deleteItemBtn} onClick={deleteCartItemHandler} disabled={status==='loading'}>x</button>
        </div>
    )
}


