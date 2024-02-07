'use strict';

const Joi = require('joi');
const Encrypt = require('@aupicaud/iut-encrypt');
const Jwt = require('@hapi/jwt');


module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            },
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    username: Joi.string().required().min(3).example('john_doe').description('Username of the user'),
                    password: Joi.string().required().min(8).example('password123').description('Password of the user'),
                    mail: Joi.string().required().email().example('john.doe@example.com').description('Email of the user'),
                    role: Joi.string().valid('user', 'admin').default('user').description('Role of the user')
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
            auth: {
                scope: ['admin']
            },
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
            auth: {
                scope: ['admin']
            },
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
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().positive().required().description('User ID')
                }),
                payload: Joi.object({
                    firstName: Joi.string().min(3).example('John').description('Updated firstname of the user'),
                    lastName: Joi.string().min(3).example('Doe').description('Updated lastname of the user'),
                    username: Joi.string().min(3).example('john_doe').description('Updated username of the user'),
                    password: Joi.string().min(8).example('password123').description('Updated password of the user'),
                    mail: Joi.string().email().example('john.doe@example.com').description('Updated email of the user'),
                    role: Joi.string().valid('user', 'admin').description('Updated role of the user')
                })
            },
            handler: async (request, h) => {
                const { userService } = request.services();
                const userId = request.params.id;
                const updatedUser = request.payload;

                return await userService.updateUserById(userId, updatedUser);
            }
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    mail: Joi.string().required().email().example('john.doe@exampezle.com').description('Email of the user'),
                    password: Joi.string().required().min(8).example('password123').description('Password of the user'),
                })
            },
            handler: async (request, h) => {
                const { User } = request.server.models();
                const { mail, password } = request.payload;

                // Find the user by email
                const user = await User.query().findOne({ mail });

                // If the user does not exist or the password is incorrect, return 401 Unauthorized
                if (!user || user.password !== Encrypt.sha1(password)) {
                    return h.response({ error: 'Incorrect email or password' }).code(401);
                }

                // Generate a token
                const token = Jwt.token.generate(
                    {
                        aud: 'urn:audience:iut',
                        iss: 'urn:issuer:iut',
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.mail,
                        scope: user.role
                    },
                    {
                        key: 'random_string',
                        algorithm: 'HS512'
                    },
                    {
                        ttlSec: 14400 // 4 hours
                    }
                );
                return { token };
            }
        }
    }
];