const request = require('supertest');
const express = require('express');
const router = require('../routes/api/employees'); // path to your router file
const pool = require('../utils/db');

const app = express();
app.use(express.json());
app.use('/', router);

let token;

async function loginUser() {
    const res = await request(app)
        .post('/login') // replace with your login route
        .send({
            username: 'admin',
            password: 'admin'
        });
    return res.body.token;
}

describe('Employees API', () => {
    beforeAll(async () => {
        token = await loginUser();
    });

    it('should fetch roles', async () => {
        const res = await request(app)
            .get('/roles')
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
    });

    it('should fetch all employees', async () => {
        const res = await request(app)
            .get('/')
            .set('Accept', 'application/json');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
    });

    // Add more tests for the other endpoints
});
