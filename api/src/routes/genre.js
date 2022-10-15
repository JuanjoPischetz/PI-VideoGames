require('dotenv').config();
const { Router, response } = require('express');
const {Genre} = require('../db');
const axios = require('axios');
const {APIKEY} = process.env;
const router = Router();

router.get('/', async (req,res)=>{
    try {
        const cache = await Genre.findAll();
        if(cache.length){
            let cache2 = cache.map(m=>m.name);
            return res.status(200).send(cache2);
        }
        let response = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
        let {results} = response.data;
        let filtrados = results.map(e => {
            let obj = {
                ID:e.id,
                name:e.name
            }
            return obj;
           });
        const data = await Genre.bulkCreate(filtrados);
        const data2 = data.map(e=>e.name)
        return res.status(200).send(data2);
        
    } catch (error) {
        console.error(error)
        res.status(400).send('Algo salio mal');
    }
})

/*
[ ] GET /genres:
Obtener todos los tipos de géneros de videojuegos posibles
En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos 
y luego ya utilizarlos desde allí */
module.exports = router;