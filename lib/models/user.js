'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const Favorite = require('./favorite');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            username: Joi.string().min(3).example('john_doe').description('Username of the user'),
            password: Joi.string().min(8).example('password123').description('Password of the user'),
            mail: Joi.string().email().example('john.doe@example.com').description('Email of the user'),
            role: Joi.string().valid('user', 'admin').default('user').description('Role of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get relationMappings() {
        return {
            favorites: {
                relation: Model.HasManyRelation,
                modelClass: Favorite,
                join: {
                    from: 'user.id',
                    to: 'favorite.userId'
                }
            }
        };
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};