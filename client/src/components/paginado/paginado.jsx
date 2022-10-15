import React from "react";

const Paginado = ({howManyGames, allVideoGames, pages})=>{
    const paginas = [];
    for(let i =1; i <= Math.ceil(allVideoGames/howManyGames);i++){
        paginas.push(i);
    }
    console.log(paginas)
    return(
        <nav>
            <ul >
                {
                    paginas?.map(n =>{
                        return(<ul key={n}>
                            <button onClick={()=>pages(n)}>{n}</button>
                            </ul>
                        )
                    })
                }
            </ul>
        </nav>
    )

}

export default Paginado;