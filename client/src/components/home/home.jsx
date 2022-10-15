import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import { getAllGames } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../card/card";

const Home  = () =>{

const dispatch = useDispatch();
const allVideoGames = useSelector(state => state.videoGames);

useEffect(()=>{
    dispatch(getAllGames())
},[dispatch]);

    return(
        <div>
            <h1>Home madafaka</h1>
            <hr />
            {
                allVideoGames?.map( vg =>{
                    return (
                        <div>
                            <Card image={vg.image} name={vg.name} genres={vg.genres} id={vg.id} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;