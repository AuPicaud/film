'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.table('user', (table) => {
            table.string('username').unique().notNull();
            table.string('password').notNull();
            table.string('mail').unique().notNull();
        });

        // Remove old columns (if needed)
        // await knex.schema.table('user', (table) => {
        //     table.dropColumn('old_column_name');
        // });

    },

    async down(knex) {

        // Revert changes in reverse order
        await knex.schema.table('user', (table) => {
            table.dropColumns('username', 'password', 'mail');
        });
    }
};
