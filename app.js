require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { userExtractor } = require('./middleware/auth');
const { adminExtractor } = require('./middleware/adminAuth');
const citasRouter = require('./controller/citas');
const usersRouter = require('./controller/users');
const loginRouter = require('./controller/login');
const pagoRouter = require('./controller/pagos');
const  logoutRouter = require('./controller/logout');
const  pdfRouter = require('./controller/Pdf');
const PaypalRouter = require('./controller/order');



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
app.use('/admin', adminExtractor, express.static(path.resolve('views', 'admin')));
app.use('/historial', express.static(path.resolve('views', 'Principal', 'Historial')));
app.use('/pagos', express.static(path.resolve('views', 'Principal', 'Pagos')));
app.use('/verify-pago/:id', adminExtractor,express.static(path.resolve('views', 'admin', 'verify-pago')));
app.use('/verify',adminExtractor, express.static(path.resolve('views', 'admin', 'verify')));
app.use('/agendar-recipe/:id/:id', adminExtractor,express.static(path.resolve('views', 'admin', 'history')));
app.use('/agendar',adminExtractor, express.static(path.resolve('views', 'admin', 'history-all')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/img', express.static(path.resolve('img')));
app.use(express.static("client"));
app.use(morgan('tiny'));

app.use(express.json())

//ruta backend
app.use('/api/users', usersRouter)
app.use('/api/citas', userExtractor, citasRouter);
app.use('/api/login', loginRouter);
app.use('/api/pagos', userExtractor, pagoRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/pdf',  userExtractor, pdfRouter);
app.use('/api/orders',  userExtractor, PaypalRouter);


module.exports = app;