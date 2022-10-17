//const axios = require('axios');
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

//obtengo todos los juegos
export const getAllGames=()=>{
    return async (dispatch)=>{
        const json = await axios.get('http://localhost:3001/videogames');
        return dispatch({type: GET_ALL_GAMES, payload: json.data})
    }
}
//obtengo todos los géneros
export const getAllGenres=()=>{
    return async (dispatch)=>{
        const json = await axios.get('http://localhost:3001/genres');
        return dispatch({type: GET_ALL_GENRES, payload: json.data})
    }
}
//Busco Videogame por nombre
export const getGameByName=(name)=>{
    return async (dispatch)=>{
        const json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
        return dispatch({type: GET_GAME_BY_NAME, payload: json.data})
    }
}
//Busco Videogame por ID
export const getGameByID=(id)=>{

    return async (dispatch)=>{
        const json = await axios.get(`http://localhost:3001/videogame/${id}`);
        return dispatch({type: GET_GAME_BY_ID, payload: json.data})
    }
}
//Creo un Juego
export const createGame=(data)=>{
    return {
        type: CREATE_GAME,
        payload: {...data}
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
//Borro un juego
export const deleteGame =(id)=>{
    return{
        type:DELETE_GAME,
        payload: id
    }
}

/*
export const getAllGames = () => dispatch => {
    return fetch('http://localhost:3001/videogames')
            .then(response => response.json())
            .then (data => dispatch({type: GET_ALL_GAMES, payload: data}))
};
 */