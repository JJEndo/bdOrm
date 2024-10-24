const Sequelize = require ("sequelize");

//configarcion 
const sequelize = new Sequelize(
    'ormgames',
    'root',
    '',
    {
        host: 'localhost',
        //indicamos el motor con el que trabajamos
        dialect: 'mysql'
    }
);
//estructura fetch
sequelize.authenticate().then(() =>{
    console.log("Conexión establecida correctamente");

}).catch((error)=>{
    console.log("No se ha podido conectar", error);
});