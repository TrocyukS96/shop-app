import {addDoc, collection, getDocs, doc, deleteDoc} from "firebase/firestore";
import {db} from "../firebase";
//collections
const cartCollectionRef = collection(db, "cart");
const ordersCollectionRef = collection(db, "orders");


export const cartApi = {
    addPurchase(purchase:any){
       return addDoc(cartCollectionRef, purchase)
    },
    fetchPurchases(){
        return getDocs(cartCollectionRef)
    },
    removePurchase(cardId:string){
        const deleteItem = doc(db,"cart", cardId)
        return deleteDoc(deleteItem)
    },
    sendOrder(orderData:any){
        return addDoc(ordersCollectionRef, orderData)
    },
}