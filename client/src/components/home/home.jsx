import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import { getAllGames, getAllGenres } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../card/card";
import Paginado from "../paginado/paginado";

const Home  = () =>{

const dispatch = useDispatch();
const allVideoGames = useSelector(state => state.videoGames);
let genresOnDb = useSelector(state => state.genres);
const [currentPage, setCurrentPage] = useState(1);
const [nextPage, setNextPage] = useState(2);
const [prevPage, setPrevPage] = useState();
const [howManyGames, setHowManyGames] = useState(15);
const lastIndex = currentPage * howManyGames;
const firstIndex = lastIndex - howManyGames;
const showGames = allVideoGames.slice(firstIndex, lastIndex);

const pages = (pageNum)=>{
    setCurrentPage(pageNum);
    setNextPage(pageNum +1);
    setPrevPage(pageNum-1);
}


useEffect(()=>{
    dispatch(getAllGames());
},[dispatch]);
useEffect(()=>{
    dispatch(getAllGenres());
},[]);

function reloadMain(e){
    e.preventDefault();
    dispatch(getAllGames())
}

    return(
        <div>
            <h1>Home madafaka</h1>
            <hr />
            <button value='reload' onClick={e => reloadMain(e)}>Reload</button>
            <div>
                <select>
                    <option value="A-z">Ascendente</option>
                    <option value="Z-a">Descendente</option>
                </select>
                <select>
                    <option value="Mayor">Mejor Puntuados</option>
                    <option value="Menor">Peor Puntuados</option>
                </select>
                <select>
                {
                    genresOnDb?.map(gen =>{
                        return(
                                <option value={gen}>{gen}</option>
                        )
                    })
                }
                </select>
            </div>
            <Paginado
            howManyGames={howManyGames}
            allVideoGames = {allVideoGames.length}
            pages={pages} current={currentPage}
            next = {nextPage} prev={prevPage}
            />
            {
                showGames?.map( vg =>{
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