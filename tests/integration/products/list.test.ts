import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productService from '../../../src/services/product.service';
import usersService from '../../../src/services/users.service';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it ('Teste listagem de produto', async () => {
    sinon.stub(productService, 'listProducts').resolves();
    const response =  await chai.request(app)
          .get('/products')
          .send();
        expect(response.status).to.be.equal(200);
  });

  it ('Teste listagem de usuários', async () => {
    sinon.stub(usersService, 'listUsers').resolves();
    const response = await chai.request(app)
    .get('/users')
    .send();
    expect(response.status).to.be.equal(200);
  });

  it ('Listagem de usuários', async () => {
    const users = await usersService.listUsers();
    expect(users).to.be.an('array');
    expect(users.length).to.be.above(0);
  });

  it ('Error ao listar usuários', async () => {
    sinon.stub(usersService, 'listUsers').rejects(new Error('Usuário não encontrado'));
    const response =  await chai.request(app)
          .post('/users')
          .send();
        expect(response.status).to.be.equal(404);
  });
});
