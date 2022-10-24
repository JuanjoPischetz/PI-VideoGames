import React from "react";
import styles from './paginado.module.css';

const Paginado = ({howManyGames, allVideoGames, pages, current, next, prev})=>{
    const paginas = [];
    for(let i =1; i <= Math.ceil(allVideoGames/howManyGames);i++){
        paginas.push(i);
    }
    return(
        <nav className={styles.main}>
            {
                !paginas.length ?
                <div className={styles.div_sign}>
                    <h1 className={styles.title}>Ups!</h1>
                    <h3 className={styles.subtitle}>No Games Here!</h3>
                </div>
                 :<ul className={styles.container}>
            <div className={styles.prev}> 
            { (current !== paginas[0]) && <button onClick={()=>pages(prev)}>PREV</button>}
            </div>
            <div className={styles.div_button}>
                {
                    paginas?.map(n =>{
                        return(
                        <div key={n}>
                            {(Math.abs(current -n)<= 2) && <button onClick={()=>pages(n)}
                            className={current === n? styles.current:styles.numbers}>{n}</button>}
                        </div>
                        )
                    })
                }
            </div>
            <div className={styles.next}>
            {(current !== paginas[(paginas.length)-1]) && <button onClick={()=>pages(next)}>NEXT</button>}
            </div>
            </ul>
            }
        </nav>
    )

}

export default Paginado;