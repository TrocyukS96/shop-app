import {Dispatch} from 'redux';
import {cardsApi} from "../../api/cards-api";
import {setAppStatusAC, SetAppStatusActionType} from "../application/application-reducer";
import {RootStateType} from "../../store";
import {ThunkAction} from "redux-thunk";
import {CardType} from '../../utils/types';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    cards: [] as Array<CardType>,
}


export const slice = createSlice({
    name:'cards',
    initialState,
    reducers:{
        setCardsAc(state, action:PayloadAction<{cards:CardType[]}>){
            return {
                state, cards: [...action.payload.cards],
            }
        },addCardAc(state, action:PayloadAction<{newCard:CardType}>){
            return {state, cards: [...state.cards, action.payload.newCard]}
        },removeCardAc(state, action:PayloadAction<{ cardId: string }>){
            return{
                state, cards: state.cards.filter(p=>p.cardId!=action.payload.cardId)
            }
        }

    },

})
export const {setCardsAc,addCardAc,removeCardAc} = slice.actions
export const cardsReducer = slice.reducer

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
            cardId:doc.id,
            count:doc.data().count
        }
    })
    dispatch(setCardsAc({cards:filteredData}))
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
type ThunkType = ThunkAction<any, RootStateType, {}, any>
// type ActionsType =
//     | ReturnType<typeof setCardsAc>
//     | SetAppStatusActionType
//     | ReturnType<typeof addCardAc>
//     | ReturnType<typeof removeCardAc>









