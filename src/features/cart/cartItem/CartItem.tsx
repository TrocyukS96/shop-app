import React, {FC} from 'react';
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
                <button className={s.changeValueBtn} onClick={toDecrCartItemHandler} >-</button>
                <span>{itemCount}</span>
                <button className={s.changeValueBtn} onClick={toIncrCartItemHandler} >+</button>
            </div>
            <button aria-label="delete" color="primary"  className={s.deleteItemBtn} onClick={deleteCartItemHandler} disabled={status==='loading'}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     width="24" height="24"
                     viewBox="0 0 24 24"
                     >
                    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path></svg>
            </button>
        </div>
    )
}


