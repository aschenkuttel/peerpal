import {initializeApp} from "firebase/app"
import {getFirestore, doc, setDoc, getDoc, getDocs, query, where, collection, or} from "firebase/firestore"

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

    async getTransaction(transactionAddress) {
        const docRef = doc(this._db, "transactions", transactionAddress)
        const snapshot = await getDoc(docRef)

        if (snapshot.exists()) {
            return {id: snapshot.id, ...snapshot.data()}
        } else {
            return null
        }
    }

    async getTransactions(walletAddress) {
        const colRef = collection(this._db, "transactions")
        const isSeller = query(colRef, where("seller", "==", walletAddress))
        const isBuyer = query(colRef, where("buyer", "==", walletAddress))

        const [
            isSellerSnapshot,
            isBuyerSnapshot
        ] = await Promise.all([
            getDocs(isSeller),
            getDocs(isBuyer)
        ])

        const transactions = isSellerSnapshot.docs.concat(isBuyerSnapshot.docs)
        const result = []

        transactions.forEach((doc) => {
            result.push({
                id: doc.id,
                ...doc.data()
            })
        })

        return result
    }

    async insertTransaction(transactionAddress, seller, title, description, amount, timestamp) {
        const docRef = doc(this._db, "transactions", transactionAddress)

        await setDoc(docRef, {
            seller: seller,
            buyer: null,
            title: title,
            description: description,
            amount: amount.toString(),
            timestamp: timestamp,
            completed: false
        })
    }

    async updateTransaction(transactionAddress, newData) {
        const docRef = doc(this._db, "transactions", transactionAddress)
        await setDoc(docRef, newData, {merge: true})
    }
}