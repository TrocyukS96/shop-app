import {Dispatch} from 'redux';
import {cardsApi} from "../api/cards-api";
import {setAppStatusAC, SetAppStatusActionType} from "../features/application/application-reducer";
import { RootStateType} from "../app/store";
import {ThunkAction} from "redux-thunk";
import {CardType, FilteredCardType } from '../utils/types';
import {cartApi} from "../api/cart-api";
import {getPurchases} from "./cartReducer";

const initialState = {
    cards: [] as Array<FilteredCardType>,
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'cards/SET-CARDS':
            return {
                ...state, cards: [...action.cards],
            }
        case 'cards/ADD-CARD':
            return {...state, cards: [...state.cards, action.newCard]}
        // case 'cards/DELETE-CARD':
        //     return {...state, cards: state.cards.filter(c => c._id !== action.cardId)}
        // case 'cards/UPDATE-CARD':
        // return {
        //     ...state,
        //     cards: state.cards.map
        //     (card => card.cardsPack_id === action.id
        //         ?
        //         {...card, question: action.question}
        //         :
        //         card)
        // }
        default:
            return state
    }
}
//actionCreators
export const setCardsAc = (cards: CardType[]) => ({type: 'cards/SET-CARDS', cards} as const)
export const addCardAc = (newCard: CardType) => ({type: 'cards/ADD-CARD', newCard} as const)
// export const setPackIdAc = (packId: string) => ({type: 'cards/SET-PACK-ID', packId} as const)
// export const deleteCardAc = (cardId: string) => ({type: 'cards/DELETE-CARD', cardId} as const)
// export const sortCardsAC = (value: string) => ({type: 'cards/SORT-CARDS', value} as const)
// export const searchAnswerCardsAC = (value: string) => ({type: 'cards/SEARCH-ANSWER-CARDS', value} as const)
// export const searchQuestionCardsAC = (value: string) => ({type: 'cards/SEARCH-QUESTION-CARDS', value} as const)
// export const setCardsGradeAC = (card_id: string, grade: number) => ({
//     type: 'cards/SET-CARDS-GRADE',
//     card_id,
//     grade
// } as const)
// export const updateCardAc = (id: string, question: string) => ({
//     type: 'cards/UPDATE-CARD',
//     id, question
// } as const)

//thunks


export const getCards = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const data = await cardsApi.fetchCards()
    const filteredData:FilteredCardType[] = data.map((doc) => {
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

// export const deleteCardTC = (packId: string, cardId: string): ThunkType => (dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     cardsApi.deleteCard(cardId).then(
//         () => {
//             dispatch(deleteCardAc(cardId))
//             dispatch(getCardsTC(packId))
//             dispatch(setAppStatusAC('succeeded'))
//         }
//     ).catch(() => {
//         dispatch(setAppStatusAC('failed'))
//     })
// }
// export const updateQuestionTC = (packId: string, cardId: string, question: string): ThunkType => (dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     cardsApi.updateCard({_id: cardId, question: question}).then(
//         (res) => {
//             dispatch(updateCardAc(packId, res.data.question))
//             dispatch(getCardsTC(packId))
//             dispatch(setAppStatusAC('succeeded'))
//         }
//     ).catch(() => {
//         dispatch(setAppStatusAC('failed'))
//     })
// }
//
// export const updateCardTC = (cardId: string, question: string, answer: string): ThunkType => (dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     cardsApi.updateCard({_id: cardId, question: question, answer: answer}).then(
//         (res) => {
//             dispatch(getCardsTC(cardId));
//             dispatch(setAppStatusAC('succeeded'));
//         }
//     ).catch(() => {
//         dispatch(setAppStatusAC('failed'))
//     })
// }
//
// export const setCardsGradeTC = (cardId: string, grade: number): ThunkType => (dispatch) => {
//     dispatch(setAppStatusAC('loading'))
//     cardsApi.updateCardGrade(cardId, grade)
//         .then(res => {
//             dispatch(setCardsGradeAC(res.data.card_id, res.data.grade))
//             dispatch(setAppStatusAC('succeeded'))
//         })
//         .catch(() => {
//             dispatch(setAppStatusAC('failed'))
//         })
// }

//types
export type InitialStateType = typeof initialState
type ThunkType = ThunkAction<any, RootStateType, {}, ActionsType>
type ActionsType =
    | ReturnType<typeof setCardsAc>
    | SetAppStatusActionType
    | ReturnType<typeof addCardAc>









