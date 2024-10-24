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

// Insert a new game record into the 'games' table
sequelize.sync().then(() => {
    console.log("Table access successfully");

    // Create a new record for the game "World of Warcraft"
    Game.create({
        title: "World of Warcraft",
        developer: "Blizzard",
        release_date: "2005-05-04",
        category: 4  // Assuming category '4' represents a certain genre or type
    }).then((res) => {
        console.log(res);  // Log the created record
    }).catch((err) => {
        console.log("Failed to create record.", err);
    });
}).catch((e) => {
    console.log("The record could not be created.", e);
});

// Fetch and display all game records from the 'games' table
sequelize.sync().then(() => {
    console.log("Table access successfully");

    // Fetch all records from the 'games' table
    Game.findAll().then((res) => {
        console.log(res);  // Log all the records
    }).catch((err) => {
        console.log("Error selecting record.", err);
    });
}).catch((e) => {
    console.log("Table could not be accessed.", e);
});

// Fetch a single game record based on a condition (developer name)
sequelize.sync().then(() => {
    console.log("Table access successfully");

    // Find one game where the developer is "Blizzar" (typo, should be "Blizzard")
    Game.findOne({
        where: {
            developer: "Blizzar"  // This query will likely fail due to the typo
        }
    }).then((res) => {
        console.log(res);  // Log the fetched record
    }).catch((err) => {
        console.log("Error selecting record.", err);
    });
}).catch((e) => {
    console.log("Table could not be accessed.", e);
});

// Delete a game record based on the primary key (id)
sequelize.sync().then(() => {
    console.log("Table access successfully");

    // Delete the record with id = 1
    Game.destroy({
        where: {
            id: 1
        }
    }).then((res) => {
        console.log(res);  // Log the result of the deletion
    }).catch((err) => {
        console.log("Failed to delete record.", err);
    });
}).catch((e) => {
    console.log("Table could not be accessed.", e);
});
