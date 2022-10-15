import { GET_ALL_GAMES, GET_GAME_BY_ID, GET_GAME_BY_NAME,GET_ALL_GENRES, CREATE_GAME, DELETE_GAME } from "../actions";

const initialState = {
    videoGames:[],
    game:{},
    genres:[],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_GAMES :
            return{
                ...state,
                videoGames: action.payload
            }
        case GET_GAME_BY_NAME:
            return {
                ...state,
                videoGames: action.payload
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_GAME_BY_ID:
            return{
                ...state,
                game: action.payload
            }
        case CREATE_GAME:
            return{
                ...state,
                videoGames: [...state.videoGames, action.payload]
            }
        case DELETE_GAME:
            return{
                ...state,
                videoGames: state.videoGames.filter(game => game.id !== action.payload)
            }
        default: return state;
    }
};

export default rootReducer;