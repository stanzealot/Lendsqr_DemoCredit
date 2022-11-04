require('dotenv').config();
process.env.NODE_ENV='test'
import express from 'express';
import request from 'supertest';
import usersRouter from '../routes/users'
import cookieParser from 'cookie-parser';
import db from '../database/db';

const app = express();

beforeAll(async () => {
  await db('users').del()
});
let cookie: string;
let id: string;
app.use(express.json());
app.use(cookieParser());
app.use('/democredit/users', usersRouter);

//Tests user sign-up
describe('User Sign-up API Integration test', () => {
    test('POST /democredit/users - success - sign-up a user', async () => {
      const { body, statusCode } = await request(app).post('/democredit/users').send({
        "username":"john",
        "fullname":"john Doe",
        "phonenumber":"08167312315",
        "email":"john@gmail.com",
        "password":"test",
        "confirm_password":"test"
      })
  
      expect(statusCode).toBe(201);
      expect(body.msg).toContain('User created successfully');
    });
  
    test('POST /democredit/users - failure - request body invalid', async () => {
      const { body, statusCode } = await request(app).post('/democredit/users').send({
        fullname: "John Doe",
        username: null,
        email: "jd@gmail.com",
        phonenumber: null,
        password: "test",
        confirm_password: "test"
      })
  
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('Error');
    });
  
    test('POST /democredit/users - failure - User already exists', async () => {
      const { body, statusCode } = await request(app).post('/democredit/users').send({
        "username":"john",
        "fullname":"john Doe",
        "phonenumber":"08167312315",
        "email":"john@gmail.com",
        "password":"test",
        "confirm_password":"test"
      })
  
      expect(statusCode).toBe(409);
      expect(body).toHaveProperty('msg');
    });
});


//Tests user login
describe('User Login API Integration test', () => {
  beforeAll(async () => {
    await request(app).post('/democredit/users').send({
      "username":"john",
      "fullname":"john Doe",
      "phonenumber":"08167312315",
      "email":"john@gmail.com",
      "password":"test",
      "confirm_password":"test"
    })
  })

  test('POST /democredit/users/login - success - login a user with email', async () => {
    const { body, statusCode } = await request(app).post('/democredit/users/login').send({
      email: "john@gmail.com",
      password: "test",
    })

    expect(statusCode).toBe(200);
    expect(body.msg).toBe('You have successfully logged in');
    expect(body).toHaveProperty('user');
  });

  test('POST /democredit/users/login - failure - improper request body', async () => {
    const { body, statusCode } = await request(app).post('/democredit/users/login').send({
      username: "jassydizzy",
      password: "irrelevant",
    })

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('Error');
  });

  test('POST /user/login - failure - user does not exist', async () => {
    const { body, statusCode } = await request(app).post('/democredit/users/login').send({
      email: "jassydizzy@gmail.com",
      password: "irrelevant",
    })

    expect(statusCode).toBe(404);
    expect(body.msg).toBe('User not found');
  });

  test('POST /user/login - failure - incorrect password', async () => {
    const { body, statusCode } = await request(app).post('/democredit/users/login').send({
      email: "john@gmail.com",
      password: "tets",
    })

    expect(statusCode).toBe(401);
    expect(body.msg).toBe('password does not match');
  });

});

