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
const REQUESTS_BY_GAME = "REQUESTS_BY_GAME";
const REQUEST_BY_ID = "REQUEST_BY_ID";
const CLEAN_REQUEST = 'CLEAN_REQUEST';

export function cleanRequest() {
    return {
        type: CLEAN_REQUEST,
    }
}

export function getRequestById(req_id) {
    return {
        type: REQUEST_BY_ID,
        payload: axios.post("/api/requests/id", { req_id })
    }
}

export function getRequestsByGame(game_id) {
    return {
        type: REQUESTS_BY_GAME,
        payload: axios.post("/api/requests/game", { game_id })
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

export default function reducer(state = initialState, action) {
    // console.log(action.type, action.payload);
    switch (action.type) {
        case CLEAN_REQUEST:
            return { idRequest: {}, gameRequests: [], request: {} }
        case REQUEST_BY_ID + "_FULFILLED":
            return { ...state, idRequest: action.payload.data };

        case REQUEST_BY_ID + "_REJECTED":
            return { ...state, error: "Unable to get request" };

        case REQUEST + "_FULFILLED":
            return { ...state, request: action.payload.data };

        case REQUEST + "_REJECTED":
            return { ...state, error: "Unable to create team" };

        case REQUESTS_BY_GAME + "_FULFILLED":
            return { ...state, gameRequests: action.payload.data };

        case REQUESTS_BY_GAME + "_REJECTED":
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
