'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/favorite',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            },
            validate: {
                payload: Joi.object({
                    userId: Joi.number().integer().positive().required().description('User ID'),
                    movieId: Joi.number().integer().positive().required().description('Movie ID')
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            return favoriteService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/favorites',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            },
            handler: async (request, h) => {
                const { favoriteService } = request.services();
                return await favoriteService.getAllFavorites();
            }
        }
    },
    {
        method: 'delete',
        path: '/favorite/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('Favorite ID')
                })
            },
            handler: async (request, h) => {
                const { favoriteService } = request.services();
                await favoriteService.deleteFavoriteById(request.params.id);
                return '';
            }
        }
    },
    {
        method: 'patch',
        path: '/favorite/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('Favorite ID')
                }),
                payload: Joi.object({
                    userId: Joi.number().integer().positive().description('Updated user ID'),
                    movieId: Joi.number().integer().positive().description('Updated movie ID')
                })
            },
            handler: async (request, h) => {
                const { favoriteService } = request.services();
                return favoriteService.updateFavoriteById(request.params.id, request.payload);
            }
        }
    }
];
