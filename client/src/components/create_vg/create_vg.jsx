import React from "react";
import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from 'react-redux';
import { createGame,getAllGenres } from "../../redux/actions";
import styles from './create_vg.module.css';
import bgImage from './bg_image.jpg';

const CreateVideogame = () =>{
const dispatch = useDispatch();
let genresOnDb = useSelector(state => state.genres);
const [input, setInput] = useState({
    name:'',
    image:'',
    description:'',
    release_date:'',
    rating:'',
    platforms:[],
    genres:[]
})
const [errors, setErrors] = useState({})
const platformsArray = ['PC', 'PlayStation 5','PlayStation 4', 'Xbox', 'Xbox 360', 'Sega',
 'Sega Genesis', 'Sega Dreamcast', 'Nintendo 64', 'Nintendo Switch', 'Nintendo 3DS', 'GameBoy Advance',
  'GameBoy Color', 'Android', 'IOs', 'Nintendo Wii']



useEffect(()=>{
    dispatch(getAllGenres());
},[]);


const validaciones = function(input){
    let errors ={}
    if(!input.name){
        errors.name='Complete campo nombre';
    }
    if (!input.description){
        errors.description='Agregue una descripcion';
    }
    if(input.rating <= 0 || input.rating>5 || !input.rating){
        errors.rating='Califica entre 1 y 5 incluido';
    }
    if(!input.platforms.length){
        errors.platforms='Seleccione al menos una plataforma';
    }
    return errors;
}

const inputHandler = function(e){
    setInput({...input, [e.target.name]: e.target.value});
    setErrors(validaciones({
        ...input, [e.target.name]: e.target.value
    }))
    console.log(errors)
  };
const deleteHandler = function(e){
    e.preventDefault();
    setInput({
        ...input,
        genres: input.genres.filter(g => g !== e.target.value)
    })
}
const deleteHandler2 = function(e){
    e.preventDefault();
    setInput({
        ...input,
        platforms: input.platforms.filter(g => g !== e.target.value)
    })
    setErrors(validaciones({
        ...input,
        platforms: input.platforms.filter(g => g !== e.target.value)
    }))
}

const selectHandler = function(e){
    if(input.genres.includes(e.target.value)) setInput(input)
    else
    setInput({
        ...input,
        genres: [...input.genres, e.target.value]
    })
}
const selectHandler2 = function(e){
    if(input.platforms.includes(e.target.value)) setInput(input)
    else {setInput({
        ...input,
        platforms: [...input.platforms, e.target.value]
    })
    setErrors(validaciones({
        ...input,
        platforms: [...input.platforms,e.target.value]
    }))}

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
            <div className={styles.main}>
                <div className={styles.cover}></div>
                <img src={bgImage} alt="Background Image" className={styles.image}/>
                <div className={styles.div_home}>
                    <Link to='/home'>
                    <button className={styles.home}>Home</button>
                    </Link>
                </div>
                <form onSubmit={submitHandler} className={styles.container}>
                    <div className={styles.campos}>
                    <label htmlFor="name">Name :</label>
                    <input type="text" name="name" onChange={inputHandler} value={input.name}
                     placeholder='Field Required' className={errors.name ? styles.error : styles.correct}/>
                    </div>
                    <div className={styles.campos}>
                    <label htmlFor="image">Imagen :</label>
                    <input type="text" name="image" onChange={inputHandler} placeholder='URL Only'
                    value={input.image} className = {styles.correct}/>
                    </div>
                    <div className={styles.campos}>
                    <label htmlFor="description">Description :</label>
                    <input type="text" name="description" onChange={inputHandler} value={input.description}
                    placeholder='Field Required' className={errors.description ? styles.error : styles.correct}/>
                    </div>
                    <div className={styles.campos}>
                    <label htmlFor="release_date">Release Date :</label>
                    <input type="date" name="release_date" onChange={inputHandler} value={input.release_date}
                    className={styles.correct}/>
                    </div>
                    <div className={styles.campos}>
                    <label htmlFor="rating">Rating :</label>
                    <input type="text" name="rating" onChange={inputHandler} value={input.rating}
                    className={errors.rating ? styles.error : styles.correct} placeholder='Score me!'/>
                    </div>
                    <div className={styles.campos}>
                    <label htmlFor="Plataformas">Platforms :</label>
                    <select onChange={selectHandler2} className={errors.platforms ? styles.error : styles.correct}>
                    {!input.platforms.length && <option value='none'>select</option>}
                    {
                        platformsArray?.map(gen =>{
                            return(
                                <option value={gen}>{gen}</option>
                                )
                            })
                        }
                    </select> <br />
                    {input.platforms.length !== 0 && input.platforms.map(gen =>{
                        return(
                            <button value={gen} name={gen} onClick={deleteHandler2}
                            className={styles.buttonOpt}>{gen}</button>
                        )
                    })}
                    </div>
                    <div className={styles.campos}>
                    <label htmlFor="Generos">Genres :</label>
                    <select onChange={selectHandler} className={styles.correct}>
                    {!input.genres.length && <option value='none'>select</option>}
                    {
                        genresOnDb?.map(gen =>{
                            return(
                                <option value={gen}>{gen}</option>
                                )
                            })
                        }
                    </select> <br />
                    {input.genres.length !== 0 && input.genres.map(gen =>{
                        return(
                            <button value={gen} name={gen} onClick={deleteHandler}
                            className={styles.buttonOpt}>{gen}</button>
                        )
                    })}
                    </div>
                    <div className={styles.div_create}>
                    {(input.name !== ''&& input.description !== '' && !errors.platforms && !errors.rating) 
                    && <button type="submit" className={styles.create}>Create!</button>}
                    </div>
                </form>
            </div>
        )
    }
export default CreateVideogame;