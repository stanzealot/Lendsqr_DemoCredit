import {v4 as uuid} from 'uuid'
export const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '1234',
      database: 'lendsqrDB'
    }
  });
 
  async function DB() {
    await knex.schema.hasTable('users').then(async function (exists: unknown) {
    if (!exists) {
      await knex.schema
        .createTable('users', (table: { integer: (arg0: string) => number; increments: (arg0: string) => void; string: (arg0: string) => void; }) => {
          table.increments('id');
          table.string('fullname')
          table.string('username');
          table.string('email');
          table.string('phonenumber')
          table.integer('wallet');
          table.string('password');
        })
        .createTable('deposits', (table: { increments: (arg0: string) => void; string: (arg0: string) => void; integer: (arg0: string) => { (): any; new(): any; unsigned: { (): { (): any; new(): any; references: { (arg0: string): void; new(): any; }; }; new(): any; }; }; }) => {
          table.increments('id');
          table.string('reference');
          table.string('amount');
          table.string('currency');
          table.string('status');
          table
            .integer('user_id')
            .unsigned()
            .references('users.id');
        })
        .createTable('transfers', (table: { increments: (arg0: string) => void; string: (arg0: string) => void; integer: (arg0: string) => { (): any; new(): any; unsigned: { (): { (): any; new(): any; references: { (arg0: string): void; new(): any; }; }; new(): any; }; }; }) => {
          table.increments('id');
          table.string('reference');
          table.string('amount');
          table.string('recipient');
          table.string('recipient_email');
          table.string('recipient_phone');
          table.string('status');
          table
            .integer('user_id')
            .unsigned()
            .references('users.id');
        })
        .createTable('withdrawals', (table: { increments: (arg0: string) => void; string: (arg0: string) => void; integer: (arg0: string) => { (): any; new(): any; unsigned: { (): { (): any; new(): any; references: { (arg0: string): void; new(): any; }; }; new(): any; }; }; }) => {
          table.increments('id');
          table.string('reference');
          table.string('code');
          table.string('bank');
          table.string('name');
          table.string('account_number');
          table.string('amount');
          table.string('status');
          table
            .integer('user_id')
            .unsigned()
            .references('users.id');
        })
    }
  });
  }
  export default DB;


