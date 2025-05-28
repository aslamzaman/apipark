import { collection, getDocs, query, orderBy, limit, where, getDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { redisConfig } from './redisConfig';


export const getDataFromFirestoreRedisServer = async (firestoreCollectionName, redisKeyName, redisLimit) => {
    let client;
    try {
        client = await redisConfig();
        const cached = await client.get(redisKeyName);

        if (cached) {
            console.log("Data from redis server");
            return JSON.parse(cached);
        }

        const collectionRef = collection(db, firestoreCollectionName);

        const q = query(
            collectionRef,
            orderBy("createdAt", "desc"),
            limit(redisLimit)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        await client.set(redisKeyName, JSON.stringify(data));
        console.log(`Data from firestore. (${redisLimit})`);
        return data;

    } catch (error) {
        console.error(error);
        return [];
    } finally {
        if (client) await client.quit();
    }
}





export const getSomeDataFromFirestoreRedisServer = async (firestoreCollectionName, queryField, searchData) => {
    let client;
    try {
        client = await redisConfig();
        const someCacheKey = `${firestoreCollectionName}_${queryField}_${searchData}`;
        const cached = await client.get(someCacheKey);
        
        if (cached) {
            console.log("Data from redis server");
            return JSON.parse(cached);
        }
        
        const collectionRef = collection(db, firestoreCollectionName);
        
        const q = query(
            collectionRef,
            where(queryField, "==", searchData)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
 
        await client.set(someCacheKey, JSON.stringify(data), { EX: 3600 });
        console.log("Data from firestore");
        return data;

    } catch (error) {
        console.error(error);
        return [];
    } finally {
        if (client) await client.quit();
    }
}





export const getSingleDataFromFirestore = async (firestoreCollectionName, id) => {
    let client;
    try {

        const cacheKey = `${firestoreCollectionName}_${id}`;

        //Redis logic ---------------
        client = await redisConfig();
        const cached = await client.get(cacheKey);

        if (cached) {
            console.log("Data from redis server");
            return JSON.parse(cached);
        }


        const collectionRef = doc(db, firestoreCollectionName, id);

        const docSnapshot = await getDoc(collectionRef);
        if (docSnapshot.exists()) {
            const data = {
                id: docSnapshot.id,
                ...docSnapshot.data(),
            };
            console.log(`Data from firestore: Id = ${id}`);
            await client.set(cacheKey, JSON.stringify(data), { EX: 3600 });

            return data;
        } else {
            console.log("No document found with ID:", id);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        if (client) await client.quit();
    }

}

