import {addDoc, collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import {CardType} from "../utils/types";

const skatesCollectionRef = collection(db, "skates");


//api
export const cardsApi = {
     fetchCards(){
      return getDocs(skatesCollectionRef).then(res=>res.docs)
    },
    addCard(cardData:CardType){
         return addDoc(skatesCollectionRef, cardData)
    },
    removeCard(cardId:string){
        const deleteCard = doc(db,"skates", cardId)
        return deleteDoc(deleteCard)
    }
}