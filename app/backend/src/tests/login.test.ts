import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Login from '../database/models';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota de Login', () => {
  it('Deve retornar quando o campo "password" não for informando status 400 ', async () => {
    const httpResponse = await chai.request(app).
    post('/login')
    .send({password: 'any_password'})
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.deep.equal({message:"All fields must be filled" })
  });

  it('Deve retornar quando o campo "email" não for informando status 400 ', async () => {
    const httpResponse = await chai.request(app).
    post('/login')
    .send({email: 'any_email'})
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.deep.equal({message:"All fields must be filled" })
  });

  it('Deve retornar quando o campo "email" for inválido ', async () => {
    const httpResponse = await chai.request(app).
    post('/login')
    .send({email: 'any_email', password: 'any_password'})
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.deep.equal({message:"Incorrect email or password" })
  });

  it('Deve retornar quando o campo "password" for inválido ', async () => {
    const httpResponse = await chai.request(app).
    post('/login')
    .send({email: 'admin@admin.com', password: 'any_password'})
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.deep.equal({message:"Incorrect email or password" })
  });
});

/**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });