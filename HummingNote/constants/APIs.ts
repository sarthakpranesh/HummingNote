interface BackendAPIParams {
    route: string;
    auth?: string | null;
    method: string;
    body?: Object | null;
}

const API = "https://humming-server.herokuapp.com/";

const BackendAPI = ({route, auth, method, body}: BackendAPIParams) => {
    return fetch(API + route, {
        method: method,
        headers: {
            Authorization: "Bearer " + auth,
        },
        body: body !== null ? JSON.stringify(body) : null,
    })
};

export default BackendAPI;