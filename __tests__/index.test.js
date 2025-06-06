const request = require('supertest');
const app = require('../src/index');

let server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    console.log('Test server running on port 3000');
    done(); // Let Jest know we're ready
  });
});

afterAll((done) => {
  server.close(done); // Clean up after tests
});

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should return "Hello World!"', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello World!');
  });
});

describe('GET /sum/:a/:b', () => {
  it('should return the sum of two numbers', async () => {
    const response = await request(app).get('/sum/5/3');
    expect(response.text).toBe('8');
  });
});
