const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/sum/:a/:b', (req, res) => {
  const {a, b} = req.params;
  res.send(String(parseInt(a) + parseInt(b)));
});

// 👇 Adiciona lógica nunca testada:
if (process.env.NODE_ENV === 'production-check') {
  console.log('Este bloco nunca será testado');
}

module.exports = app; // Export for testing
