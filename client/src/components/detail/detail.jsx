import React from "react";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import { getGameByID, cleaner, deleteGame } from "../../redux/actions";

const Detail = ()=>{

const dispatch = useDispatch();
let allDetails = useSelector(state => state.game);
const {id} = useParams();
const flag = useSelector(state => state.flag_404);
const history = useHistory();

const handleDelete = function(e){
    dispatch(deleteGame(id));
    alert('Borrado Exitosamente!')
    history.push('/home');
}
useEffect(()=>{
    dispatch(getGameByID(id))
    return dispatch(cleaner())
},[id]);
        if (flag){
           return <Redirect to='/*'/>
        }
        if (allDetails?.name){
            return (
                <div>
                     <div>
                        <Link to='/home'>
                        <button>Home</button>
                        </Link>
                    </div>
                    <div>
                        { id.includes('-') && <button onClick={handleDelete}>Delete</button>}
                    </div>
                    <div>
                    <div>
                        <img src={allDetails.image} alt="imagen del juego" />
                        <span>{allDetails.description}</span>
                    </div>
                    <div>
                        <ul>
                            <p>Name:</p>
                            <p>{allDetails.name}</p>
                            <p>Rating:</p>
                            <p>{allDetails.rating}</p>
                            <p>Release Date:</p>
                            <p>{allDetails.release_date}</p>
                            <p>Platforms:</p>
                            <p>{allDetails.platforms.join(', ')}</p>
                            <p> Genres:</p>
                            <p>{allDetails.genres.join(', ')}</p>
                        </ul>
                    </div>
                    </div>
                </div>
            )
        }
        else return null;

}

export default Detail