'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    async create(movie){
        const { Movie } = this.server.models();
        try {
            const newMovie = await Movie.query().insertAndFetch(movie);

            const emailService = this.server.services().emailService;
            const userService = this.server.services().userService;

            const allUsers = await userService.getAllUsers();
            const movieTitle = createdMovie.title;

            for (const user of allUsers) {
                await emailService.sendNewMovieNotification(user.mail, movieTitle);
            }

            return newMovie;

        } catch (error) {
            console.error('Erreur lors de la création du film', error);
            throw error;
        }
    }


    async getAllMovies(){
        const { Movie } = this.server.models();
        return Movie.query();
    }


    async deleteMovieById(id){
        const { Movie } = this.server.models();
        return Movie.query().deleteById(id);
    }

    async updateMovieById(id, updatedMovie) {
        const { Movie } = this.server.models();
        return Movie.query().findById(id).patch(updatedMovie);
    }
};
