import {ThunkAction} from 'redux-thunk';
import {RootStateType} from '../app/store';
import {setAppStatusAC, SetAppStatusActionType} from "../features/application/application-reducer";
import { FilteredCardType } from '../utils/types';


const initialState:InitialStateType = {
    purchases: [] as FilteredCardType[],

}

export const cartReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'cart/ADD-PURCHASE':
            return {
                ...state,purchases:state.purchases.push(action.newPurchase)
            }
        default:
            return state
    }
}
//actionCreators
export const addPurchaseAC = (newPurchase: FilteredCardType) => ({type: 'cart/ADD-PURCHASE', newPurchase} as const)

//thunks
// @ts-ignore
export const addPurchase = (purchaseId: string): ThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    // @ts-ignore
    const cards = getState().cards.cards
    const filteredPurchase = cards.filter((c: FilteredCardType) => c.cardId === purchaseId)
    console.log(filteredPurchase)
    dispatch(addPurchaseAC(filteredPurchase))

    dispatch(setAppStatusAC('succeeded'))
}

//types
type InitialStateType = {
    purchases:FilteredCardType[]
}
type ThunkType = ThunkAction<any, RootStateType, {}, ActionsType>
type ActionsType =
    | ReturnType<typeof addPurchaseAC>
    | SetAppStatusActionType





