'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FavoriteService extends Service {

    async create(favorite){
        const { Favorite } = this.server.models();
        try {
            return await Favorite.query().insertAndFetch(favorite);
        } catch (error) {
            console.error('Erreur lors de la création du favori', error);
            throw error;
        }
    }

    async getAllFavorites(){
        const { Favorite } = this.server.models();
        return Favorite.query();
    }

    async deleteFavoriteById(id){
        const { Favorite } = this.server.models();
        return Favorite.query().deleteById(id);
    }
    
    async updateFavoriteById(id, updatedFavorite) {
        const { Favorite } = this.server.models();
        return Favorite.query().findById(id).patch(updatedFavorite);
    }
};