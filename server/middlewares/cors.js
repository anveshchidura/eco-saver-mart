function cors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://eco-saver-mart.onrender.com');
    res.setHeader('Access-Control-Allow-Methods',    'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  
    res.setHeader('Access-Control-Allow-Headers',  
     'Content-Type, Authorization');
  
    next();
}

module.exports = cors;