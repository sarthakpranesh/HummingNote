import BackendAPI from '../../constants/APIs';

export interface updateNoteReturn {
    status: number,
    message: string,
}


export interface updateNoteTextProps {
    _id: string,
    title: string | null,
    data: string | null,
}

export const updateNoteText = (uid: string, updatedNote:updateNoteTextProps): Promise<updateNoteReturn> => {  
    return new Promise((resolve, reject) => {
        BackendAPI({
            route: "auth/editnote",
            auth: uid,
            method: "POST",
            body: updatedNote,
        })
            .then((resp) => resp.json())
            .then((data) => {
                resolve({
                    status: data.status,
                    message: data.message,
                });
            })
            .catch((err) => {
                console.log("Error is updateNote:", err.message);
                reject({
                    status: -1,
                    message: err.message,
                })
            })
    })
}


export interface toggleNotePinParam {
    _id: string,
    ispinned: boolean,
}

export const toggleNotePin = (uid: string, pinUpdate: toggleNotePinParam): Promise<updateNoteReturn> => {
    return new Promise((resolve, reject) => {
        BackendAPI({
            route: "auth/editnote",
            auth: uid,
            method: "POST",
            body: pinUpdate,
        })
            .then((resp) => resp.json())
            .then((data) => {
                resolve({
                    status: data.status,
                    message: data.message,
                });
            })
            .catch((err) => {
                console.log("Error is toggleNotePin:", err.message);
                reject({
                    status: -1,
                    message: err.message,
                })
            })
    })
}


export interface setNoteColorParams {
    _id: string,
    color: string,
}

export const setNoteColor = (uid: string, colorUpdate: setNoteColorParams): Promise<updateNoteReturn> => {
    return new Promise((resolve, reject) => {
        BackendAPI({
            route: "auth/editnote",
            auth: uid,
            method: "POST",
            body: colorUpdate,
        })
            .then((resp) => resp.json())
            .then((data) => {
                resolve({
                    status: data.status,
                    message: data.message,
                });
            })
            .catch((err) => {
                console.log("Error is setNoteColor:", err.message);
                reject({
                    status: -1,
                    message: err.message,
                })
            })
    })
}
