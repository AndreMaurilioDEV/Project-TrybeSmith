import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import Sinon from 'sinon';
import productService from '../../../src/services/product.service';
import { Product } from '../../../src/types/Product';
chai.use(chaiHttp);

describe('POST /products', function async () { 
  beforeEach(function () { sinon.restore(); });

  it ('Teste Inserção de produto', async () => {
    const product = {
      name: 'Martelo de Thor',
      price: '30 ouro',
      userId: 10
    };
    sinon.stub(productService, 'createProduct').resolves({ status: 'SUCCESSFUL', data: product });
    const response =  await chai.request(app)
          .post('/products')
          .send(product);
        expect(response.status).to.be.equal(201);
        expect(response.body).to.deep.equal(product);
    
  });
  it ('Name length inválido', async () => {
    const product = {
      name: 'Ma',
      price: '30 ouro',
      userId: 10
    };
    const create = await productService.createProduct(product);
    expect(create.status).to.be.equal('UNPROCESSABLE_ENTITY');
  });

  it ('Name inexistente', async () => {
    const product = {
      price: '30 ouro',
      userId: 10
    } as Product;
    const create = await productService.createProduct(product);
    expect(create.status).to.be.equal('INVALID_DATA');
  });

  it ('Price inexistente', async () => {
    const product = {
      name: 'Martelo do Thor',
      userId: 10
    } as Product;
    const create = await productService.createProduct(product);
    expect(create.status).to.be.equal('INVALID_DATA');
  });

  it ('Price length inválido', async () => {
    const product = {
      name: 'Martelo',
      price: '30',
      userId: 10
    };
    const create = await productService.createProduct(product);
    expect(create.status).to.be.equal('UNPROCESSABLE_ENTITY');
  });

  it ('User inexistente', async () => {
    const product = {
      name: 'Martelo do Thor',
      price: '30 Ouros'
    } as Product;
    const create = await productService.createProduct(product);
    expect(create.status).to.be.equal('INVALID_DATA');
  });

  it ('userId inválido', async () => {
    const product = {
      name: 'Martelo',
      price: '30',
      userId: -1
    };
    const create = await productService.createProduct(product);
    expect(create.status).to.be.equal('UNPROCESSABLE_ENTITY');
  });

});
