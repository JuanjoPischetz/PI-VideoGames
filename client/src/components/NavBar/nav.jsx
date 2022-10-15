import React from "react";
import { Link } from "react-router-dom";

const Nav = ()=>{
    return(
        <div>
            <ul>
                <Link to = '/home'>
                    <button>Home</button>
                </Link>
                <Link to='/create'>
                <button>Create VideoGame</button>
                </Link>
            </ul>
        </div>
    )
}

export default Nav;