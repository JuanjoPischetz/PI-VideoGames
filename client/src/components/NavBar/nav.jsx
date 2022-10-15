import React from "react";
import { Link } from "react-router-dom";

const Nav = ()=>{
    return(
        <div>
            <div>
            <input type='text'  placeholder="Ingresa nombre..."/>
            <button>Search</button>
            </div>
            <ul>
                <Link to = '/home'>
                    <button>Home</button>
                </Link>
                <button>Create VideoGame</button>
            </ul>
        </div>
    )
}

export default Nav;