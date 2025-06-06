const request = require('supertest');
const app = require('./app');

describe('GET /hello', () => {
    it('should respond with "Hello World!"', () => {
    return request(app)
        .get('/hello')
        .expect(200)
        .then((response) => {
        expect(response.text).toBe('Hello World!');
        });
    });
});
