import { initializeApp } from "firebase/app"
import {getFirestore, doc, setDoc} from "firebase/firestore"

export default class Firestore {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyBzW6U27vC9NvljhHZooeyz6I7Oto6ffjs",
            authDomain: "peerpal-955ba.firebaseapp.com",
            projectId: "peerpal-955ba",
            storageBucket: "peerpal-955ba.appspot.com",
            messagingSenderId: "213420136312",
            appId: "1:213420136312:web:034508b10acdc771455a8d"
        }

        this._app = initializeApp(firebaseConfig)
        this._db = getFirestore(this._app)
    }

    async insertTransaction (transactionAddress, title, description, amount) {
        const docRef = doc(this._db, "transactions", transactionAddress)

        await setDoc(docRef, {
            title: title,
            description: description,
            amount: amount.toString()
        })
    }
}