import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import { getAllGames, getAllGenres, filterByGender, flagGlobal,rememberCurrentPage,
         filterByCreated, ascendente, byRating, getGameByName } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import Card from "../card/card";
import Paginado from "../paginado/paginado";
import styles from './home.module.css';
import bgImage from './bg_image.jpg';


const Home  = () =>{

const dispatch = useDispatch();
const history = useHistory();
const allVideoGames = useSelector(state => state.videoGames);
let genresOnDb = useSelector(state => state.genres);
let flag = useSelector(state => state.flag);
let currentPageMemo = useSelector(state => state.currentPageMemo);
//const [currentPage, setCurrentPage] = useState(currentPageMemo);
const [nextPage, setNextPage] = useState(2);
const [prevPage, setPrevPage] = useState();
const [flagAz, setFlagAz] = useState('');
const [searchBar, setSearchBar] = useState('');
const howManyGames = 15;
const lastIndex = currentPageMemo * howManyGames;
const firstIndex = lastIndex - howManyGames;
const showGames = allVideoGames.slice(firstIndex, lastIndex);

const pages = (pageNum)=>{
    dispatch(rememberCurrentPage(pageNum));
    setNextPage(pageNum +1);
    setPrevPage(pageNum-1);
}

useEffect( ()=>{
    if(!flag){
    dispatch(getAllGames());
    dispatch(getAllGenres());
    };
},[]);
//////////////////////////////////////  Boton Reload //////////////////////////////////
function reloadMain(){
    dispatch(rememberCurrentPage(1));
    dispatch(flagGlobal(true));
    window.location.reload();
}

////////////////////////////////////// INPUT y SEARCH //////////////////////////////////
function handleInput(e){
    setSearchBar(e.target.value);
}
async function handleSearch(){
    await dispatch(getGameByName(searchBar))
    pages(1)
    dispatch(flagGlobal(true))
}
///////////////////////////////////////  FILTROS  ////////////////////////////////////
function handleFilterGenres(e){
    //setCurrentPage(1);
    dispatch(rememberCurrentPage(1))
    dispatch(filterByGender(e.target.value));
    dispatch(flagGlobal(true))
}
function handleFilterCreated(e){
//    setCurrentPage(1);
    dispatch(rememberCurrentPage(1));
    dispatch(filterByCreated(e.target.value));
    dispatch(flagGlobal(true))
}
///////////////////////////////////////  SORT  ////////////////////////////////////
function handleAsc(e){
 //   setCurrentPage(1);
    dispatch(ascendente(e.target.value));
    dispatch(flagGlobal(true))
    setFlagAz(`${e.target.value}`)
}
function handleRating(e){
 //   setCurrentPage(1);
    dispatch(byRating(e.target.value));
    dispatch(flagGlobal(true))
    setFlagAz(`${e.target.value}`)
}

    return(
        <div className={styles.main}>
            <div className={styles.cover}></div>
            <img src={bgImage} alt="Background image" className={styles.image}/>
            <div className={styles.div_create_searchBar}>
                <div className={styles.div_create}>
                <Link to='/create'>
                <button className={styles.create}>Create VideoGame</button>
                </Link>
                </div>
                <div className={styles.div_searchBar}>
                <div className={styles.div_bar}>
                <input type="search" name="searchBar" placeholder="Search by Name..." 
                value={searchBar} onChange={handleInput} className= {styles.bar}/>
                </div>
                <div>
                <button onClick={handleSearch} className={styles.search}>Search</button>
                </div>
                </div>
            <div className={styles.div_filterBar}>
            <div className={styles.div_reload}>
            <button value='reload' onClick={() => reloadMain()} 
            className={styles.reload}>Reload</button>
            </div>
                <div className={styles.div_select}>
                    
                <select onChange={(e)=> handleFilterCreated(e)}>
                    <option value="All"> All Games</option>
                    <option value="myGames">My Games</option>
                    <option value="API">Foreing Games</option>
                </select>
                    
                <select onChange={e => handleAsc(e)}>
                    <option value="A-z">A-Z</option>
                    <option value="Z-a">Z-A</option>
                </select>
                <select onChange={e => handleRating(e)}>
                    <option value="Mayor">Best Scored</option>
                    <option value="Menor">Worst Scored</option>
                </select>
                <select onChange={(e)=> handleFilterGenres(e)}>
                    <option value="allGenres">All Genres</option>
                {
                    genresOnDb?.map(gen =>{
                        return(
                                <option value={gen}>{gen}</option>
                        )
                    })
                }
                </select>
                </div>
            </div>
            </div>
            <div className={styles.trickySpace}></div>
            <div>
            <Paginado
            howManyGames={howManyGames}
            allVideoGames = {allVideoGames.length}
            pages={pages} current={currentPageMemo}
            next = {nextPage} prev={prevPage}
            />
            </div>
            <div className={styles.div_cards}>
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
        </div>
    )
}

export default Home;