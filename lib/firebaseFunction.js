
import { db } from "./firebaseConfig";
import { collection, orderBy, getDocs, query, limit } from 'firebase/firestore';


export const getDataFromFirebase = async (collectionName) => {
    try {
        const collectionRef = collection(db, collectionName);

        const q = query(
            collectionRef,
            orderBy("createdAt", "desc"),
            limit(20)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

