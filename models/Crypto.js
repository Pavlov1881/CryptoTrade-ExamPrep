const mongoose = require('mongoose');
const User = require('./User');

const cryptoShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: User, 
    }]

});

const Crypto = mongoose.model('Crypto', cryptoShema);

module.exports = Crypto;