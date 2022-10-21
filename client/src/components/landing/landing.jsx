import React from 'react'
import {Link} from 'react-router-dom'
import BgVideo from './bgvideo.mp4'
import styles from './landing.module.css'

const Landing = ()=>{

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
                <span className={styles.button}>Ingresar</span>
            </div>
            </Link>
            </div>
        </div>
    )
}

export default Landing