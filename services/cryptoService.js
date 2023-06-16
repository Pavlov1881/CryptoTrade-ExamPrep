const Crypto = require('../models/Crypto');

exports.getOne = (cryptoId) =>  Crypto.findById(cryptoId).lean();

exports.getAll = () => Crypto.find({}).lean();

exports.create = (ownerId, cryptoData) => Crypto.create({ ...cryptoData, owner: ownerId });

exports.buy = async (userId, cryptoId) => {
    const crypto = await Crypto.findById(cryptoId);
    crypto.buyers.push(userId);
    crypto.save();

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
}