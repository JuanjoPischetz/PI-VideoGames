import React from "react";
import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import { createGame,getAllGenres } from "../../redux/actions";

const CreateVideogame = () =>{
const dispatch = useDispatch();
let genresOnDb = useSelector(state => state.genres);

const [input, setInput] = useState({
    name:'',
    image:'',
    description:'',
    release_date:'',
    rating:0,
    platforms:['PC','Xbox'],
    genres:['Action','RPG']
})

useEffect(()=>{
    dispatch(getAllGenres());
    // quiero limpiar el componente pero no se como se hace
},[]);
const inputHandler = function(e){
    setInput({...input, [e.target.name]: e.target.value});
  };

  const submitHandler = (evento) => {
    evento.preventDefault();
   dispatch(createGame(input))
  };

        return(
            <div>
                <div>
                    <Link to='/home'>
                    <button>Home</button>
                    </Link>
                </div>
                <form onSubmit={submitHandler}>
                    <label htmlFor="name">Nombre</label><input type="text" name="name" onChange={inputHandler} value={input.name}/>
                    <label htmlFor="image">image</label><input type="text" name="image" onChange={inputHandler} value={input.image}/>
                    <label htmlFor="description">description</label><input type="text" name="description" onChange={inputHandler} value={input.description}/>
                    <label htmlFor="release_date">release_date</label><input type="date" name="release_date" onChange={inputHandler} value={input.release_date}/>
                    <label htmlFor="rating">rating</label><input type="text" name="rating" onChange={inputHandler} value={input.rating}/>
                    <label htmlFor="platforms">platforms</label><input type="text" name="platforms" onChange={inputHandler} value={input.platforms}/>
                    <label htmlFor="genres">genres</label><input type="text" name="genres" onChange={inputHandler} value={input.genres}/>
                    <button type="submit">Button</button>
                </form>
            </div>
        )
    }
export default CreateVideogame;