import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import { getAllGames, getAllGenres, filterByGender, flagGlobal,
         filterByCreated, ascendente, byRating, getGameByName } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../card/card";
import Paginado from "../paginado/paginado";

const Home  = () =>{

const dispatch = useDispatch();
const allVideoGames = useSelector(state => state.videoGames);
let genresOnDb = useSelector(state => state.genres);
let flag = useSelector(state => state.flag);
const [currentPage, setCurrentPage] = useState(1);
const [nextPage, setNextPage] = useState(2);
const [prevPage, setPrevPage] = useState();
const [howManyGames, setHowManyGames] = useState(15);
const [flagAz, setFlagAz] = useState('');
const [searchBar, setSearchBar] = useState('');
const lastIndex = currentPage * howManyGames;
const firstIndex = lastIndex - howManyGames;
const showGames = allVideoGames.slice(firstIndex, lastIndex);

const pages = (pageNum)=>{
    setCurrentPage(pageNum);
    setNextPage(pageNum +1);
    setPrevPage(pageNum-1);
}


useEffect( ()=>{
    if(!flag){
    dispatch(getAllGames());
    dispatch(getAllGenres());
    }
    else dispatch(flagGlobal(false));
},[]);


function reloadMain(e){
    e.preventDefault();
    dispatch(getAllGames())
}
function handleInput(e){
    setSearchBar(e.target.value);
}
async function handleSearch(){
    await dispatch(getGameByName(searchBar))
    pages(1)
    dispatch(flagGlobal(true))
}
function handleFilterGenres(e){
    setCurrentPage(1);
    dispatch(filterByGender(e.target.value));
    dispatch(flagGlobal(true))
}
function handleFilterCreated(e){
    setCurrentPage(1);
    dispatch(filterByCreated(e.target.value));
    dispatch(flagGlobal(true))
}
function handleAsc(e){
    setCurrentPage(1);
    dispatch(ascendente(e.target.value));
    dispatch(flagGlobal(true))
    setFlagAz(`${e.target.value}`)
}
function handleRating(e){
    setCurrentPage(1);
    dispatch(byRating(e.target.value));
    dispatch(flagGlobal(true))
    setFlagAz(`${e.target.value}`)
}

    return(
        <div>
            <h1>Home madafaka</h1>
            <hr />
            <div>
                <input type="search" name="searchBar" placeholder="Ingresa un nombre" value={searchBar} onChange={handleInput}/>
                <button onClick={handleSearch}>Buscar</button>
            </div>
            <div>
            <button value='reload' onClick={e => reloadMain(e)}>Reload</button>
                <select onChange={(e)=> handleFilterCreated(e)}>
                    <option value="All"> Todos</option>
                    <option value="myGames">Mis Juegos</option>
                    <option value="API">Otros Juegos</option>
                </select>
                <select onChange={e => handleAsc(e)}>
                    <option value="A-z">A-Z</option>
                    <option value="Z-a">Z-A</option>
                </select>
                <select onChange={e => handleRating(e)}>
                    <option value="Mayor">Mejor Puntuados</option>
                    <option value="Menor">Peor Puntuados</option>
                </select>
                <select onChange={(e)=> handleFilterGenres(e)}>
                    <option value="allGenres">Todos</option>
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