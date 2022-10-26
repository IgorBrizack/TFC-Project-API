import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as generateToken from '../jwt/generateToken';
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY2NjcxNzQyMSwiZXhwIjoxNjY3MzIyMjIxfQ.-RwDETdbarooT-mWY2hEVjWu0lei3PKUtutpT14iFRI"

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

  it('Deve retornar um token válido ao passar um login e senha correto', async () => {
    sinon.stub(generateToken,'default').resolves(TOKEN)

    const httpResponse = await chai.request(app).
    post('/login')
    .send({email: 'admin@admin.com', password: 'secret_admin'})
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal({token: TOKEN})

    sinon.restore()
  });

  it('Deve retornar a role do usuário, caso seja passado um usuário e senhas válidos', async () => {
    const httpResponseLogin = await chai.request(app).
    post('/login')
    .send({email: 'admin@admin.com', password: 'secret_admin'})

    const httpResponse = await chai.request(app).
    get('/login/validate')
    .send().set('Authorization', httpResponseLogin.body.token)
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal({role: 'admin'})
    sinon.restore()
  });

  it('Deve retornar um status code 404 caso usuário não seja encontrado', async () => {
    sinon.stub(Users, 'findOne').resolves(null)
    sinon.stub(generateToken,'default').resolves(TOKEN)

    const httpResponse = await chai.request(app).
    get('/login/validate')
    .send().set('Authorization', TOKEN)
    expect(httpResponse.status).to.be.equal(404);
    sinon.restore()
  });
});
