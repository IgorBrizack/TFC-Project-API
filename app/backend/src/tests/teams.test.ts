import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { allTeams, oneTeam } from './mocks/teams.mock';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testando a rota de Teams', () => {
  it('Deve retornar todos os times ao ser consultado a rota "/teams"', async () => {
    const httpResponse = await chai.request(app).
    get('/teams')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal(allTeams)
  });

  it('Deve retornar um time ao passar um id de time válido ao ser consultado a rota "/teams"', async () => {
    const httpResponse = await chai.request(app).
    get('/teams/2')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal(oneTeam)
  });
});


