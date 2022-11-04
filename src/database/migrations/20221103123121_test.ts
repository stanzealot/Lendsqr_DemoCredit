import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user',(table)=>{
        table.uuid('id').primary().defaultTo((knex.raw("(UUID())")))
        table.string('username').unique()
        table.string('email').unique()
        table.string('fullname')
        table.string('password')
        table.string('phonenumber').unique()
        table.float('wallet').defaultTo(0.0);
        table.timestamps(true,true);
    })
}


export async function down(knex: Knex): Promise<void> {
}

