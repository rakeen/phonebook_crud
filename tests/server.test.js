import { server } from '../server.js';
import request from 'supertest';

describe('server running', function () {
    it('should return with 200 status', async function () {
        await request(server)
            .get('/')
            .expect(200);
    });
});

const API_URL_PREFIX = '/api/v1';

describe('Contact Create', function () {
    it('should create new Contact', async function () {
        const payload = {
            name: "Lorem",
            mobileNumber: "01722222222"
        };
        const response = await request(server)
            .post(`${API_URL_PREFIX}/contacts`)
            .send(payload)
            .set('Accept', 'application/json')
            .expect(201);
    });
});
describe('Contact Get', function () {
    it('should return contact details given contact id', async function () {
        const contact = {
            name: "Lorem 2",
            mobileNumber: "01722422222"
        };
        const contactResponse = await request(server)
            .post(`${API_URL_PREFIX}/contacts`)
            .send(contact);
        const contactId = contactResponse?.body?.contactId;

        const response = await request(server)
            .get(`${API_URL_PREFIX}/contacts?mobileNumber=${contact.mobileNumber}`)
            .expect(200);

        // mobileNumber search can return multiple results
        expect(response.body[0]?.contactId).toBe(contactId);
    });
describe('Contact Delete', function () {
    it('should delete a contact', async function () {
        const contact = {
            name: "Lorem 3",
            mobileNumber: "01732422222"
        };
        const contactResponse = await request(server)
            .post(`${API_URL_PREFIX}/contacts`)
            .send(contact);
        const contactId = contactResponse?.body?.contactId;

        await request(server)
            .delete(`${API_URL_PREFIX}/contacts/${contactId}`)
            .expect(204);
    });
    it('should return 404 if contact not found', async function () {
        await request(server)
            .delete(`${API_URL_PREFIX}/contacts/11`)
            .expect(404);
    });
});
