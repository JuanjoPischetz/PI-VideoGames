import React from "react";
import { Link } from "react-router-dom";
import styles from './card.module.css';

const Card = ({image, name, genres, id})=>{
    return(
        <div className={styles.main}>
            <div className={styles.div_text}>
            <h3 className={styles.text}>{name}</h3>
            </div>
            <div>
            <Link to={`/videogame/${id}`}>
                <img src={image} alt="imagen" className={styles.image} />
            </Link>
            </div>
            <div className={styles.div_genres}>
            {
            genres.map(e =>{
                 return<h4 className={styles.genres}>{e}</h4>
            })
           }
            </div>
        </div>
    )
}

export default Card