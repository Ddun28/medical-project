require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
<<<<<<< HEAD
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
=======
>>>>>>> 51343543d614137ce8546b553479c0d1f654f90c
const usersRouter = require('./controller/users');

(async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('te has conectado a MongoDb');
    } catch (error) {
        console.log(error);
    }
})();

<<<<<<< HEAD
app.use(cors());
app.use(cookieParser());
=======

>>>>>>> 51343543d614137ce8546b553479c0d1f654f90c
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
<<<<<<< HEAD
app.use(morgan('tiny'));
=======
>>>>>>> 51343543d614137ce8546b553479c0d1f654f90c

app.use(express.json())

//ruta backend
app.use('/api/users', usersRouter)

module.exports = app;