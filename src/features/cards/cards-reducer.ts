import {Dispatch} from 'redux';
import {cardsApi} from "../../api/cards-api";
import {setAppStatusAC, SetAppStatusActionType} from "../application/application-reducer";
import {RootStateType} from "../../app/store";
import {ThunkAction} from "redux-thunk";
import {CardType} from '../../utils/types';

const initialState = {
    cards: [] as Array<CardType>,
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'cards/SET-CARDS':
            return {
                ...state, cards: [...action.cards],
            }
        case 'cards/ADD-CARD':
            return {...state, cards: [...state.cards, action.newCard]}

        default:
            return state
    }
}
//actionCreators
export const setCardsAc = (cards: CardType[]) => ({type: 'cards/SET-CARDS', cards} as const)
export const addCardAc = (newCard: CardType) => ({type: 'cards/ADD-CARD', newCard} as const)

//thunks
export const getCards = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const data = await cardsApi.fetchCards()
    const filteredData:CardType[] = data.map((doc) => {
        return {
            freeShipping: doc.data().freeShipping,
            image: doc.data().image,
            name: doc.data().name,
            type: doc.data().type,
            price: doc.data().price,
            cardId:doc.id
        }
    })
    dispatch(setCardsAc(filteredData))
    dispatch(setAppStatusAC('succeeded'))
}
export const addCard = (newCard: CardType): ThunkType =>async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    await cardsApi.addCard(newCard).then(()=>{
        dispatch(getCards())
        dispatch(setAppStatusAC('succeeded'))
    })
}
export const removeCard = (cardId: string): ThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    await cardsApi.removeCard(cardId)
        .then(()=>dispatch(getCards()))
    dispatch(setAppStatusAC('succeeded'))
}

//types
export type InitialStateType = typeof initialState
type ThunkType = ThunkAction<any, RootStateType, {}, ActionsType>
type ActionsType =
    | ReturnType<typeof setCardsAc>
    | SetAppStatusActionType
    | ReturnType<typeof addCardAc>









