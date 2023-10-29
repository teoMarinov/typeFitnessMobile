import { get, ref, equalTo, orderByChild, query } from 'firebase/database';
import db from '../config/firebase.config';

const getUserHandle = async (user: any) => {

    const data = user ? (await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(user.uid)))).val() : null

    if (data) {
        const userHandle = Object.keys(data)[0];
        return userHandle;
    } else {
        return null;
    }
}
export default getUserHandle