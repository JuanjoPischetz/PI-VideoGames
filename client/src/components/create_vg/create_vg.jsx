import React from "react";
import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import { createGame, deleteGame, getAllGenres } from "../../redux/actions";

const CreateVideogame = () =>{

const dispatch = useDispatch();
let genresOnDb = useSelector(state => state.genres);

useEffect(()=>{
    dispatch(getAllGenres());
    // quiero limpiar el componente pero no se como se hace
},[]);

        return(

            <div>
                <h2>{genresOnDb.join(', ')}</h2>
            </div>
        )
    }
export default CreateVideogame;