// Import the required Sequelize modules and DataTypes
const { Sequelize, DataTypes, where } = require("sequelize");

// Configuration for connecting to the MySQL database using Sequelize
const sequelize = new Sequelize(
    'ormgames', // Database name
    'root',     // Username
    '',         // Password (empty in this case)
    {
        host: 'localhost',  // Database host
        // Specify the database dialect (in this case, MySQL)
        dialect: 'mysql'
    }
);

// Test the connection to the database using promises
sequelize.authenticate().then(() => {
    console.log("Connection to the database successfully established.");
}).catch((error) => {
    console.log("Unable to connect.", error);
});

// Define a Sequelize model for the 'games' table
const Game = sequelize.define("games", {
    title: {
        type: DataTypes.STRING,   // Game title as a string
        allowNull: false          // Title cannot be null
    },
    developer: {
        type: DataTypes.STRING,   // Developer name as a string
        allowNull: false          // Developer cannot be null
    },
    release_date: {
        type: DataTypes.DATEONLY   // Release date in YYYY-MM-DD format
    },
    category: {
        type: DataTypes.INTEGER    // Category as an integer (e.g., genre ID)
    }
});

// Sync the model with the database, creating the table if it doesn't exist
sequelize.sync().then(() => {
    console.log("Table successfully created.");
}).catch((e) => {
    console.log("The table could not be created.", e);
});