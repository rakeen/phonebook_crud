import database from './index.js';
import Sequelize from 'sequelize';
const { DataTypes, UUIDV4 } = Sequelize;

/**
 * Convert to migration file technique when project gets complex.
 * `.sync()` is not safe. Especially when `force` is `true`.
 * @see https://medium.com/@smallbee/how-to-use-sequelize-sync-without-difficulties-4645a8d96841
 */
database.sync();

const Contact = database.define('Contact', {
    contactId: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        unique: true,
        validate: {
            notNull: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            is: /^(\+88)?01\d{9}$/
        }
        // @todo should it be unique?
    }
});

export default Contact;