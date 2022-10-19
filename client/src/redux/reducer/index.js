import { GET_ALL_GAMES, GET_GAME_BY_ID, GET_GAME_BY_NAME,GET_ALL_GENRES, ASCENDENTE,
     REDIRECT, RESET_FLAG404,FILTER_BY_GENRE, CREATE_GAME,FILTER_BY_CREATED, DELETE_GAME,
      BY_RATING, FLAG_GLOBAL, CLEANER} from "../actions";

const initialState = {
    videoGames:[],
    videoGamesCopy:[],
    videoGamesSelected:[],
    game:{},
    genres:[],
    flag: false,
    flag_404:false,
    flag_alert:false,
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
                videoGames: action.payload,
                videoGamesCopy: action.payload,
                videoGamesSelected: action.payload
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
        case ASCENDENTE:
            let sorted = action.payload === 'A-z' ?
            state.videoGames.sort((a,b)=>{
               return  a.name === b.name ? 0: a.name > b.name ? 1 : -1;
            })
            : state.videoGames.sort((a,b)=>{
               return a.name === b.name ? 0: a.name > b.name ? -1 : 1;
            })
            return{
                ...state,
                videoGames: sorted
            }
        case BY_RATING:
            let sorted2 = action.payload === 'Menor'?
            state.videoGames.sort((a,b)=>{
                return a.rating === b.rating ? 0: a.rating > b.rating ? 1 : -1
            })
            : state.videoGames.sort((a,b)=>{
                return a.rating === b.rating ? 0: a.rating > b.rating ? -1 : 1
            })
            return{
                ...state,
                videoGames: sorted2
            }
        case FLAG_GLOBAL:
            return{
                ...state,
                flag: action.payload
            }
        case CLEANER:
            return{
                ...state,
                game: {},
            }
        case REDIRECT:
            return{
                ...state,
                flag_404: action.payload
            }
        case RESET_FLAG404:
            return{
                ...state,
                flag_404:false
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