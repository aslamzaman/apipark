import { collection, getDocs, query, orderBy, limit, where, getDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { redisConfig } from './redisConfig';


export const getDataFromFirestoreRedisServer = async (firestoreCollectionName, redisKeyName) => {
    let client;
    try {
        client = await redisConfig();
        const cached = await client.get(redisKeyName);

        if (cached) {
            console.log("Data from redis server");
            return JSON.parse(cached);
        } else {
            const collectionRef = collection(db, firestoreCollectionName);

            const q = query(
                collectionRef,
                orderBy("createdAt", "desc"),
                limit(10)
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            await client.set(redisKeyName, JSON.stringify(data));
            console.log("Data from firestore");
            return data;
        }
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        if (client) await client.quit();
    }
}





export const getDataFromFirestoreArchive = async (firestoreCollectionName, specificDt) => {
    try {
        const collectionRef = collection(db, firestoreCollectionName);

        const q = query(
            collectionRef,
            where("dt", "==", specificDt)
        );


        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        console.log("Data from firestore");
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}




export const getSingleDataFromFirestore = async (firestoreCollectionName, id) => {
    try {
        const collectionRef = doc(db, firestoreCollectionName, id);

        const docSnapshot = await getDoc(collectionRef);
        if (docSnapshot.exists()) {
            const data = {
                id: docSnapshot.id,
                ...docSnapshot.data(),
            };
            console.log("Data from firestore:");
            return data;
        } else {
            console.log("No document found with ID:", id);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

