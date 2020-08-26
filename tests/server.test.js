import { server } from '../server.js';
import request from 'supertest';

describe('server running', function () {
    it('should return with 200 status', async function () {
        await request(server)
            .get('/')
            .expect(200);
    });
});
