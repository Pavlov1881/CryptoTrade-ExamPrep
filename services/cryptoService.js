const Crypto = require('../models/Crypto');

exports.getOne = (cryptoId) =>  Crypto.findById(cryptoId).lean();

exports.getAll = () => Crypto.find({}).lean();

exports.create = (ownerId, cryptoData) => Crypto.create({ ...cryptoData, owner: ownerId });
