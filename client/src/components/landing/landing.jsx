import React from 'react'
import {Link} from 'react-router-dom'
import BgVideo from './bgvideo.mp4'
import styles from './landing.module.css'

const Landing = ()=>{

    return(
        <div className={styles.main}>
            <video className={styles.video} src={BgVideo} autoPlay loop muted />
            <div className={styles.content}>
            <Link to= '/home'>
            <button className={styles.button} >Home</button>
            </Link>
            </div>
        </div>
    )
}

export default Landing