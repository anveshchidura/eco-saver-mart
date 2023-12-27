const express = require('express');
const app = express();
const { PORT } = require('./config/config');
const http = require('http').createServer(app);
const auth = require('./middlewares/auth')
const routes = require('./routes');
require("dotenv").config();
require('./config/express')(app);
require('./config/mongoose');
app.use(auth())
app.use(routes);
http.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}...`));

