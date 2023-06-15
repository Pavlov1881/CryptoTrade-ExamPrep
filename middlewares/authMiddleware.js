const jwt = require('../libraries/jwt');
const { SECRET } = require('../constants');


exports.authentication = async (req, res, next) => {

    const token = req.cookies['auth'];  // взимаме токена

    // ако има токен
    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);    // декодираме токена и го запазваме в променливa
            req.user = decodedToken;                   // запазваме инфото от токена в request-a
            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;
        } catch (error) {
            res.clearCookie('auth');
            res.status(401).render('home/404');
            return;
        }
    }

    next();
}


exports.isAuthorized = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }

    next();
}