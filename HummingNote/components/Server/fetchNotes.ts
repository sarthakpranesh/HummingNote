import BackendAPI from '../../constants/APIs';

export interface fetchNotesReturn {
    notes: any [],
    status: number,
    message: string,
}

const fetchNotes = (uid: string): Promise<fetchNotesReturn> => {
    return new Promise((resolve, reject) => {
        BackendAPI({route: "auth/notes", auth: uid, method: "GET"})
            .then((resp) => resp.json())
            .then((data) => {
                let notes;
                if (data.status === 1) {
                    notes = data.Payload.notes
                    if (data.Payload.notes === null) {
                        notes = []
                    }
                }
                resolve({
                    notes,
                    status: data.status,
                    message: data.message,
                })
            })
            .catch((err) => {
                console.log("Error in fetchNotes:", err.message);
                reject({
                    notes: [],
                    status: -1,
                    message: err.message,
                })
            })
    })
}

export default fetchNotes;