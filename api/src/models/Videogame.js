const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    release_date:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    rating:{
      type:DataTypes.INTEGER,
      defaultValue: 1,
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      defaultValue: 'https://i.ibb.co/2YsWxyR/Default-image.png'
    }
  },
  {
    timestamps: false,
  }
  );
};


/*
ID: * No puede ser un ID de un videojuego ya existente en la API rawg
Nombre *
Descripción *
Fecha de lanzamiento
Rating
Plataformas *


IMPORTANTE: Pensar como modelar los IDs de los videojuegos en la base de datos. 
Existen distintas formas correctas de hacerlo pero tener en cuenta que cuando hagamos click en 
algun videojuego, este puede provenir de la API o de la Base de Datos por lo que 
cuando muestre su detalle no debería haber ambigüedad en cual se debería mostrar. 
Por ejemplo si en la API el videojuego Age of Empires II: Age of Kings tiene id = 1 y 
en nuestra base de datos creamos un nuevo videojuego Age of Henry con id = 1, ver la forma de 
diferenciarlos cuando querramos acceder al detalle del mismo.
 */