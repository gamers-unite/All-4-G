import axios from 'axios';

const initialState={
    user: {}
}

const LOGIN = 'LOGIN';
const ADD_USER = 'ADD_USER';
const UPDATE = 'UPDATE';
const GET_USER = 'GET_USER';
const CHANGE_USER = 'CHANGE_USER';

export function login(email, password){
    return{
        type: LOGIN,
        payload: axios.post('/user/login', {
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
    }
}

export function addUser(
    display_name, email, password, blizzard, epic, ps4, riot, steam, xbox
    ){
    return{
        type: ADD_USER,
        payload: axios.post('/user/register', {
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
    }
}

export function update(email){
    return{
        type: UPDATE,
        payload: axios.put('/user/update', {
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
    }
}

export function getUser(id){
    console.log(id)
    return{
        type: GET_USER,
        payload: axios.get('/user/current', id)
    }
}

export function logout(){
return{
    type: CHANGE_USER,
    payload: axios.post('/user/logout')
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

        case UPDATE + '_FULFILLED':
        return{...state, user: action.payload.data};

        case UPDATE + '_REJECTED':
        return{...state, error: 'invalid'}

        case GET_USER + '_FULFILLED':
        return{...state, user: action.payload.data};

        case GET_USER - '_REJECTED':
        return{...state, error: 'no user'}

        case logout:
        return{...state, user: action.payload}

        default:
        return state;
    }
}