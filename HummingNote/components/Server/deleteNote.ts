import BackendAPI from '../../constants/APIs';

export interface deleteNoteReturn {
    isDeleted: boolean,
    message: string,
    status: number,
}

const deleteNote = (uid: string, _id: string): Promise<deleteNoteReturn> => {
    console.log(uid, _id)
    return new Promise((resolve, reject) => {
        BackendAPI({
            route: "auth/deletenote?id=" + _id,
            auth: uid,
            method: "DELETE",
        })
            .then((resp) => resp.json())
            .then((data) => {
                resolve({
                    isDeleted: data.Payload.isDeleted,
                    message: data.message,
                    status: data.status,
                })
            })
            .catch((err) => {
                console.log("Error in deleteNote:", err.message);
                reject({
                    isDeleted: false,
                    status: -1,
                    message: err.message,
                })
            })
    })
}

export default deleteNote;
