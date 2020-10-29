interface BackendAPIParams {
    route: string;
    auth?: string | null;
    method: string;
    body?: Object | null;
}

const BackendAPI = ({route, auth, method, body}: BackendAPIParams) => {
    return fetch("192.168.1.7:8080" + route, {
        method: method,
        headers: {
            Authorization: "Bearer " + auth,
        },
        body: body !== null ? JSON.stringify(body) : null,
    })
};

export default BackendAPI;