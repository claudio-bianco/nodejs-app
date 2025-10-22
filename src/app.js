const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/sum/:a/:b', (req, res) => {
  const {a, b} = req.params;
  res.send(String(parseInt(a) + parseInt(b)));
});

// ⚠️ Bloco nunca testado (reduz cobertura)
if (process.env.REDUCE_COVERAGE === 'true') {
  console.log('Simulação: este trecho nunca será testado');
}

module.exports = app; // Export for testing
