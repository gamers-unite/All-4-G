import axios from "axios";

const initialState = {
    user: {},
    otherUser: {}
};

const LOGIN = "LOGIN";
const ADD_USER = "ADD_USER";
const UPDATE = "UPDATE";
const GET_USER = "GET_USER";
const CHANGE_USER = "CHANGE_USER";
const GET_CURRENT_USER = "GET_CURRENT_USER";

export function login(email, password) {
    return {
        type: LOGIN,
        payload: axios.post("/users/login", {
            email,
            password
        })
    };
}

export function addUser(
    display_name,
    email,
    password,
    blizzard,
    epic,
    ps4,
    riot,
    steam,
    xbox
) {
    return {
        type: ADD_USER,
        payload: axios.post("/users/register", {
            display_name,
            email,
            password,
            blizzard,
            epic,
            ps4,
            riot,
            steam,
            xbox
        })
    };
}

export function update(
    display_name,
    email,
    password,
    avatar,
    blizzard,
    epic,
    ps4,
    riot,
    steam,
    xbox
) {
    return {
        type: UPDATE,
        payload: axios.put("/users/update", {
            display_name,
            email,
            password,
            avatar,
            blizzard,
            epic,
            ps4,
            riot,
            steam,
            xbox
        })
    };
}

export function getUser(id) {
    // console.log(id);
    return {
        type: GET_USER,
        payload: axios.get("/users/", id)
    };
}

export function logout() {
    return {
        type: CHANGE_USER,
        payload: axios.post("/users/logout")
    };
}

export function getCurrentUser() {
    return {
        type: GET_CURRENT_USER,
        payload: axios.get("/users/current")
    };
}

export default function reducer(state = initialState, action) {
    // console.log(action.type, action.payload);
    switch (action.type) {
        case LOGIN + "_FULFILLED":
            return { ...state, user: action.payload.data };

        case LOGIN + "_REJECTED":
            return { ...state, error: "Unable to log in" };

        case ADD_USER + "_FULFILLED":
            return { ...state, user: action.payload.data };

        case ADD_USER + "_REJECTED":
            return { ...state, error: "invalid" };

        case UPDATE + "_FULFILLED":
            return { ...state, user: action.payload.data };

        case UPDATE + "_REJECTED":
            return { ...state, error: "invalid" };

        case GET_USER + "_FULFILLED":
            return { ...state, otherUser: action.payload.data };

        case GET_USER - "_REJECTED":
            return { ...state, error: "no user" };

        case GET_CURRENT_USER + "_FULFILLED":
            return { ...state, user: action.payload.data };

        case GET_CURRENT_USER - "_REJECTED":
            return { ...state, error: "no user" };

        case logout:
            return { ...state, user: action.payload };

        default:
            return state;
    }
}
