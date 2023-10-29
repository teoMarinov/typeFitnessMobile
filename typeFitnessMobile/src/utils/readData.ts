import db from "../config/firebase.config";
import { ref, onValue } from "firebase/database";

const readData = async (postPath:string, callback: any) => {
     const dataRef = ref(db, postPath);

     const unsubscribe = onValue(dataRef, (snapshot) => {
        const data = snapshot.val()
        callback(data)
     })

     return unsubscribe
}
export default readData
