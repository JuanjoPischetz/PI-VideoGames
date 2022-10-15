const { Router } = require('express');
// Importar todos los routers;
const vgamesRouter = require('./videogames');
const genreRouter = require('./genre');
const vgameRouter = require('./videogame');


const router = Router();

// Configurar los routers
router.use('/genres',genreRouter);
router.use('/videogames',vgamesRouter); 
router.use('/videogame',vgameRouter);


module.exports = router;
