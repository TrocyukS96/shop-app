import React, {FC, useEffect, useState} from 'react';
import s from './Cart.module.scss';
import {CartForm} from "./cartForm/CartForm";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../store";
import {getPurchases, removePurchase, updatePurchase} from "./cartReducer";
import {CartItem} from "./cartItem/CartItem";
import {RequestStatusType} from "../application/application-reducer";
import {Box, Button, CircularProgress, Modal, Typography} from "@material-ui/core";
import {CardType} from "../../utils/types";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Cart: FC = React.memo(() => {
    //hooks
    const dispatch = useDispatch()
    const purchases = useSelector<RootStateType, CardType[]>(state => state.cart.purchases)
    const isSendOrder = useSelector<RootStateType, boolean>(st => st.cart.isSendOrder)
    const status = useSelector<RootStateType, RequestStatusType>(st => st.app.status)
    const [open, setOpen] = useState(isSendOrder);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        dispatch(getPurchases())
    }, [])

    //functions
    const deleteCartItem = (cartItemId: string) => {
        dispatch(removePurchase(cartItemId))
    }
    const updateCartItem = (cartItemId: string, count: number) => {
        dispatch(updatePurchase(cartItemId, count))
    }
    const mappedPurchases = purchases.map((p, index) => {
        return <CartItem key={index} name={p.name}
                         price={p.price} type={p.type}
                         image={p.image} itemId={p.cardId}
                         deleteCartItem={deleteCartItem}
                         updateCartItem={updateCartItem}
                         itemCount={p.count}
        />
    })

    // alert(isSendOrder)
    console.log('isSendOrder'+'-'+ isSendOrder)
    return (
        <div className={s.cart}>
            <div className={s.productsBlock}>
                {mappedPurchases}
                {mappedPurchases.length === 0 ? <h3>No purchases yet...</h3> : ''}
            </div>
            <CartForm setOpen={setOpen}/>
            {status === 'loading' && <CircularProgress/>}
            <Modal
                open={open} onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">

                <Box className={s.cartModal}>
                    {/*//@ts-ignore*/}
                        <Typography id="modal-modal-description" sx={{mt: 2}} className={s.cartModalText}>
                            Your order has been placed
                        </Typography>
                    <button onClick={handleClose} className={s.cartModalBtn}>x</button>
                </Box>
            </Modal>
        </div>
    )
})


