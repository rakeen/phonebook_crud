import faker from 'faker';
import database from './models/index.js';
import Contact from './models/Contact.js';

const generateContact = _ => {
    return {
        name: faker.name.findName(),
        mobileNumber: faker.random.arrayElement([
            faker.phone.phoneNumber('01#########'),
            faker.phone.phoneNumber('+8801#########')
        ])
    }
};

(async _ => {
    await database.sync();
    for (let i = 0; i < 20; i++) await Contact.create(generateContact());
})();