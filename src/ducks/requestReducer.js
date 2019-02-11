import axios from 'axios';

const initialState={
    request: {},
    allRequests: []
}

const REQUEST = 'REQUEST';
const REQUEST_EDIT = 'EDIT_REQUEST';
const ALL_REQUESTS = 'ALL_REQUESTS';

export function request(display_name){
    return{
        type: REQUEST,
    payload: axios.post('/auth/request', {display_name})
    }
}

export function requestEdit(display_name){
    return{
        type: REQUEST_EDIT,
        payload: axios.put('/api/request_edit', {display_name})
    }
}

export function allRequests(game){
    return{
        type: ALL_REQUESTS,
        payload: axios.get('/api/requests')
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