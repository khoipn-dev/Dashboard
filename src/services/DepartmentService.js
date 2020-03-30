import firebase from "../firebase";

const db = firebase.firestore();
const departmentRef = db.collection("departments");

async function save(staff) {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await departmentRef.add(staff);
            return resolve(getById(result.id));
        } catch (e) {
            return reject(e);
        }
    });
}

async function update(department) {
    return new Promise(async (resolve, reject) => {
        try {
            await departmentRef.doc(department.id).update({
                name: department.name
            });
            return resolve();
        } catch (e) {
            return reject(e);
        }
    });
}

function deleteById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            await departmentRef.doc(id).delete();
            return resolve();
        } catch (e) {
            return reject(e);
        }
    });
}

async function getAll() {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await departmentRef.get();
            result = result.docs.map(function (item) {
                return {...item.data(), id: item.id}
            });
            return resolve(result);
        } catch (e) {
            return reject(e);
        }
    });
}

async function getById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let doc = await departmentRef.doc(id).get();
            if (doc.exists) {
                return resolve({...doc.data(), id: doc.id});
            }
        } catch (e) {
            return reject(e);
        }
    });
}

export const DepartmentService = {
    save,
    getAll,
    getById,
    update,
    deleteById
};
