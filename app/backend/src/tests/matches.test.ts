import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import allMatches from './mocks/matches.mocks'

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota de Matches', () => {
  it('Deve retornar todas as partidas ao solicitar a rota "/matches"', async () => {
    const httpResponse = await chai.request(app).
    get('/matches')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal(allMatches)
  });

  // it('Deve retornar a role do usuário, caso seja passado um usuário e senhas válidos', async () => {
  //   const httpResponseLogin = await chai.request(app).
  //   post('/login')
  //   .send({email: 'admin@admin.com', password: 'secret_admin'})

  //   const httpResponse = await chai.request(app).
  //   get('/login/validate')
  //   .send().set('Authorization', httpResponseLogin.body.token)
  //   expect(httpResponse.status).to.be.equal(200);
  //   expect(httpResponse.body).to.deep.equal({role: 'admin'})

  // });
});
