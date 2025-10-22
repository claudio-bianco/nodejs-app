const request = require('supertest');
const app = require('../src/app');

let server;

describe('API básica', () => {
  describe('GET /', () => {
    it('deve responder 200 e "Hello World!"', async () => {
      await request(app)
        .get('/')
        .expect('Content-Type', /text\/html|text\/plain/)
        .expect(200, 'Hello World!');
    });
  });

describe('GET /sum/:a/:b', () => {
  it('soma inteiros positivos', async () => {
    await request(app)
      .get('/sum/1/2')
      .expect(200, '3');
  });

  it('soma com números negativos', async () => {
    await request(app)
      .get('/sum/-1/-2')
      .expect(200, '-3');
  });

  it('parseInt trunca decimais (2.9 + 3.1 -> 5)', async () => {
    await request(app)
      .get('/sum/2.9/3.1')
      .expect(200, '5'); // parseInt('2.9') === 2; parseInt('3.1') === 3
  });

  it('parseInt ignora sufixos não numéricos ("10a" + "5" -> 15)', async () => {
    await request(app)
      .get('/sum/10a/5')
      .expect(200, '15'); // parseInt('10a') === 10
  });

  it('resultado NaN quando ambos não numéricos', async () => {
    await request(app)
      .get('/sum/a/b')
      .expect(200, 'NaN'); // String(NaN) === 'NaN'
  });

  it('número grande continua funcionando (sem overflow de parseInt)', async () => {
    const bigA = '9007199254740991'; // Number.MAX_SAFE_INTEGER
    const bigB = '0';
    await request(app)
      .get(`/sum/${bigA}/${bigB}`)
      .expect(200, bigA);
  });
});

describe('Rota inexistente', () => {
  it('retorna 404 para caminhos desconhecidos', async () => {
    await request(app)
      .get('/nao-existe')
      .expect(404);
  });
});
});
