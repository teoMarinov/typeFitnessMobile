import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.config";
import db from "../config/firebase.config";
import { DataSnapshot, get, ref } from "firebase/database";

export const loginUser = async (handle:string, password:string) => {
    const snapshot: DataSnapshot = await get(ref(db, `users/${handle}`));

    if (snapshot.exists()) {
        const email:string = snapshot.val().email;

        return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
    } else {
        throw new Error('User not found <<auth-service.ts line:21>>')
    }
}