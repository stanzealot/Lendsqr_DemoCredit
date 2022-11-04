import knex from 'knex';
import configs from './knexfile';

const ENV = process.env.NODE_ENV !=='test'?'development':'test'

const config = configs[ENV];

const db = knex(config);

export default db;