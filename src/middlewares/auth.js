const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    res.header("Access-Control-Allow-Origin");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    try{
        const token = req.cookies['token'] ? req.cookies['token'] : null;

        req.user = jwt.verify(token, process.env.SECRET_KEY);
        
        return next();
    }catch(err){
        return res.status(401).json({error: 'No autorizado'});
    }
}

module.exports = auth;