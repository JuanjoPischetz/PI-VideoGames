
import axios from 'axios';
export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_GAME_BY_NAME = 'GET_GAME_BY_NAME';
export const CREATE_GAME = 'CREATE_GAME';
export const GET_GAME_BY_ID = 'GET_GAME_BY_ID';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_CREATED= 'FILTER_BY_CREATED';
export const DELETE_GAME = 'DELETE_GAME';
export const ASCENDENTE = 'ASCENDENTE';
export const BY_RATING = 'BY_RATING';
export const FLAG_GLOBAL = 'FLAG_GLOBAL';
export const CLEANER = 'CLEANER';
export const REDIRECT = 'REDIRECT';
export const RESET_FLAG404 = 'RESET_FLAG404';
export const REMEMBER_CURRENT_PAGE ='REMEMBER_CURRENT_PAGE';


//obtengo todos los juegos
export const getAllGames=()=>{
    return async (dispatch)=>{
    try {
            const json = await axios.get('https://pivgapi-production.up.railway.app/videogames');
            return dispatch({type: GET_ALL_GAMES, payload: json.data})
        
    } catch (error) {
        console.error(error);
        alert('Error requesting the data from the API')
    }
    }
}
//obtengo todos los géneros
export const getAllGenres=()=>{
    return async (dispatch)=>{
    try {
            const json = await axios.get('https://pivgapi-production.up.railway.app/genres');
            return dispatch({type: GET_ALL_GENRES, payload: json.data})
        
    } catch (error) {
        console.error(error);
        alert('Error requesting the data from the API')
    }
}
}
//Busco Videogame por nombre
export const getGameByName=(name)=>{
    return async (dispatch)=>{
        try {
            const json = await axios.get(`https://pivgapi-production.up.railway.app/videogames?name=${name}`);
            return dispatch({type: GET_GAME_BY_NAME, payload: json.data})
        } catch (error) {
            console.error(error);
            alert('Search will have not results, try another name')
        }
    }
}
//Busco Videogame por ID
export const getGameByID=(id)=>{

    return async (dispatch)=>{
        try {
        const json = await axios.get(`https://pivgapi-production.up.railway.app/videogame/${id}`);
        return dispatch({type: GET_GAME_BY_ID, payload: json.data})
        } catch (error) {
        return dispatch({type: REDIRECT, payload:true})
        }
    }
}
//Creo un Juego
export const createGame=(data)=>{
    return async ()=>{
    try {
            await axios.post('https://pivgapi-production.up.railway.app/videogames', data)
            alert('Video Game Created Successfully!')
        
    } catch (error) {
        console.error(error);
        if (error.message)
        alert('There is already a Game with that name!')
    }
}
}

//filtrado por genero
export const filterByGender=(genres)=>{
    return{
        type: FILTER_BY_GENRE,
        payload:genres
    }
}
//filtrado por creado/existente en API
export const filterByCreated = (data) =>{
    return{
        type: FILTER_BY_CREATED,
        payload:data
    }
}
// ordeno ascendente 
export const ascendente = (data) =>{
    return{
        type: ASCENDENTE,
        payload: data
    }
}
//ordeno por rating
export const byRating = (data)=>{
    return{
        type: BY_RATING,
        payload:data
    }
}
//flag global
export const flagGlobal = (data)=>{
    return{
        type: FLAG_GLOBAL,
        payload:data
    }
}
//clean details
export const cleaner = ()=>{
    return{
        type:CLEANER
    }
}
// reset error 404
export const resetFlag404 = ()=>{
    return{
        type:RESET_FLAG404
    }
}
//Borro un juego
export const deleteGame =(id)=>{
    return async ()=>{
    try {
            await axios.delete(`https://pivgapi-production.up.railway.app/videogame/${id}`);
            
        }
     catch (error) {
        alert('The game has already been removed');
    }
}
}

export const rememberCurrentPage = (page) =>{
    return{
        type: REMEMBER_CURRENT_PAGE,
        payload: page
    }
}
/*
export const getAllGames = () => dispatch => {
    return fetch('http://localhost:3001/videogames')
            .then(response => response.json())
            .then (data => dispatch({type: GET_ALL_GAMES, payload: data}))
};
 */