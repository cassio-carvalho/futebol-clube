import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import UsersModel from '../database/models/UsersModel';
import userMock from './mocks/user.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .restore()
  });

  it('retorna status 200 quando o login está correto na rota /login', async () => {
    sinon
      .stub(UsersModel, "findOne")
      .resolves(userMock as UsersModel);

      const loginBody = {
        email: 'admin@admin.com',
        password: 'secret_admin'
      }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginBody)



    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  it('retorna status 400 quando não é passado email na rota /login', async () => {
    sinon
      .stub(UsersModel, "findOne")
      .resolves(userMock as UsersModel);

      const loginBody = {
        email: '',
        password: 'secret_admin'
      }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginBody)

    expect(chaiHttpResponse.status).to.be.equal(400)
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
  });

  it('retorna status 400 quando não é passado password na rota /login', async () => {
    sinon
      .stub(UsersModel, "findOne")
      .resolves(userMock as UsersModel);

    const loginBody = {
      email: 'admin@admin.com',
      password: ''
    }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginBody)

    expect(chaiHttpResponse.status).to.be.equal(400)
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
  });

});