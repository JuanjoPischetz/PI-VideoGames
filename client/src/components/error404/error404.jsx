import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { resetFlag404 } from "../../redux/actions";
import styles from './error404.module.css';
import image404 from './error_image.jpg';

const Error404 = ()=>{
let dispatch = useDispatch();

useEffect(()=>{
dispatch(resetFlag404());
},[])


    return(
        <div className={styles.main}>
            <div className={styles.cover}></div>
            <img src={image404} alt="imagen error 404" className={styles.image}/>
            <div className={styles.div_text}>
            <h1 className={styles.text}> Error 404</h1>
            </div>
            <Link to='/home'>
                <div>
                <span>regresar</span>
                </div>
            </Link>
        </div>
    )
}

export default Error404;