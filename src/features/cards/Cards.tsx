import React, {useEffect} from "react";
import {ProductCard} from "./productCard/ProductCard";
import s from './Cards.module.scss';
import skateImg1 from './../../assets/images/skates/alphaCapriceFrostySilver.jpg';
import skateImg2 from './../../assets/images/skates/alphaCapricePlayer.jpg';
import skateImg3 from './../../assets/images/skates/atemiAHSK02SPEED.jpg';
import skateImg4 from './../../assets/images/skates/atemiAHSK04Escape.jpg';
import skateImg5 from './../../assets/images/skates/rgxSpecter.jpg';
import skateImg6 from './../../assets/images/skates/atemiAIS01Bblackblue.jpg';
import skateImg7 from './../../assets/images/skates/princessJulialeather.jpg';
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebase";
import {AddCardForm} from "./addCardForm/AddCardForm";

const skatesData = [
    {
        img: skateImg1,
        type: 'ice skates',
        name: "alpha Caprice Frosty Silver",
        price: 142,
        freeShipping: true
    },
    {
        img: skateImg2,
        type: 'ice skates',
        name: "alpha Caprice Player",
        price: 149,
        freeShipping: false
    },
    {
        img: skateImg3,
        type: 'ice skates',
        name: "Atemi AHSK02 SPEED",
        price: 134,
        freeShipping: true
    },
    {
        img: skateImg4,
        type: 'ice skates',
        name: "Atemi AHSK04 Escape",
        price: 166,
        freeShipping: true
    },
    {
        img: skateImg5,
        type: 'ice skates',
        name: "rgx Specter",
        price: 180,
        freeShipping: false
    },
    {
        img: skateImg6,
        type: 'ice skates',
        name: "Atemi AIS01B blackblue",
        price: 150,
        freeShipping: false
    },
    {
        img: skateImg7,
        type: 'ice skates',
        name: "Princess Julia Leather",
        price: 179,
        freeShipping: false
    },

]


const skatesCollection = {
    skate1: {
        img: skateImg1,
        type: 'ice skates',
        name: "alpha Caprice Frosty Silver",
        price: 142,
        freeShipping: true
    },
    skate2: {
        img: skateImg2,
        type: 'ice skates',
        name: "alpha Caprice Player",
        price: 149,
        freeShipping: false
    },
    skate3: {
        img: skateImg3,
        type: 'ice skates',
        name: "Atemi AHSK02 SPEED",
        price: 134,
        freeShipping: true
    },
    skate4: {
        img: skateImg4,
        type: 'ice skates',
        name: "Atemi AHSK04 Escape",
        price: 134,
        freeShipping: true
    },
    skate5: {
        img: skateImg5,
        type: 'ice skates',
        name: "rgx Specter",
        price: 180,
        freeShipping: false
    },
    skate6: {
        img: skateImg6,
        type: 'ice skates',
        name: "Atemi AIS01B blackblue",
        price: 150,
        freeShipping: false
    },
    skate7: {
        img: skateImg7,
        type: 'ice skates',
        name: "Julia Leather",
        price: 179,
        freeShipping: false
    },
}
export const skatesCollectionRef = collection(db, "skates");

export const Cards = () => {
    return (
        <div className={s.wrapper}>
            <h2>Skates</h2>
            <div className={s.columns}>
                <div className={s.cardsBlock}>
                    {skatesData.map((s, i) => {
                        return <ProductCard
                            img={s.img}
                            type={s.type}
                            name={s.name}
                            price={s.price}
                            freeShipping={s.freeShipping}
                            key={i}
                        />
                    })}
                </div>
                <AddCardForm/>
            </div>
        </div>
    )
}


