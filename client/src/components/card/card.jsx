import React from "react";
import { Link } from "react-router-dom";

const Card = ({image, name, genres, id})=>{
    return(
        <div>
            <Link to={`/videogame/${id}`}>
            <img src={image} alt="imagen" width='200px' height='250px' />
            </Link>
            <h3>{name}</h3>
            <div>
            {
            genres.map(e =>{
                 return<h4>{e}</h4>
            })
           }
            </div>
        </div>
    )
}

export default Card