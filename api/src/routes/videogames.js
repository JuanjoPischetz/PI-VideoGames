require('dotenv').config();
const { Op } = require("sequelize");
const { Router, response } = require('express');
const {Videogame, Genre} = require('../db.js');
const axios = require('axios');
const {APIKEY} = process.env;
const router = Router();

router.get('/', async (req,res)=>{
    const promesa1 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`);
    const promesa2 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=2`);
    const promesa3 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=3`);
    const promesa4 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=4`);
    const promesa5 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=5`);
    try {
       const {name} = req.query;
       if (name){ //si existe el parametro hago esto
        let name2 = name.toLowerCase();
        let dbByName = await Videogame.findAll(
            {where: 
                {name: {
                    [Op.iLike]:`%${name2}%`
                }},
                include: {
                    model: Genre,
                    attributes :['name'],
                    through:{
                        attributes:[]
                    }
                }
            });
        let dbByName2 =[]
        for (let i = 0; i< dbByName.length;i++){
            let {id, name, rating, image, genres} = dbByName[i];
            let obj={
                id, name, rating, image,
                genres:genres.map(e=>e.name)
                }
            dbByName2.push(obj)
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////   
        let response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`);
        let {results} = response.data;
        if (!results.length) return res.status(404).send('Sin resultados API');
        let filtrados = results.map(e => {
            let obj = {
                id:e.id,
                name:e.name,
                rating:e.rating,
                image: e.background_image,
                genres:e.genres.map(genre => genre.name)
            }
            return obj;
           });
        let byName = filtrados.filter(e => e.name.toLowerCase().includes(name2));
        if(!byName.length && !dbByName.length) return res.status(404).send('Lo sentimos, no existe un juego con ese nombre aun');
        byName = [...dbByName2,...byName];
        byName.splice(15); //me aseguro que lleguen hasta 15 resultados.
        return res.status(200).json(byName); 
       }
       else {
        //con Promise.All ahorro tiempo de no hacer 5 await en serie, los hago en paralelo
        let dbByName = await Videogame.findAll(
            {
                include: {
                    model: Genre,
                    attributes :['name'],
                    through:{
                        attributes:[]
                    }
                }
            });
            let dbByName2 =[]
            for (let i = 0; i< dbByName.length;i++){
            let {id, name, rating, image, genres} = dbByName[i];
            let obj={
                id, name, rating, image,
                genres:genres.map(e=>e.name)
                }
            dbByName2.push(obj)
        }         
       const response = await Promise.all([promesa1,promesa2,promesa3,promesa4,promesa5]);
       let filtrados =[];
       //Extraigo solo los juegos de la respuesta
       for(let i =0; i< response.length; i++){
        filtrados.push(response[i].data.results)
       }
       let filtrados2 =[];
       //ordeno la información en un array unidimensional
       for (let i = 0; i< filtrados.length;i++){
        filtrados2 = [...filtrados2, ...filtrados[i]];
       }
       //extraigo los datos que me interesan enviar al front
       let filtrados3 = filtrados2.map(e => {
        let obj = {
            id:e.id,
            name:e.name,
            rating:e.rating,
            image: e.background_image,
            genres:e.genres.map(genre => genre.name)
        }
        return obj;
       });
       return res.status(200).json([...dbByName2 ,...filtrados3]);}
    
    } catch (error) { //manejo errores que puedan surgir de las promesas
        console.error(error)
        res.status(400).send('Algo salio mal en /GET');
    }
})
router.post('/', async (req,res)=>{
    try {
        const {name, description, platforms, genres} = req.body;
        if (!name) return res.status(400).send('Debe tener Nombre');
        if (!description) return res.status(400).send('Agregar descripción');
        if (!platforms) return res.status(400).send('Agregar Plataforma/s');
        else {
            const newVideogame =await Videogame.create(req.body);
            const findGenres = await Genre.findAll({where:{name:genres}});//
            newVideogame.addGenres(findGenres);
            return res.status(201).send(newVideogame);
        }
    } catch (error) {
        console.error(error)
        res.status(400).send('Algo salio malen /POST');
    }
})

module.exports = router;