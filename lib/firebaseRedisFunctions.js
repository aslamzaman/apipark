import { collection, getDocs,  query, orderBy, limit } from 'firebase/firestore';
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
                limit(20)
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
    }finally{
        if (client) await client.quit();
    }
}

