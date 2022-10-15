import React from "react";

const Paginado = ({howManyGames, allVideoGames, pages, current, next, prev})=>{
    const paginas = [];
    for(let i =1; i <= Math.ceil(allVideoGames/howManyGames);i++){
        paginas.push(i);
    }
    console.log(paginas)
    return(
        <nav>
            <ul >
            { current !== 1 && <button onClick={()=>pages(prev)}>PREV</button>}
                {
                    paginas?.map(n =>{
                        return(
                        <ul key={n}>
                            {(Math.abs(current -n)<= 2) && <button onClick={()=>pages(n)}>{n}</button>}
                        </ul>
                        )
                    })
                }
            {current !== 7 && <button onClick={()=>pages(next)}>NEXT</button>}
            </ul>
        </nav>
    )

}

export default Paginado;