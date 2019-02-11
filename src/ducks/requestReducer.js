import axios from 'axios';

const initialState={
    user: {}
}

const REQUEST = 'REQUEST';
const EDIT_REQUEST = 'EDIT_REQUEST';

export function request(username, password, display_name, email){
    return{
        type: REQUEST,
    payload: axios.post('/auth/register', {username, password, display_name, email})
    }
}

export function requestEdit(username, password, display_name, email){
    return{
        type: REQUEST_EDIT,
        payload: axios.put('/auth/edit', {username, password, display_name, email})
    }
}