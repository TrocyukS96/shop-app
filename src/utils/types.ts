export type CardType = {
    freeShipping: boolean,
    image: string,
    name: string,
    type: string,
    price: number,

}

export type FilteredCardType = {
    freeShipping: boolean,
    image: string,
    name: string,
    type: string,
    price: number,
    cardId:string
}