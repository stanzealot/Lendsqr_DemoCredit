import {Knex} from "knex"
import path from 'node:path'
// Update with your config settings.
interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  production: {
    client: 'mysql',
    connection: {
      host : 'us-cdbr-east-06.cleardb.net',
      port : 3306,
      user : 'babdf81e43a9ef',
      password : '8c110f8f',
      database : 'heroku_f2ffedc29a7e1ab'
    }
    }
  },
  test:{
    client: 'mysql',
    connection: {
      host : 'us-cdbr-east-06.cleardb.net',
      port : 3306,
      user : 'babdf81e43a9ef',
      password : '8c110f8f',
      database : 'heroku_f2ffedc29a7e1ab'
    }
  },
  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  development: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
export default configs;