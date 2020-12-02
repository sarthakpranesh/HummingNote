import BackendAPI from '../../constants/APIs';

export interface updateNoteTextReturn {
    note: any,
    status: number,
    message: string,
}

export interface updateNoteTextProps {
    _id: string,
    title: string | null,
    data: string | null,
}

export const updateNoteText = (uid: string, updatedNote:updateNoteTextProps): Promise<updateNoteTextReturn> => {  
    return new Promise((resolve, reject) => {
        BackendAPI({
            route: "auth/editnote",
            auth: uid,
            method: "POST",
            body: updatedNote,
        })
            .then((resp) => resp.json())
            .then((data) => {
                let note;
                if (data.status === 1) {
                    note = data.Payload.note;
                }
                resolve({
                    note,
                    status: data.status,
                    message: data.message,
                });
            })
            .catch((err) => {
                console.log("Error is updateNote:", err.message);
                reject({
                    note: null,
                    status: -1,
                    message: err.message,
                })
            })
    })
}
