import {v1} from 'uuid';
import { CardType } from '../../utils/types';
import cartImage1 from './../../assets/images/skates/alphaCapriceFrostySilver.jpg';
import cartImage2 from './../../assets/images/skates/alphaCapricePlayer.jpg';
import {addCardAc, cardsReducer, InitialStateType, removeCardAc} from "./cards-reducer";


let card1Id = v1()
let card2Id = v1()
let startState:InitialStateType

beforeEach(() => {
    startState= {
        cards:[
            {cardId:card1Id, count:1, image:cartImage1, name:'cart1', type:'ice skates', price:20, freeShipping:false},
            {cardId:card2Id, count:1, image:cartImage2, name:'cart2', type:'ice skates', price:30, freeShipping:false}
        ],
    }
})

test('card should be removed', ()=>{

    const endState = cardsReducer(startState, removeCardAc({cardId:card1Id}))

    expect(endState.cards.length).toBe(1)
})

test('card should be added', ()=>{
    const newCard:CardType = {
        cardId:v1(),
        count:1,
        image:'newCardImage',
        name:'new Purchase',
        type:'ice skates',
        price:40,
        freeShipping:true
    }

    const endState = cardsReducer(startState, addCardAc({newCard:newCard}))

    expect(endState.cards.length).toBe(3)
    expect(endState.cards[2].price).toBe(40)
})
