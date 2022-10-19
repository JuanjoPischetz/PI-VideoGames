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
    platforms:[],
    genres:[]
})
const [errors, setErrors] = useState({})



useEffect(()=>{
    dispatch(getAllGenres());
},[]);


const validaciones = function(input){
    let errors ={}
    if(!input.name){
        errors.name='Complete campo nombre';
    }
    else if (!input.description){
        errors.description='Agregue una descripcion';
    }
    else if(input.rating <= 0 || input.rating>5 || !input.rating){
        errors.rating='Califica entre 1 y 5 incluido';
    }
    else if(!input.platforms){
        errors.platforms='Seleccione al menos una plataforma';
    }
    return errors;
}

const inputHandler = function(e){
    setInput({...input, [e.target.name]: e.target.value});
    setErrors(validaciones({
        ...input, [e.target.name]: e.target.value
    }))
  };

const checkHandler = function(e){
    if(e.target.checked){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validaciones({
            ...input,
            platforms: [...input.platforms, e.target.value]
        }))
    }
}
const selectHandler = function(e){
    setInput({
        ...input,
        genres: [...input.genres, e.target.value]
    })
}
  const submitHandler = (evento) => {
    evento.preventDefault();
    dispatch(createGame(input))
    setInput({
        name:'',
        image:'',
        description:'',
        release_date:'',
        rating:0,
        platforms:[],
        genres:[]
    })
  };

        return(
            <div>
                <div>
                    <Link to='/home'>
                    <button>Home</button>
                    </Link>
                </div>
                <form onSubmit={submitHandler}>
                    <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" onChange={inputHandler} value={input.name} placeholder='Obligatorio'/>
                    </div>
                    <div>
                    <label htmlFor="image">Imagen</label>
                    <input type="text" name="image" onChange={inputHandler} value={input.image}/>
                    </div>
                    <div>
                    <label htmlFor="description">Descripción</label>
                    <input type="text" name="description" onChange={inputHandler} value={input.description}placeholder='Obligatorio'/>
                    </div>
                    <div>
                    <label htmlFor="release_date">Fecha de Lanzamiento</label>
                    <input type="date" name="release_date" onChange={inputHandler} value={input.release_date}/>
                    </div>
                    <div>
                    <label htmlFor="rating">Rating</label>
                    <input type="text" name="rating" onChange={inputHandler} value={input.rating}/>
                    </div>
                    <div>
                    <label htmlFor="platforms">Plataformas</label>
                    <div>
                    <label htmlFor="Pc"><input type="checkbox" name='Pc' value='Pc' onChange={checkHandler}/>Pc</label>
                    <label htmlFor="PS5/PS4"><input type="checkbox" name='PS5/PS4' value='PS5/PS4' onChange={checkHandler}/>PS5/PS4</label>
                    <label htmlFor="Xbox"><input type="checkbox" name='Xbox' value='Xbox' onChange={checkHandler}/>Xbox</label>
                    <label htmlFor="NintendoSwitch"><input type="checkbox" name='NintendoSwitch' value='NintendoSwitch' onChange={checkHandler}/>NintendoSwitch</label>
                    <label htmlFor="Meta"><input type="checkbox" name='Meta' value='Meta' onChange={checkHandler}/>Meta</label>
                    </div>
                    </div>
                    <select onChange={selectHandler}>
                    {
                        genresOnDb?.map(gen =>{
                            return(
                                <option value={gen}>{gen}</option>
                                )
                            })
                        }
                    </select> <br />
                    <span>{input.genres.join(', ')}</span>
                    <div>
                    {errors.platforms && <button type="submit">Crear!</button>}
                    </div>
                </form>
            </div>
        )
    }
export default CreateVideogame;