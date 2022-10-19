import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { resetFlag404 } from "../../redux/actions";

const Error404 = ()=>{
let dispatch = useDispatch();

useEffect(()=>{
dispatch(resetFlag404());
},[])


    return(
        <div>
            <h1> Error 404</h1>
            <Link to='/home'>
                <button>Home</button>
            </Link>
        </div>
    )
}

export default Error404;