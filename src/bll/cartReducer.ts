import {ThunkAction} from 'redux-thunk';
import {RootStateType} from '../app/store';
import {setAppStatusAC, SetAppStatusActionType} from "../features/application/application-reducer";
import {FilteredCardType} from '../utils/types';
import {cartApi} from "../api/cart-api";
import skateImg2 from "../assets/images/skates/alphaCapricePlayer.jpg";


const initialState: InitialStateType = {
    purchases: [] as FilteredCardType[]

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
export const addPurchaseAC = (newPurchase: FilteredCardType) => ({type: 'cart/ADD-PURCHASE', newPurchase} as const)
export const setPurchasesAC = (cartItems: FilteredCardType[]) => ({type: 'cart/SET-PURCHASE', cartItems} as const)

//thunks
// @ts-ignore
export const addPurchase = (purchaseId: string): ThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    // @ts-ignore

    const cards = getState().cards.cards
    const filteredPurchase = cards.find((c: any) => {
       return c.cardId === purchaseId
    })
    dispatch(addPurchaseAC(filteredPurchase))
    cartApi.addPurchase(filteredPurchase)
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
        })

}
export const getPurchases = (): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const data = await cartApi.fetchPurchases()
    const filteredData: FilteredCardType[] = data.docs.map((doc) => {
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
export const sendOrder = (userData: any): ThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const cartItems = getState().cart.purchases
    const orderData ={
        purchases:cartItems,
        usersData:{...userData}
    }
    //api
    dispatch(setAppStatusAC('succeeded'))
}

//types
type InitialStateType = {
    purchases: FilteredCardType[]
}
type ThunkType = ThunkAction<any, RootStateType, {}, ActionsType>
type ActionsType =
    | ReturnType<typeof addPurchaseAC>
    | ReturnType<typeof setPurchasesAC>
    | SetAppStatusActionType





