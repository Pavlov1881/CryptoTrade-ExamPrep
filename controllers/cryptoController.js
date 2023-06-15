const router = require('express').Router();
const cryptoService = require('../services/cryptoService');
const { isAuthorized } = require('../middlewares/authMiddleware');


router.get('/catalog', async (req, res) => {


    const allCryptos = await cryptoService.getAll() //* взимаме всички крипто от DB
    res.render('crypto/catalog', { allCryptos });


});

router.get('/:cryptoId/details', async (req, res) => {
    
    const crypto = await cryptoService.getOne(req.params.cryptoId);

    
    
    res.render('crypto/details', {crypto});
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