'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    async create(movie){
        const { Movie } = this.server.models();
        try {
            return await Movie.query().insertAndFetch(movie);
        } catch (error) {
            console.error('Erreur lors de la création du film', error);
            throw error;
        }
    }
};
