import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import BgVideo from './bgvideo2.mp4'
import styles from './landing.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames, getAllGenres } from '../../redux/actions'

const Landing = ()=>{

const dispatch = useDispatch();
const games = useSelector(state=>state.videoGames)

useEffect(()=>{
    dispatch(getAllGames());
    dispatch(getAllGenres());
},[])

    return(
        <div className={styles.main}>
            <div className={styles.cover}></div>
            <video className={styles.video} src={BgVideo} autoPlay loop muted />
            <div className={styles.content}>
            <div className={styles.text}>
                <span className={styles.span}>Bienvenido Gamer</span>
            </div>
            <Link to= '/home'>
            <div className={styles.div_button}>           
                {games.length !== 0 && <span className={styles.button}>Ingresar</span>}
            </div>
            </Link>
            </div>
        </div>
    )
}

export default Landing