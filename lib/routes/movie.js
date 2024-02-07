'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/movie',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().min(3).example('Inception').description('Title of the movie'),
                    description: Joi.string().required().min(10).example('A mind-bending thriller').description('Description of the movie'),
                    releaseDate: Joi.date().required().example('2010-07-16').description('Release date of the movie'),
                    director: Joi.string().required().min(3).example('Christopher Nolan').description('Director of the movie')
                })
            }
        },
        handler: async (request, h) => {

            const { movieService } = request.services();
            return movieService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/movies',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            },
            handler: async (request, h) => {

                const { movieService } = request.services();
                return await movieService.getAllMovies();
            }
        }
    },
    {
        method: 'delete',
        path: '/movie/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('Movie ID')
                })
            },
            handler: async (request, h) => {
                const { movieService } = request.services();
                await movieService.deleteMovieById(request.params.id);
                return '';
            }
        }
    }
];
