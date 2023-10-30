import { get, set, ref, equalTo, orderByChild, query } from 'firebase/database';
import db from '../config/firebase.config';

export const getUserByHandle = (handle: string) => {
    return get(ref(db, `users/${handle}`))
}

export const createUserHandle = (handle: string, uid: string, email: string, phoneNumber: string) => {
    return set(ref(db, `users/${handle}`), { handle, uid, email, phoneNumber, createdOn: new Date() })
}

const setUserData = (uid: string) => {
    return get(query(ref(db, `users`), orderByChild('uid'), equalTo(uid)))
}
export default setUserData

export function checkForPhoneNumber(phoneNumber: string) {
    return get(query(ref(db, `users`), orderByChild('phoneNumber'), equalTo(phoneNumber)))
}