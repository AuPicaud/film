'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    username: Joi.string().required().min(3).example('john_doe').description('Username of the user'),
                    password: Joi.string().required().min(8).example('password123').description('Password of the user'),
                    mail: Joi.string().required().email().example('john.doe@example.com').description('Email of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/users',
        options: {
            tags: ['api'],
            handler: async (request, h) => {
                const { userService } = request.services();
                return await userService.getAllUsers();
            }
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('User ID')
                })
            },
            handler: async (request, h) => {
                const { userService } = request.services();
                const userId = request.params.id;

                await userService.deleteUserById(userId);

                return '';
            }
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('User ID')
                }),
                payload: Joi.object({
                    firstName: Joi.string().min(3).example('John').description('Updated firstname of the user'),
                    lastName: Joi.string().min(3).example('Doe').description('Updated lastname of the user'),
                    username: Joi.string().min(3).example('john_doe').description('Updated username of the user'),
                    password: Joi.string().min(8).example('password123').description('Updated password of the user'),
                    mail: Joi.string().email().example('john.doe@example.com').description('Updated email of the user')
                })
            },
            handler: async (request, h) => {
                const { userService } = request.services();
                const userId = request.params.id;
                const updatedUser = request.payload;

                return await userService.updateUserById(userId, updatedUser);
            }
        }
    }
];