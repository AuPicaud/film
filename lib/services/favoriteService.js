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

    async getUsersFavoriteMovie(movieId) {
        const { Favorite, User } = this.server.models();

        try {
            const favoriteRecords = await Favorite.query().where('movieId', movieId);

            const userIds = favoriteRecords.map((favorite) => favorite.userId);

            return await User.query().whereIn('id', userIds);

        } catch (error) {
            console.error('Error getting favorite users:', error);
            throw error;
        }
    }
};