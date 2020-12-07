import BackendAPI from '../../constants/APIs';

export interface addNoteParams {
    title: string,
    data: string,
}

export interface addNoteReturn {
    status: number,
    message: string,
}

const addNote = (uid: string, add: addNoteParams): Promise<addNoteReturn> => {
    return new Promise((resolve, reject) => {
        BackendAPI({
            route: 'auth/addnote',
            auth: uid,
            method: 'POST',
            body: add,
        })
            .then((resp) => resp.json())
            .then((data) => {
                resolve({
                    status: data.status,
                    message: data.message,
                })
            })
            .catch((err) => {
                console.log("Error is addNote:", err.message);
                reject({
                    status: -1,
                    message: err.message,
                })
            })
    })
}

export default addNote;
