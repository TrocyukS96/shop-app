import {ThunkAction} from 'redux-thunk';
import {RootStateType} from '../../app/store';
import {setAppStatusAC, SetAppStatusActionType} from "../application/application-reducer";
import {cartApi} from "../../api/cart-api";
import {CartFormValuesType} from "./cartForm/CartForm";
import {CardType} from "../../utils/types";

//initialValue
const initialState: InitialStateType = {
    purchases: [] as CardType[]
}

export const cartReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'cart/ADD-PURCHASE':
            debugger
            return {...state, purchases: [...state.purchases, action.newPurchase]}
        case 'cart/SET-PURCHASE':
            return {
                ...state, purchases: [...action.cartItems],
            }
        default:
            return state
    }
}
//actionCreators
export const addPurchaseAC = (newPurchase: CardType) => ({type: 'cart/ADD-PURCHASE', newPurchase} as const)
export const setPurchasesAC = (cartItems: CardType[]) => ({type: 'cart/SET-PURCHASE', cartItems} as const)

//thunks
export const addPurchase = (purchaseId: string): ThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const cards = getState().cards.cards
    const filteredPurchase = cards.find((c: any) => {
       return c.cardId === purchaseId
    })
    filteredPurchase && dispatch(addPurchaseAC(filteredPurchase))

    cartApi.addPurchase(filteredPurchase)
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
        })

}
export const getPurchases = (): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const data = await cartApi.fetchPurchases()
    const filteredData: CardType[] = data.docs.map((doc) => {
        return {
            freeShipping: doc.data().freeShipping,
            image: doc.data().image,
            name: doc.data().name,
            type: doc.data().type,
            price: doc.data().price,
            cardId: doc.id

        }
    })
    dispatch(setPurchasesAC(filteredData))
    dispatch(setAppStatusAC('succeeded'))
}
export const removePurchase = (purchaseId: string): ThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    await cartApi.removePurchase(purchaseId)
    dispatch(getPurchases())
    dispatch(setAppStatusAC('succeeded'))
}
export const sendOrder = (userData: CartFormValuesType): ThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const cartItems = getState().cart.purchases
    const orderData ={
        purchases:cartItems,
        usersData:{...userData}
    }
    cartApi.sendOrder(orderData).then(()=>{
        dispatch(setAppStatusAC('succeeded'))
    })
}

//types
type InitialStateType = {
    purchases: CardType[]
}

type ThunkType = ThunkAction<any, RootStateType, {}, ActionsType>
type ActionsType =
    | ReturnType<typeof addPurchaseAC>
    | ReturnType<typeof setPurchasesAC>
    | SetAppStatusActionType





