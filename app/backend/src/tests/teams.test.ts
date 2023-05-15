import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import TeamsModel from '../database/models/TeamsModel';
import teamsMock from './mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .restore()
  });

  it('retorna todos os teams no endpoint /teams', async () => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves(teamsMock as TeamsModel[]);
      
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')


    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock)
  });

  it('retorna o time pelo ID no endpoint /teams/:id', async () => {   
    sinon
      .stub(TeamsModel, "findByPk")
      .resolves(teamsMock[0] as TeamsModel);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock[0])
  });
});
