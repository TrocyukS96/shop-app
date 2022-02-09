import React, {FC, useState} from 'react';
import s from './CartItem.module.scss';
import {useDispatch} from "react-redux";

//types
type CartItemType = {
    name: string
    price: number
    type: string
    image: string
    itemId?: string
    deleteCartItem: (cartItemId: string) => void
}
export const CartItem: FC<CartItemType> = ({
                                               itemId,
                                               type,
                                               price,
                                               image,
                                               name,
                                               deleteCartItem
                                           }) => {
    const [counter, setCounter] = useState(1)
    const dispatch= useDispatch()
    //handlers
    const toIncrCounter = () => {
        setCounter(counter + 1)
    }
    const toDecrCounter = () => {
        setCounter(counter - 1)
    }
    const deleteCartItemHandler = () => {
        itemId &&
        deleteCartItem(itemId)
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
                <button onClick={toDecrCounter}>-</button>
                <span>{counter}</span>
                <button onClick={toIncrCounter}>+</button>
            </div>
            <button className={s.deleteItemBtn} onClick={deleteCartItemHandler}>x</button>
        </div>
    )
}


