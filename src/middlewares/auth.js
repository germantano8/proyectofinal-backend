const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        res.header("Access-Control-Allow-Origin");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        req.user = jwt.verify(token, process.env.SECRET_KEY);

        const token = req.cookies['token'] ? req.cookies['token'] : null;
        
        return next();
    }catch(err){
        return res.status(401).json({error: 'No autorizado'});
    }
}

module.exports = auth;