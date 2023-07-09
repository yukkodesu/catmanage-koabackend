const { Sequelize } = require('sequelize');
const {dbUser, dbPassword} = require('../config/server.config');

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@localhost:5432/postgres`,
    {
        define: {
            timestamps: false
        }
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to DB successfully!');
    } catch (e) {
        console.error(`Error in connect DB: ${e}`);
        throw e;
    }
})();

module.exports = sequelize;