const router = require('express').Router();
const cryptoService = require('../services/cryptoService');
const { isAuthorized } = require('../middlewares/authMiddleware');


router.get('/catalog', async (req, res) => {



    const allCryptos = await cryptoService.getAll() //* взимаме всички крипто от DB
    res.render('crypto/catalog', { allCryptos });


});

router.get('/:cryptoId/details', async (req, res) => {

    const crypto = await cryptoService.getOne(req.params.cryptoId)

    const isOwner = crypto.owner == req.user?._id   // ако това е собственика на крипто вземи му ID, ако не е върни undefined 
    // const isBuyer = crypto.buyers.some(id => id == req.user?._id)

    res.render('crypto/details', { crypto, isOwner });
})


router.get('/:cryptoId/buy', isAuthorized, async (req, res) => {
    await cryptoService.buy(req.user._id, req.params.cryptoId)
})


router.get('/create', isAuthorized, (req, res) => {
    res.render('crypto/create')
});

router.post('/create', isAuthorized, async (req, res) => {
    const cryptoData = req.body;
    const cryptoOwner = req.user._id
    try {
        await cryptoService.create(cryptoOwner, cryptoData);
    } catch (error) {
        return res.status(400).render('crypto/create', { error: error.message })
    }

    res.redirect('/crypto/catalog');
});





module.exports = router;