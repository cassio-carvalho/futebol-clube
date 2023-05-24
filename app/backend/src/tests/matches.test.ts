import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import MatchModel from '../database/models/MatchModel';
import matchesMock, { inProgressMock } from './mocks/matches.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .restore()
  });

  it('retorna todas as partidas no endpoint /matches', async () => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves(matchesMock as any);
      
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')


       expect(chaiHttpResponse.status).to.be.equal(200)   
       expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock)
  });

  it('retorna as partidas em progresso no endpoint /matches?inProgress=true', async () => {   
    sinon
      .stub(MatchModel, "findAll")
      .resolves(inProgressMock as any);

    chaiHttpResponse = await chai
       .request(app)
       .get('/matches?inProgress=true')

       expect(chaiHttpResponse.status).to.be.equal(200)
       expect(chaiHttpResponse.body).to.be.deep.equal(inProgressMock)
  });
});
