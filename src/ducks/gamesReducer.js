import axios from 'axios';

const initialState={
    game: {},
    allGames: []
}

const GAME = 'GAME';
// const EDIT_GAME = 'EDIT_GAME';
const ALL_GAMES = 'ALL_GAMES';

export function game(game){
    return{
        type: game,
    payload: axios.post('/api/games', game)
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
        case GAME + '_FULFILLED':
        return{...state, game: action.payload.data};

        case GAME + '_REJECTED':
        return{...state, error: 'Unable to log in'};

        case ALL_GAMES + '_FULFILLED':
        return{...state, allGames: action.payload.data};

        case ALL_GAMES + '_REJECTED':
        return{...state, error: 'invalid'};

        default:
        return state;
    }
}