import {v1} from 'uuid';
import cartImage1 from './../../assets/images/skates/alphaCapriceFrostySilver.jpg';
import cartImage2 from './../../assets/images/skates/alphaCapricePlayer.jpg';
import {addPurchaseAC, cartReducer, InitialStateType, isSendValueAC, removePurchaseAC} from "./cartReducer";
import {CardType} from "../../utils/types";

let cart1Id = v1()
let cart2Id = v1()
let startState:InitialStateType

beforeEach(() => {
    startState= {
        cartItems:[
            {cardId:cart1Id, count:1, image:cartImage1, name:'cart1', type:'ice skates', price:20, freeShipping:false},
            {cardId:cart2Id, count:1, image:cartImage2, name:'cart2', type:'ice skates', price:30, freeShipping:false}
        ],
        count:1,
        isSendOrder:false

    }
})

test('cart should be removed', ()=>{

    const endState = cartReducer(startState, removePurchaseAC({cartId:cart1Id}))

    expect(endState.cartItems.length).toBe(1)
})

test('cart should be added', ()=>{
    const newCartItem:CardType = {
       cardId:v1(),
       count:1,
       image:'newCardImage',
       name:'new Purchase',
       type:'ice skates',
       price:40,
       freeShipping:true
    }

    const endState = cartReducer(startState, addPurchaseAC({newCardItem:newCartItem}))

    expect(endState.cartItems.length).toBe(3)
    expect(endState.cartItems[2].price).toBe(40)
})

test('isSendOrder is change on true', ()=>{

    const endState = cartReducer(startState, isSendValueAC({value:true}))

    expect(endState.isSendOrder).toBe(true)
})