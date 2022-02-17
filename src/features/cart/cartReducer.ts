import {ThunkAction} from 'redux-thunk';
import {RootStateType} from '../../store';
import {setAppStatusAC} from "../application/application-reducer";
import {cartApi} from "../../api/cart-api";
import {CartFormValuesType} from "./cartForm/CartForm";
import {CardType} from "../../utils/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//initialValue
const initialState = {
    cartItems: [] as CardType[],
    count: 0,
    isSendOrder: false
}

export const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPurchaseAC(state, action: PayloadAction<{ newCardItem: CardType }>) {
            state.cartItems.push(action.payload.newCardItem)
        },
        setPurchasesAC(state, action: PayloadAction<{ cartItems: CardType[] }>) {
            state.cartItems = [...action.payload.cartItems]
        },
        setPurchaseCountAC(state, action: PayloadAction<{ count: number }>) {
            state.count = action.payload.count
        },
        isSendValueAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isSendOrder = action.payload.value
        },
        removePurchaseAC(state, action: PayloadAction<{ cartId: string }>) {
            const index = state.cartItems.findIndex(tl => tl.cardId === action.payload.cartId)
            if (index > -1) {
                state.cartItems.slice(index, 1)
            }
        },
    }
})
export const {addPurchaseAC, setPurchasesAC, setPurchaseCountAC, isSendValueAC, removePurchaseAC} = slice.actions
export const cartReducer = slice.reducer


//thunks
export const addPurchase = (purchaseId: string): ThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const cards = getState().cards.cards
    const filteredPurchase = cards.find((c: CardType) => {
        return c.cardId === purchaseId
    })
    filteredPurchase && dispatch(addPurchaseAC({newCardItem: filteredPurchase}))

    cartApi.addPurchase(filteredPurchase)
        .then(() => {

            dispatch(setAppStatusAC('succeeded'))
            dispatch(getPurchases())
        })
}


export const getPurchases = (): ThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))

    const data = await cartApi.fetchPurchases()
    const filteredData: CardType[] = data.docs.map((doc) => {
        return {
            freeShipping: doc.data().freeShipping,
            image: doc.data().image,
            name: doc.data().name,
            type: doc.data().type,
            price: doc.data().price,
            cardId: doc.id,
            count: doc.data().count
        }
    })
    dispatch(setPurchasesAC({cartItems: filteredData}))
    dispatch(setPurchaseCountAC({count: filteredData.length}))
    dispatch(setAppStatusAC('succeeded'))
}
export const removePurchase = (purchaseId: string): ThunkType => async (dispatch) => {

    dispatch(setAppStatusAC('loading'))
    await cartApi.removePurchase(purchaseId)
    dispatch(getPurchases())

    dispatch(setAppStatusAC('succeeded'))
}
export const sendOrder = (userData: CartFormValuesType): ThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const cartItems = getState().cart.cartItems
    const orderData = {
        purchases: cartItems,
        usersData: {...userData, date: new Date()}
    }
    await cartApi.sendOrder(orderData)
    dispatch(setAppStatusAC('succeeded'))
    dispatch(isSendValueAC({value: true}))

}
export const updatePurchase = (purchaseId: string, count: number): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    await cartApi.updatePurchaseCount(purchaseId, count)
    dispatch(getPurchases())
    dispatch(setAppStatusAC('loading'))
}
//types
export type InitialStateType = typeof initialState
type ThunkType = ThunkAction<any, RootStateType, {}, any>






