import {applyMiddleware, combineReducers, createStore} from "@reduxjs/toolkit";
import {cardsReducer} from "../bll/cards-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer} from "../features/application/application-reducer";
import {cartReducer} from "../bll/cartReducer";

const rootReducer = combineReducers({
    cards: cardsReducer,
    app:appReducer,
    cart:cartReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof rootReducer>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown,any>


