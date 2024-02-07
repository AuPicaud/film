'use strict';

exports.up = async (knex) => {
    await knex.schema.table('user', (table) => {
        table.string('role').defaultTo('user');
    });
};

exports.down = async (knex) => {
    await knex.schema.table('user', (table) => {
        table.dropColumn('role');
    });
};
