import { collection, Firestore, getDocs, query, where } from "firebase/firestore";

export async function load_user_data(db: Firestore, email: string) {
    const q = query(collection(db, 'users_data'), where('Email', '==', email));
    const querySnapshot = await getDocs(q);
    let document;
    querySnapshot.forEach((doc) =>{
        document = doc.data();
    });
    console.log(document);
    return document;
}