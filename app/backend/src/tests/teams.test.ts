import * as sinon from 'sinon';
import * as chai from 'chai';
import Teams from '../database/models/Teams';
import { allTeams, oneTeam } from './mocks/teams.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import ITeam from '../interfaces/teamsInterface';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota de Teams', () => {

  it('Deve retornar todos os teams quando a rota "/teams" for solicitada', async () => {
    const httpResponse = await chai.request(app).
    get('/teams')

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(allTeams)
  });

  it('Deve retornar o team selecionado na rota "/teams:id" quando passado um id válido', async() => {
    const httpResponse = await chai.request(app).
    get('/teams/2')

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(oneTeam)
  })
});

