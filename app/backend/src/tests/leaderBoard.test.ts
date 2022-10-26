import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import sequelize from '../database/models'

import { leaderBoardHome, leaderBoardAway, leaderBoardFullTable } from './mocks/leaderBoard.mock'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota de LeaderBoard', () => {
  it('ao chamar a rota GET "/leaderboard" deve retornar a tabela ordenada dos lideres', async () => {
    sinon.stub(sequelize, 'query').resolves([leaderBoardFullTable] as any)

    const httpResponse = await chai.request(app).
    get('/leaderboard')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal(leaderBoardFullTable)

    sinon.restore()
  });

  it('ao chamar a rota GET "/leaderboard/home" deve retornar a tabela dos times da casa', async () => {
    sinon.stub(sequelize, 'query').resolves([leaderBoardHome] as any)

    const httpResponse = await chai.request(app).
    get('/leaderboard/home')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal(leaderBoardHome)
    
    sinon.restore()
  });

  it('ao chamar a rota GET "/leaderboard/away" deve retornar a tabela dos times de fora de casa', async () => {
    sinon.stub(sequelize, 'query').resolves([leaderBoardAway] as any)

    const httpResponse = await chai.request(app).
    get('/leaderboard/away')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal(leaderBoardAway)
    
    sinon.restore()
  });

});
