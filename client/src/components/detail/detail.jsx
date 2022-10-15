import React from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import { getGameByID } from "../../redux/actions";

const Detail = ()=>{

const dispatch = useDispatch();
let allDetails = useSelector(state => state.game);
const {id} = useParams();


useEffect(()=>{
    dispatch(getGameByID(id))
    // quiero limpiar el componente pero no se como se hace
},[id]);
        if (allDetails?.name){
            return (
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
            )
        }
        if(allDetails === 'error') return <Redirect to='/*'/>
        else return null

}

export default Detail