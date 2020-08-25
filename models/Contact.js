import database from './index.js';
import Sequelize from 'sequelize';
const { DataTypes, UUIDV4 } = Sequelize;

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
            notNull: true,
            validatePhone: value => /^(+88)?01[0-9]{9}$/.text(value)
        }
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
        // @todo should it be unique?
    }
});

export default Contact;