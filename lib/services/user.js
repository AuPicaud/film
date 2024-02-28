'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@aupicaud/iut-encrypt');

module.exports = class UserService extends Service {

    async create(user){
        const { User } = this.server.models();
        user.password = Encrypt.sha1(user.password);

        try {
            const newUser = await User.query().insertAndFetch(user);
            const emailService = this.server.services().emailService;
            await emailService.sendWelcomeEmail(newUser.mail);
            return newUser;
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur ou de l\'envoi de l\'e-mail', error);
            throw error;
        }
    }

    async getUserById(id){
        const { User } = this.server.models();
        return User.query().findById(id);
    }

    async getAllUsers(){
        const { User } = this.server.models();
        return User.query();
    }

    async deleteUserById(id){
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    async updateUserById(id, updatedUser) {
        const { User } = this.server.models();
        updatedUser.password = Encrypt.sha1(updatedUser.password);
        return User.query().findById(id).patch(updatedUser);
    }
}
