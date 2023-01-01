const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favoritesSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favorites: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: false
});

var Favorites = mongoose.model('Favorite', favoritesSchema);

module.exports = Favorites;