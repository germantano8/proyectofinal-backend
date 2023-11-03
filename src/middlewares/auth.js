const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        const token = req.cookies['token'] ? req.cookies['token'] : null;
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        return next();
    }catch(err){
        return res.status(401).json({error: 'No autorizado'});
    }
}

module.exports = auth;