interface BackendAPIParams {
    route: string;
    auth?: string | null;
    method: string;
    body?: Object | null;
}

const API = "https://humming-server.herokuapp.com/";
// const API = "localhost:8080/";

const BackendAPI = ({route, auth, method, body}: BackendAPIParams) => {
    return fetch(API + route, {
        method: method,
        headers: {
            Authorization: "Bearer " + auth,
            "Content-Type": "application/json",
        },
        body: body !== null ? JSON.stringify(body) : null,
    })
};

export default BackendAPI;