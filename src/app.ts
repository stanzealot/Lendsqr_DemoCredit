import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import accountRouter from './routes/account'
import usersRouter from './routes/users'
import depositRouter from './routes/deposit'
import transferRouter from './routes/transfer'
import withdrawalRouter from './routes/withdrawal'
import db from './database/db'

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/democredit/users', usersRouter);
app.use('/democredit/accounts', accountRouter);
app.use('/democredit/deposits', depositRouter);
app.use('/democredit/transfers', transferRouter);
app.use('/democredit/withdrawals',withdrawalRouter)

export default app;
