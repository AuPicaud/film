'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@aupicaud/iut-encrypt');

module.exports = class UserService extends Service {

    create(user){

        const { User } = this.server.models();
        user.password = Encrypt.sha1(user.password);
        return User.query().insertAndFetch(user);
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
