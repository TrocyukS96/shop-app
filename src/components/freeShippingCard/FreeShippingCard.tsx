import React, {FC} from 'react';
import s from './FreeShippingCard.module.scss';

type FreeShippingCardType ={
    className:string
}

export const FreeShippingCard:FC<FreeShippingCardType> = ({className}) => {
    const finalClassName = className ? `${className} ${s.card}` : `${s.card}`
    return (
        <div className={finalClassName}>
            Free shipping
        </div>
    )
}


