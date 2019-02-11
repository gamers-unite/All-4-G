import axios from 'axios';

const initialState={
    request: {}
}

const REQUEST = 'REQUEST';
const EDIT_REQUEST = 'EDIT_REQUEST';

export function request(display_name){
    return{
        type: REQUEST,
    payload: axios.post('/auth/register', {display_name})
    }
}

export function requestEdit(display_name){
    return{
        type: REQUEST_EDIT,
        payload: axios.put('/auth/edit', {display_name})
    }
}

export default function reducer(state=initialState, action){
    console.log(action.type, action.payload)
    switch(action.type){
        case REQUEST + '_FULFILLED':
        return{...state, user: action.payload.data};

        case REQUEST + '_REJECTED':
        return{...state, error: 'Unable to create team'};

        case REQUEST_EDIT + '_FULFILLED':
        return{...state, user: action.payload.data};

        case REQUEST_EDIT + '_REJECTED':
        return{...state, error: 'invalid'}

        default:
        return state;
    }
}