'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(user){

        const { User } = this.server.models();

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
}
