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
