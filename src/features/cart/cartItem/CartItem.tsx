import React, {useState} from 'react';
import s from './CartItem.module.scss';
import appleImg from './../../../assets/images/products/apple.jpg';

export const CartItem = () => {
    const [counter, setCounter] = useState(1)

    //handlers
    const toIncrCounter =() => {
        setCounter(counter+1)
    }
    const toDecrCounter =() => {
        setCounter(counter-1)
    }
    return (
        <div className={s.cartItem}>
            <img src={appleImg} alt="purchase-item"/>
            <p  className={s.cartText}>Lorem ipsum dolor sit amet.</p>
            <div className={s.btnBlock}>
                <button onClick={toDecrCounter}>-</button>
                <span>{counter}</span>
                <button onClick={toIncrCounter}>+</button>
            </div>
        </div>
    )
}


