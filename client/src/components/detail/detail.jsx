import React from "react";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import { getGameByID, cleaner, deleteGame, flagGlobal } from "../../redux/actions";
import styles from './detail.module.css';
import bgimage from './bg_image.jpg';

const Detail = ()=>{

const dispatch = useDispatch();
let allDetails = useSelector(state => state.game);
const {id} = useParams();
const flag = useSelector(state => state.flag_404);
const history = useHistory();

const handleDelete = function(e){
    dispatch(deleteGame(id));
    dispatch(flagGlobal(false));
    alert('Borrado Exitosamente!')
    history.push('/home');
}
useEffect(()=>{
    dispatch(getGameByID(id))
    return ()=>{
        dispatch(cleaner())
    }
},[id]);
        if (flag){
           return <Redirect to='/*'/>
        }
        else {
            return (
                <div className={styles.main}>
                <div className={styles.cover}></div>
                <img src={bgimage} alt="imagen de fondo" className={styles.bgimage}/>
                     <div className={styles.div_home}>
                        <Link to='/home'>
                        <button className={styles.home}>Home</button>
                        </Link>
                    </div>
                    <div className={styles.div_delete}>
                        { id.includes('-') && <button className={styles.delete} onClick={handleDelete}>Delete</button>}
                    </div>
                    
                    { allDetails.name && <div className={styles.container}>
                    <div className={styles.image_container}>
                        <img className={styles.image} src={allDetails.image} alt="imagen del juego" />
                        <span className={styles.description}>{allDetails.description}</span>
                    </div>
                    <div>
                        <ul>
                            <span className={styles.title}>Name:</span>
                            <p className={styles.text}>{allDetails.name}</p>
                            <p className={styles.title}>Rating:</p>
                            <p className={styles.text}>{allDetails.rating}</p>
                            <p className={styles.title}>Release Date:</p>
                            <p className={styles.text}>{allDetails.release_date}</p>
                            <p className={styles.title}>Platforms:</p>
                            <p className={styles.text}>{allDetails.platforms.join(', ')}</p>
                            <p className={styles.title}> Genres:</p>
                            <p className={styles.text}>{allDetails.genres.join(', ')}</p>
                        </ul>
                    </div>
                    </div>}
                    
                </div>
            )
        }
}

export default Detail