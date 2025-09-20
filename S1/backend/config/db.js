const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false,
});

const db = {};

// Attach sequelize instances to the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load the model definitions by calling the exported functions
db.Role = require('../models/Role')(sequelize);
db.User = require('../models/User')(sequelize);

// --- Create Associations Here (after all models are defined) ---
db.User.belongsTo(db.Role);
db.Role.hasMany(db.User);


// Function to connect, sync, and initialize data
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected successfully.');
    await db.sequelize.sync({ alter: true });
    await initializeRoles();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

const initializeRoles = async () => {
    try {
        // Use the model from our db object
        const count = await db.Role.count();
        if (count === 0) {
            await db.Role.bulkCreate([
                { name: 'student' },
                { name: 'committee' },
                { name: 'admin' }
            ]);
            console.log('Roles initialized in PostgreSQL.');
        }
    } catch (error) {
        console.error('Error initializing roles:', error);
    }
};

// Export the centralized db object and the connect function
module.exports = { db, connectDB };