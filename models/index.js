import Sequelize from 'sequelize';
const database = new Sequelize('sqlite::memory:');
export default database;