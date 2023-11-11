require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const usersRouter = require('./controller/users');

(async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('te has conectado a MongoDb');
    } catch (error) {
        console.log(error);
    }
})();

app.use(cors());
app.use(cookieParser());
//rutas de frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/principal', express.static(path.resolve('views', 'Principal')));
app.use('/registrarse', express.static(path.resolve('views', 'registro')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/admin', express.static(path.resolve('views', 'admin')));
app.use('/historial', express.static(path.resolve('views', 'Principal', 'Historial')));
app.use('/pagos', express.static(path.resolve('views', 'Principal', 'Pagos')));
app.use('/img', express.static(path.resolve('img')));
app.use(morgan('tiny'));

app.use(express.json())

//ruta backend
app.use('/api/users', usersRouter)

module.exports = app;