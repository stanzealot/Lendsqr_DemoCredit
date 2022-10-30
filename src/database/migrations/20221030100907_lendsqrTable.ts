import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users',(table)=>{
        table.uuid('id').primary().defaultTo((knex.raw("(UUID())")))
        table.string('username').unique()
        table.string('email').unique()
        table.string('fullname')
        table.string('password')
        table.string('phonenumber').unique()
        table.float('wallet').defaultTo(0.0);
        table.timestamps(true,true);
    })
    .createTable('accounts',(table)=>{
        table.uuid('id').primary().defaultTo((knex.raw("(UUID())")))
        table.string('bankName')
        table.string('accountName')
        table.string('accountNumber')
        table.string('bankCode')
        table.string('status')
        table.uuid('userId')
        table.foreign('userId')
        .references('id')
        .inTable('users')
       
    })
    .createTable('deposits',(table)=>{
        table.uuid('id').primary().defaultTo((knex.raw("(UUID())")))
        table.string('amount')
        table.string('status')
        table.uuid('userId')
        table.foreign('userId')
        .references('id')
        .inTable('users')
       
    })
    .createTable('transfers',(table)=>{
        table.uuid('id').primary().defaultTo((knex.raw("(UUID())")))
        table.string('amount')
        table.string('recipient')
        table.string('recipientEmail')
        table.string('recipientPhone')
        table.string('status')
        table.uuid('userId')
        table.foreign('userId')
        .references('id')
        .inTable('users')
       
    })
    .createTable('withdrawals',(table)=>{
        table.uuid('id').primary().defaultTo((knex.raw("(UUID())")))
        table.string('code')
        table.string('bank')
        table.string('name')
        table.string('accountNumber')
        table.string('amount')
        table.string('status')
        table.uuid('userId')
        table.foreign('userId')
        .references('id')
        .inTable('users')
       
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('account').dropTableIfExists('users')
}

