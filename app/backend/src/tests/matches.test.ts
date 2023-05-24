import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import MatchModel from '../database/models/MatchModel';
import matchesMock, { createMatchMock, inProgressMock, matchCreatedMock } from './mocks/matches.mock';
import tokenMock from './mocks/token.mock';

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

  it('é possível finalizar uma partida no banco de dados /matches/:id/finish', async () => {   
    sinon
      .stub(MatchModel, "update")
      .resolves([1] as [number]);

    chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/43/finish')

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" })
  });

  it('é possível criar uma partida no banco de dados /matches', async () => {   
    sinon
      .stub(MatchModel, "create")
      .resolves(matchCreatedMock as any);

      sinon
      .stub(MatchModel, "findByPk")
      .onFirstCall()
      .resolves(
        { id: 16,    teamName: "São Paulo" } as any)
      .onSecondCall()
      .resolves(
        { id: 1, teamName: "Avaí/Kindermann" } as any)

    chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .send(createMatchMock)
       .set({'authorization': tokenMock})

    expect(chaiHttpResponse.status).to.be.equal(201)
    expect(chaiHttpResponse.body).to.be.deep.equal(matchCreatedMock)
  });

});
