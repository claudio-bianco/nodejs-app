const express = require('express');
const app = express();
const port = 3000;

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/sum/:a/:b', (req, res) => {
  const {a, b} = req.params;
  res.send(String(parseInt(a) + parseInt(b)));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app; // Export for testing
