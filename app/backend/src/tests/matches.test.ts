import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {allMatches, matchesInProgress, matchesNotInProgress} from './mocks/matches.mocks'

import { app } from '../app';

import Matches from '../database/models/Matches'; 

const { expect } = chai;

describe('Testando a rota de Matches', () => {
  it('Deve retornar todas as partidas ao solicitar a rota "/matches"', async () => {
    const httpResponse = await chai.request(app).
    get('/matches')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal(allMatches)
  });

  it('Deve retornar todas as partidas em andamento "/matches?inProgress=true"', async () => {
    const httpResponse = await chai.request(app).
    get('/matches?inProgress=true')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal(matchesInProgress)
  });

  it('Deve retornar todas as partidas encerradas "/matches?inProgress=false"', async () => {
    const httpResponse = await chai.request(app).
    get('/matches?inProgress=false')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal(matchesNotInProgress)
  });

  it('Deve ser possível inserir uma nova partida ao passa na rota POST "/matches" uma nova partida', async () => {
    sinon.stub(Matches,'create').resolves({
      id:1,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    } as Matches)

    const httpResponseLogin = await chai.request(app).
    post('/login')
    .send({email: 'admin@admin.com', password: 'secret_admin'})

    const httpResponse = await chai.request(app).
    post('/matches').send({
      "homeTeam": 16,
      "awayTeam": 8, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }).set('Authorization',httpResponseLogin.body.token)

    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.deep.equal({id:1,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,})
  });

  it('Deve ser possível alterar o status inProgress de uma partida que esteja em andamento "/match/:id/finish', async () => {
    sinon.stub(Matches,'update').resolves(null as any)

    const httpResponse = await chai.request(app).
    patch('/matches/48/finish')

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal({message: 'Finished'})
    sinon.restore()
  });

  it('Deve devolver um erro ao inserir uma partida com times iguais', async () => {
    const httpResponseLogin = await chai.request(app).
    post('/login')
    .send({email: 'admin@admin.com', password: 'secret_admin'})

    const httpResponse = await chai.request(app).
    post('/matches').send({
      "homeTeam": 16,
      "awayTeam": 16, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }).set('Authorization',httpResponseLogin.body.token)

    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.deep.equal({message: "It is not possible to create a match with two equal teams"})
  });

  it('Deve ser possível atualizar uma partida em andamento ao passar o id da partida "/matches/:id"', async () => {
    sinon.stub(Matches,'update').resolves(null as any)

    const httpResponse = await chai.request(app).
    patch('/matches/1').send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    })

    expect(httpResponse.status).to.be.equal(200)
    expect(httpResponse.body).to.deep.equal({message: 'Score Updated'})
    sinon.restore()
  });

  it('Não deve ser possível inserir uma nova partida ao passa um time inexistente', async () => {
    // sinon.stub(Matches,'create').resolves()

    const httpResponseLogin = await chai.request(app).
    post('/login')
    .send({email: 'admin@admin.com', password: 'secret_admin'})

    const httpResponse = await chai.request(app).
    post('/matches').send({
      "homeTeam": 99999,
      "awayTeam": 88888, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }).set('Authorization',httpResponseLogin.body.token)

    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.deep.equal({ message: "There is no team with such id!" })
  });

  it('Não deve ser possível inserir uma nova partida ao passa um time inexistente', async () => {
    const httpResponse = await chai.request(app).
    post('/matches').send({
      "homeTeam": 99999,
      "awayTeam": 88888, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }).set('Authorization','invalid_token')

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.deep.equal({ message: "Token must be a valid token" })
  });

  it('Não deve ser possível inserir uma nova partida ao não passar um token', async () => {
    const httpResponse = await chai.request(app).
    post('/matches').send({
      "homeTeam": 99999,
      "awayTeam": 88888, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    })

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Token not found'})
  });
});
