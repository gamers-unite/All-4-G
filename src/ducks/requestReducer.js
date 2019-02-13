import axios from "axios";

const initialState = {
    request: {},
    gameRequests: [],
    idRequest: []
};

const REQUEST = "REQUEST";
const ADD_REQUEST = "ADD_REQUEST";
const EDIT_REQUEST = "EDIT_REQUEST";
const DELETE_REQUEST = "DELETE_REQUEST";
const DEACTIVATE = "DEACTIVATE";
const ALL_REQUESTS = "ALL_REQUESTS";
const REQUESTS_BY_ID = "REQUESTS_BY_ID"

export function getRequestById(id){
    return {
        type: REQUESTS_BY_ID,
        payload:axios.post("/api/requests/id", { id })
    }
}

export function getRequest(id) {
    return {
        type: REQUEST,
        payload: axios.post("/api/requests/request", {})
    };
}

export function addRequest() {
    return {
        type: REQUEST,
        payload: axios.post("/api/request", {})
    };
}

export function editRequest() {
    return {
        type: EDIT_REQUEST,
        payload: axios.put("/api/request", {})
    };
}

export function deleteRequest() {
    return {
        type: DELETE_REQUEST,
        payload: axios.delete("/api/request")
    };
}

export function deactivate() {
    return {
        type: DEACTIVATE,
        payload: axios.put("/api/request")
    };
}

export function getRequests(game_id) {
    return {
        type: ALL_REQUESTS,
        payload: axios.post("/api/requests/games", {game_id})
    };
}

export default function reducer(state = initialState, action) {
    // console.log(action.type, action.payload);
    switch (action.type) {
        case REQUESTS_BY_ID + "_FULFILLED":
            return { ...state, idRequest: action.payload.data};

        case REQUEST + "_FULFILLED":
            return { ...state, request: action.payload.data };

        case REQUEST + "_REJECTED":
            return { ...state, error: "Unable to create team" };

        case ALL_REQUESTS + "_FULFILLED":
            return { ...state, gameRequests: action.payload.data };

        case ALL_REQUESTS + "_REJECTED":
            return { ...state, error: "Unable to create team" };

        case ADD_REQUEST + "_FULFILLED":
            return { ...state, request: action.payload.data };

        case ADD_REQUEST + "_REJECTED":
            return { ...state, error: "Unable to create team" };

        case EDIT_REQUEST + "_FULFILLED":
            return { ...state, request: action.payload.data };

        case EDIT_REQUEST + "_REJECTED":
            return { ...state, error: "invalid" };

        case DELETE_REQUEST + "_FULFILLED":
            return { ...state, request: action.payload.data };

        case DELETE_REQUEST + "_REJECTED":
            return { ...state, error: "Unable to create team" };

        case DEACTIVATE + "_FULFILLED":
            return { ...state, request: action.payload.data };

        case DEACTIVATE + "_REJECTED":
            return { ...state, error: "Unable to create team" };

        default:
            return state;
    }
}
