import firebase from "../firebase";

const db = firebase.firestore();
const staffsRef = db.collection("users");

async function save(staff) {
    try {
        let result = await staffsRef.add(staff);
        return getById(result.id);
    } catch (e) {
        console.log(e);
    }
}

async function getAll() {
    try {
        let result = await staffsRef.get();
        return result.docs.map(function (item) {
            return {...item.data(), id: item.id}
        });
    } catch (e) {
        console.log(e);
    }
}

async function getById(id) {
    try {
        let doc = await staffsRef.doc(id).get();
        if (doc.exists) {
            return {...doc.data(), id: doc.id};
        }
    } catch (e) {
        console.log(e);
    }
}

export const StaffService = {
    save,
    getAll,
    getById
};
