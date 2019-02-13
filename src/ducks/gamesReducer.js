import axios from 'axios';

const initialState={
    game: {},
    allOfGames: []
}

const GAME_BY_URL = 'GAME';
// const EDIT_GAME = 'EDIT_GAME';
const ALL_GAMES = 'ALL_GAMES';

export function gameByUrl(url){
    return{
        type: GAME_BY_URL,
        payload: axios.post('/api/games/url', {url})
    }
}

export function allGames(){
    return{
        type: ALL_GAMES,
        payload: axios.get('/api/games/all')
    }
}

export default function reducer(state=initialState, action){
    // console.log(action.type, action.payload)
    switch(action.type){
        case GAME_BY_URL + '_FULFILLED':
        return{...state, game: action.payload.data[0]};

        case GAME_BY_URL + '_REJECTED':
        return{...state, error: 'Unable to log in'};

        case ALL_GAMES + '_FULFILLED':
        return{...state, allOfGames: action.payload.data};

        case ALL_GAMES + '_REJECTED':
        return{...state, error: 'invalid'};

        default:
        return state;
    }
}