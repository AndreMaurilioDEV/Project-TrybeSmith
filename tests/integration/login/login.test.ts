import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import loginController from '../../../src/controllers/login.controller';
import loginService from '../../../src/services/login.service';

chai.use(chaiHttp);
describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Teste status com username inválido', async () => {
    const body = {
      password: 'André',
    };
    const response = await chai.request(app)
    .post('/login')
    .send(body);
    expect(response.status).to.be.equal(400);
  });


  it('Teste Service Status com username inválido', async () => {
    const body = {
      username: 'Teste',
      password: 'Teste',
    };
    const login = await loginService.verifyLogin(body)
    expect(login.status).to.be.equal('UNAUTHORIZED');
  });

});
