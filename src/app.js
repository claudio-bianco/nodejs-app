const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/sum/:a/:b', (req, res) => {
  const {a, b} = req.params;
  res.send(String(parseInt(a) + parseInt(b)));
});

app.get('/optional', (req, res) => {
  if (false) {
    res.send('Nunca cai aqui');
  } else {
    res.send('Sempre aqui');
  }
});

module.exports = app; // Export for testing
