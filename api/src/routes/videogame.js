require('dotenv').config();
const { Router, response } = require('express');
const {Videogame, Genre} = require('../db.js');
const axios = require('axios');
const {APIKEY} = process.env;
const router = Router();

router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    try {
        if (id.includes('-')){
            let details = await Videogame.findByPk(id,{
                include: {
                    model: Genre,
                    attributes :['name'],
                    through:{
                        attributes:[]
                    }
                }
            });
            let {name, description, release_date, rating, platforms, image, genres} = details;
            let obj={
                name, description, release_date, rating, platforms, image,
                genres:genres.map(e=>e.name)
                }
            return res.status(200).json(obj);
            }
            else {
                let details = await axios.get(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`);
                let {background_image, name, description_raw, genres, released, rating, platforms} = details.data;
                let fillPlatforms = platforms.map(prop => prop.platform.name);
                const obj = {
                    name,
                    image:background_image,
                    genres:genres.map(genre=>genre.name),
                    description:description_raw,
                    release_date:released,
                    rating,
                    platforms:fillPlatforms
                    }
                return res.status(200).json(obj);
            }
           
        
    } catch (error) {
        console.error(error)
        res.status(400).send('ID inexistente')
    }

})

router.delete('/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        let sayGoodBye = await Videogame.findByPk(id);
        await sayGoodBye.destroy();
        res.status(200).send('Borrado exitoso');
    } catch (error) {
        console.error(error);
        res.status(404).send('No existe ese juego en nuesta base de datos')
    }
})

module.exports = router;

//ejemplo https://api.rawg.io/api/games/3498?key=83d127e0adf64f64a081474c15ff5d2a
/*
] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
[ ] Descripción
[ ] Fecha de lanzamiento
[ ] Rating
[ ] Plataformas
 */