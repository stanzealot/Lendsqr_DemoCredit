// process.env.NODE_ENV='test'
import express from 'express';
import request from 'supertest';
import usersRouter from '../routes/users'
import cookieParser from 'cookie-parser';

const app = express();
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
  