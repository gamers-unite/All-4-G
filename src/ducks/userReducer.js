import axios from 'axios';

const initialState={
    user: {}
}

const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const EDIT = 'EDIT';
const GET_USER = 'GET_USER';
const CHANGE_USER = 'CHANGE_USER';

export function login(username, password){
    return{
        type: LOGIN,
        payload: axios.post('/auth/login', {username, password})
    }
}

export function register(username, password, display_name, email){
    return{
        type: REGISTER,
    payload: axios.post('/auth/register', {username, password, display_name, email})
    }
}

export function edit(username, password, display_name, email){
    return{
        type: EDIT,
        payload: axios.put('/auth/edit', {username, password, display_name, email})
    }
}

export function getUser(id){
    console.log(id)
    return{
        type: getUser,
        payload: axios.get('/auth/users', id)
    }
}

export function changeUser(){
return{
    type: CHANGE_USER,
    payload: {}
    }
}

export default function reducer(state=initialState, action){
    console.log(action.type, action.payload)
    switch(action.type){
        case LOGIN + '_FULFILLED':
        return{...state, user: action.payload.data};

        case LOGIN + '_REJECTED':
        return{...state, error: 'Unable to log in'};

        case REGISTER + '_FULFILLED':
        return{...state, user: action.payload.data};

        case REGISTER + '_REJECTED':
        return{...state, error: 'invalid'}

        case EDIT + '_FULFILLED':
        return{...state, user: action.payload.data};

        case EDIT + '_REJECTED':
        return{...state, error: 'invalid'}

        case GET_USER + '_FULFILLED':
        return{...state, user: action.payload.data};

        case GET_USER - '_REJECTED':
        return{...state, error: 'no user'}

        case CHANGE_USER:
        return{...state, user: action.payload}

        default:
        return state;
    }
}