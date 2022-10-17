import { GET_ALL_GAMES, GET_GAME_BY_ID, GET_GAME_BY_NAME,GET_ALL_GENRES,
    FILTER_BY_GENRE, CREATE_GAME,FILTER_BY_CREATED, DELETE_GAME } from "../actions";

const initialState = {
    videoGames:[],
    videoGamesCopy:[],
    videoGamesSelected:[],
    game:{},
    genres:[],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_GAMES :
            return{
                ...state,
                videoGames: action.payload,
                videoGamesCopy: action.payload,
                videoGamesSelected: action.payload
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
        case FILTER_BY_GENRE:
            const allVideoGames = state.videoGamesSelected;
            const videoGamesFilter = action.payload  === 'allGenres' ? allVideoGames
            : allVideoGames.slice().filter( e => e.genres.toString().includes(action.payload))
            return{
                ...state,
                videoGames: videoGamesFilter
            }
        case FILTER_BY_CREATED:
            const everyVideoGame = state.videoGamesCopy
            const createdOrApi = action.payload === 'myGames' ? everyVideoGame.filter(e => typeof e.id === 'string') 
            : everyVideoGame.filter( e => (e.id)/(e.id)=== 1);
            return{
                ...state,
                videoGames: action.payload === 'All' ? everyVideoGame : createdOrApi,
                videoGamesSelected: action.payload === 'All' ? everyVideoGame : createdOrApi
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